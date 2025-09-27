from django.db import models
from django.contrib.auth.models import User

class Design(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    model_file = models.FileField(upload_to="models/")  # glb/glTF
    metadata = models.JSONField(default=dict)   # placement, scale, style, etc
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name
