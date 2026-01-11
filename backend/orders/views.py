import uuid, qrcode, os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Order, Transaction

# -------------------------------
# CREATE ORDER + QR
# -------------------------------
@csrf_exempt
def create_order(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=400)

    order_id = f"ORD{uuid.uuid4().hex[:10]}"
    amount = request.POST.get("amount")

    order = Order.objects.create(
        order_id=order_id,
        name=request.POST.get("name"),
        address=request.POST.get("address"),
        pincode=request.POST.get("pincode"),
        total_amount=amount,
        status="PENDING"
    )

    upi_url = (
        f"upi://pay?"
        f"pa=nssathish104@okaxis&"
        f"pn=Sathish&"
        f"am={amount}&"
        f"cu=INR&"
        f"tn={order_id}"
    )

    qr = qrcode.make(upi_url)
    qr_path = os.path.join(settings.MEDIA_ROOT, f"{order_id}.png")
    qr.save(qr_path)

    return JsonResponse({
        "order_id": order_id,
        "qr": settings.MEDIA_URL + f"{order_id}.png",
        "amount": amount,
        "upi_url": upi_url,
        "status": "PENDING"
    })


# -------------------------------
# SUBMIT TRANSACTION
# -------------------------------
@csrf_exempt
def submit_transaction(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=400)

    order_id = request.POST.get("order_id")
    txn_id = request.POST.get("transaction_id")

    try:
        order = Order.objects.get(order_id=order_id)
    except Order.DoesNotExist:
        return JsonResponse({"status": "FAILED", "message": "Order not found"})

    if not txn_id or len(txn_id) < 10:
        order.status = "FAILED"
        order.save()
        return JsonResponse({"status": "FAILED"})

    Transaction.objects.create(
        order=order,
        transaction_id=txn_id,
        amount=order.total_amount,
        status="SUCCESS"
    )

    order.status = "PAID"
    order.save()

    return JsonResponse({
        "status": "PAID",
        "order_id": order.order_id
    })


# -------------------------------
# ORDER DETAILS (SUCCESS PAGE)
# -------------------------------
def order_details(request, order_id):
    try:
        order = Order.objects.get(order_id=order_id)
    except Order.DoesNotExist:
        return JsonResponse({"error": "Order not found"}, status=404)

    txn = Transaction.objects.filter(order=order).first()

    return JsonResponse({
        "order_id": order.order_id,
        "amount": order.total_amount,
        "status": order.status,
        "transaction_id": txn.transaction_id if txn else None
    })

def admin_orders(request):
    orders = Order.objects.all().values()
    return JsonResponse(list(orders), safe=False)

