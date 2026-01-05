from rest_framework import serializers
from .models import Watchlist

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        # We include 'id' so React can use it as a 'key' in .map()
        fields = ['id', 'coin_id', 'coin_name', 'created_at']