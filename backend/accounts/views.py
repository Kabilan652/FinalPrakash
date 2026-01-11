import random
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .models import OTP, UserProfile
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import UserAddress
from .serializers import UserAddressSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import AdminUserListSerializer # <--- Import the new serializer

class UserAddressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        addresses = UserAddress.objects.filter(user=request.user)
        serializer = UserAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"success": True})
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        address = UserAddress.objects.get(id=pk, user=request.user)
        address.delete()
        return Response({"success": True})

class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"success": True})

        return Response(serializer.errors, status=400)


class SendOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"success": False, "message": "Email is required"})

        otp = str(random.randint(100000, 999999))

        OTP.objects.create(email=email, otp=otp)

        send_mail(
    subject="Your Login OTP - Prakash Traders",
    message=f"""
Welcome to Prakash Traders! 🎉

Your secure OTP is:
{otp}

Enter this code to continue.
Stay safe — never share your OTP.

Thank you for choosing us!
""",
    from_email=settings.EMAIL_HOST_USER,
    recipient_list=[email],
    fail_silently=False,
)


        return Response({
            "success": True,
            "message": "OTP sent successfully"
        })


class VerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({
                "success": False,
                "message": "Email and OTP are required"
            })

        record = OTP.objects.filter(email=email, otp=otp).last()

        if not record:
            return Response({
                "success": False,
                "message": "Invalid OTP"
            })

        user, created = User.objects.get_or_create(
            username=email,
            defaults={"email": email}
        )

        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "email": user.email,
                "username": user.username,
            }
        })


class AdminLogin(APIView):
    permission_classes = []  #  Allow anyone

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user and user.is_staff:
            refresh = RefreshToken.for_user(user)

            return Response({
                "success": True,
                "token": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Invalid admin credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Add this class to list all customers for the Admin Dashboard
class AdminCustomerListView(generics.ListAPIView):
        permission_classes = [AllowAny]   # ← IMPORTANT

        queryset = UserProfile.objects.all()
        serializer_class = UserProfileSerializer

    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer

