from django.db.models import Count
from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from games import permissions
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
class GetGameModes(generics.ListCreateAPIView):
    queryset = GameMode.objects.all()
    serializer_class = GameModeSerializer
class GameModeViewSet(viewsets.ModelViewSet):
    """Handles creating and updating game modes"""
    serializer_class = GameModeSerializer
    queryset = GameMode.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)
class Game_CommentViewSet(viewsets.ModelViewSet):
    serializer_class = Game_CommentSerilizer
    queryset = Game_Comment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)
class Game_RatingViewSet(viewsets.ModelViewSet):
    serializer_class = Game_RatingSerilizer
    queryset = Game_Rating.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)

class GameMode_CommentViewSet(viewsets.ModelViewSet):
    serializer_class = GameMode_CommentSerilizer
    queryset = GameMode_Comment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)
class GameMode_RatingViewSet(viewsets.ModelViewSet):
    serializer_class = GameMode_RatingSerilizer
    queryset = GameMode_Rating.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)

