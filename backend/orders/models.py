from django.db import models

class Order(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    address = models.TextField()
    pincode = models.CharField(max_length=10)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=10,
        choices=[
            ("PENDING", "Pending"),
            ("PAID", "Paid"),
            ("FAILED", "Failed"),
        ],
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product_name} ({self.quantity})"


class Transaction(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="transaction"
    )
    transaction_id = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=10,
        choices=[
            ("PENDING", "Pending"),
            ("PAID", "Paid"),
            ("FAILED", "Failed"),
        ],
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id
