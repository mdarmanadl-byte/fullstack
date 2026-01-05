from django.urls import path
from .views import weather_home ,weather_api

urlpatterns = [
    path('',weather_home,name='weather'),
    path("api/", weather_api),
]