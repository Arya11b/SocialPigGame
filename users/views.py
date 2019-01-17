from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from users import permissions
from users.serializer import *
from .models import *

# class GetUser(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
class UserViewSet(viewsets.ModelViewSet):
    """Handles creating and updating profiles"""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # auth
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    # filter
    filter_backends = (filters.SearchFilter,)
    search_fields = ("username", "email",)

class LoginViewSet(viewsets.ViewSet):
    """Checks email and password and returns an auth token."""
    serializer_class = AuthTokenSerializer
    def create(self, request):
        """Use the ObtainAuthToken APIView to validate and create a token."""
        return ObtainAuthToken().post(request)

class User_CommentViewSet(viewsets.ModelViewSet):
    serializer_class = User_CommentSerilizer
    queryset = User_Comment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)
