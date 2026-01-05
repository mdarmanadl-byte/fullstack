from django.db import models

# Create your models here.

class SearchHistory(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField(null=True)
    pm2_5 = models.FloatField()
    pm10 = models.FloatField()
    aqi_category = models.CharField(max_length=20)
    searched_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.aqi_category}"
