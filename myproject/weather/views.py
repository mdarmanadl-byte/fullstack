import requests
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SearchHistory



# Create your views here.
def calculate_aqi(pm2_5):
    if pm2_5 <= 30:
        return ("Good", "🟢", "Air quality is satisfactory and poses little or no risk.")
    elif pm2_5 <= 60:
        return ("Satisfactory", "🟡", "Minor breathing discomfort for sensitive individuals.")
    elif pm2_5 <= 90:
        return ("Moderate", "🟠", "Breathing discomfort to people with lung issues.")
    elif pm2_5 <= 120:
        return ("Poor", "🔴", "Breathing discomfort to most people on prolonged exposure.")
    elif pm2_5 <= 250:
        return ("Very Poor", "🟣", "Respiratory illness on prolonged exposure.")
    else:
        return ("Severe", "⚫", "Serious health impacts; avoid outdoor activity.")



def weather_home(request):
    city="delhi"

    if request.method=="POST":
        city=request.POST.get("city")

    geo_url=(
             f"https://geocoding-api.open-meteo.com/v1/search"
        f"?name={city}&count=1&language=en&format=json"
    )
    geo_data=requests.get(geo_url).json()
    
    if "results" not in geo_data:
        return render(request, "weather/weather.html", {
            "error": "City not found"
        })
    latitude = geo_data["results"][0]["latitude"]
    longitude = geo_data["results"][0]["longitude"]
    weather_ulr=(f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}&longitude={longitude}&current_weather=true")
    
    air_url=( f"https://air-quality-api.open-meteo.com/v1/air-quality"
        f"?latitude={latitude}&longitude={longitude}"
        f"&hourly=pm10,pm2_5")
    
    weather_data=requests.get(weather_ulr).json()
    air_data=requests.get(air_url).json()

    current_weather = weather_data.get("current_weather")
    if current_weather:
        temperature = current_weather.get("temperature")
    else:
        temperature = "N/A"

    pm2_5=air_data["hourly"]["pm2_5"][0]
    pm10=air_data["hourly"]["pm10"][0]
    aqi_category, aqi_icon, health_message = calculate_aqi(pm2_5)
    SearchHistory.objects.create(
    city=city.title(),
    temperature=temperature if temperature != "N/A" else None,
    pm2_5=pm2_5,
    pm10=pm10,
    aqi_category=aqi_category,
     )
    context={
        "city":city,
        "temperature":temperature,
        "pm2_5":pm2_5,
        "pm10":pm10,
        "aqi_category": aqi_category,
        "aqi_icon": aqi_icon,
        "health_message": health_message,
        }
    return render(request,"weather/weather.html",context)

@api_view(["GET"])
def weather_api(request):
    city = request.GET.get("city", "Delhi")

    geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"
    geo_data = requests.get(geo_url).json()

    if "results" not in geo_data:
        return Response({"error": "City not found"}, status=404)

    lat = geo_data["results"][0]["latitude"]
    lon = geo_data["results"][0]["longitude"]

    weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&timezone=auto"
    air_url = f"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lat}&longitude={lon}&hourly=pm10,pm2_5"

    weather_data = requests.get(weather_url).json()
    air_data = requests.get(air_url).json()

    temperature = weather_data.get("current_weather", {}).get("temperature")
    pm2_5 = air_data["hourly"]["pm2_5"][0]
    pm10 = air_data["hourly"]["pm10"][0]

    aqi_category,aqi_icon, health_message = calculate_aqi(pm2_5)

    SearchHistory.objects.create(
        city=city.title(),
        temperature=temperature,
        pm2_5=pm2_5,
        pm10=pm10,
        aqi_category=aqi_category,
    )

    return Response({
        "city": city.title(),
        "temperature": temperature,
        "pm2_5": pm2_5,
        "pm10": pm10,
        "aqi_icon": aqi_icon,
        "aqi_category": aqi_category,
        "health_message": health_message,
    })