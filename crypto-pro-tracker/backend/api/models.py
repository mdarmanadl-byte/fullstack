
# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Watchlist(models.Model):
    # Link each item to a user
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    # Store the coin ID from CoinGecko (e.g., 'bitcoin')
    coin_id = models.CharField(max_length=50) 
    coin_name = models.CharField(max_length=50)
    # Automatically save the date it was added
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.coin_name} ({self.user.username})"