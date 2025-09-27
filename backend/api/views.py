from rest_framework import viewsets
from .models import Design
from .serializers import DesignSerializer
from rest_framework.permissions import AllowAny

class DesignViewSet(viewsets.ModelViewSet):
    queryset = Design.objects.all().order_by('-created_at')
    serializer_class = DesignSerializer
    permission_classes = [AllowAny]
