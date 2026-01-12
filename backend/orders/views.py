import json
import razorpay
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Order, Transaction
from django.http import JsonResponse


client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# CREATE ORDER

@csrf_exempt
def create_order(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)

    amount_rupees = int(data["amount"])
    amount_paise = amount_rupees * 100

    razorpay_order = client.order.create({
        "amount": amount_paise,
        "currency": "INR",
        "payment_capture": 1
    })

    order = Order.objects.create(
        order_id=razorpay_order["id"],
        name=data["name"],
        address=data["address"],
        pincode=data["pincode"],
        total_amount=amount_rupees,
        status="PENDING"
    )

    return JsonResponse({
        "razorpay_order_id": razorpay_order["id"],
        "amount": amount_paise
    })



# VERIFY PAYMENT

@csrf_exempt
def verify_payment(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)

    try:
        client.utility.verify_payment_signature(data)
    except razorpay.errors.SignatureVerificationError:
        return JsonResponse({"status": "FAILED"})

    order = Order.objects.get(order_id=data["razorpay_order_id"])

    Transaction.objects.create(
        order=order,
        transaction_id=data["razorpay_payment_id"],
        amount=order.total_amount,
        status="PAID"
    )

    order.status = "PAID"
    order.save()

    return JsonResponse({
        "status": "PAID",
        "order_id": order.order_id
    })
