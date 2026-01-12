from django.urls import path
from .views import create_order, verify_payment

urlpatterns = [
    path("api/create-order/", create_order),
    path("api/verify-payment/", verify_payment),
]
