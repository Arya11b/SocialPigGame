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
    queryset = Game.objects.all()
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.LoggedIn,)

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
    serializer_class = GameCommentSerilizer
    queryset = Game_Comment.objects.filter(validated=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminGameCommentSerilizer
        else: return GameCommentSerilizer
    def get_queryset(self):
        if self.request.user.is_staff:
            return GameMode_Comment.objects.all()
        else: return Game_Comment.objects.filter(validated=True)

class Game_RatingViewSet(viewsets.ModelViewSet):
    serializer_class = GameRatingSerilizer
    queryset = Game_Rating.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)

class GameMode_CommentViewSet(viewsets.ModelViewSet):
    queryset = GameMode_Comment.objects.filter(validated=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.Admin,)
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminGameModeCommentSerilizer
        else: return GameModeCommentSerilizer
    def get_queryset(self):
        if self.request.user.is_staff:
            return GameMode_Comment.objects.all()
        else: return GameMode_Comment.objects.filter(validated=True)

class GameMode_RatingViewSet(viewsets.ModelViewSet):
    serializer_class = GameModeRatingSerilizer
    queryset = GameMode_Rating.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)


