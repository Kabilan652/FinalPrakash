from django.urls import path
from .views import create_order, submit_transaction, order_details, admin_orders

urlpatterns = [
    path("create-order/", create_order),
    path("submit-transaction/", submit_transaction),
    path("order-details/<str:order_id>/", order_details),
    path("admin-orders/", admin_orders),
]
