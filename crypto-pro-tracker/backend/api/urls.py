from django.urls import path

from .views import WatchlistListCreate, WatchlistDestroy
urlpatterns = [
    path('watchlist/', WatchlistListCreate.as_view(), name='watchlist-list'),
    path('watchlist/<int:pk>/', WatchlistDestroy.as_view(), name='watchlist-delete'),
]