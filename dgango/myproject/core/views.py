from django.shortcuts import render
from .models import City
def home(request):
    city = None

    if request.method == "POST":
        city = request.POST.get("city")
        if city:
            City.objects.create(name=city)
    cities=City.objects.all()
    return render(request, "core/home.html", {"city": city, "cities":cities})
