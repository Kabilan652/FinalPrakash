from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("orders.urls")),   # your orders routes New
    path("", include("orders.urls")),      
    path("api/auth/", include("accounts.urls")),        # your auth routes
    path("api/products/", include("products.urls")),   # your products routes
]
 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)