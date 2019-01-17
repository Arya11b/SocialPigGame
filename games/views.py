from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from users import permissions
from games.serializer import *
from .models import *

class GetActiveGames(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
class GameViewSet(viewsets.ModelViewSet):
    """Handles creating and updating profiles"""
    serializer_class = GameSerializer
    queryset = Game.objects.filter(active=True)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,)
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ("username", "email",)
class GetActiveGameModes(generics.ListCreateAPIView):
    queryset = GameMode.objects.all()
    serializer_class = GameModeSerializer
class GameModeViewSet(viewsets.ModelViewSet):
    """Handles creating and updating game modes"""
    serializer_class = GameModeSerializer
    queryset = Game.objects.filter(active=True)
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.UpdateOwnProfile,)
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ("username", "email",)
