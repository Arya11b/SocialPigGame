
from django.contrib.auth.models import update_last_login
from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
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
        result = ObtainAuthToken().post(request)
        token = Token.objects.get(key=result.data['token'])
        update_last_login(None, token.user)
        return result
class User_AddFriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    queryset = Friends.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.LoggedIn,)

class User_CommentViewSet(viewsets.ModelViewSet):
    queryset = User_Comment.objects.filter(validated= False)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.Admin,)
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminCommentSerializer
        else: return UserCommentSerilizer
    def get_queryset(self):
        if self.request.user.is_staff:
            return User_Comment.objects.filter(validated= False)
        else: return User_Comment.objects.filter(validated= True)
