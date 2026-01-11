from django.apps import AppConfig
import logging

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        # Import inside ready(), after apps are loaded
        try:
            from django.contrib.auth.models import User
            from django.db.utils import OperationalError, ProgrammingError

            # Only create default admin if it doesn't exist
            if not User.objects.filter(username="prakash").exists():
                User.objects.create_superuser(
                    username="prakash",
                    password="password123",
                    email="admin@example.com"
                )
                print("✅ Default admin created: username=prakash, password=password123")
        except (OperationalError, ProgrammingError) as e:
            # Skip during migrations or when DB is not ready
            logging.info("Database not ready yet, skipping default admin creation")
