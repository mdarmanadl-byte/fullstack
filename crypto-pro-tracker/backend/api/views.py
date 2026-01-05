from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Watchlist
from .serializers import WatchlistSerializer

class WatchlistListCreate(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer

    # This ensures users only see their own coins
    def get_queryset(self):
        return Watchlist.objects.all() # We will add user-filtering later

    def perform_create(self, serializer):
        # For now, we manually assign the first user in the DB
        # We will update this when we add Login/Signup
        from django.contrib.auth.models import User
        user = User.objects.first() 
        serializer.save(user=user)
class WatchlistDestroy(generics.RetrieveDestroyAPIView):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer