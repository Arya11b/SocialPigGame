
from django.contrib.auth.models import update_last_login
from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

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
        user = User.objects.filter(pk= token.user_id)[0]
        update_last_login(None, token.user)
        # return result
        return Response({'token': token.key, 'id': token.user_id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name, 'is_staff': user.is_staff})
class User_AddFriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    queryset = Friends.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.FriendAddRemove,)

class User_CommentViewSet(viewsets.ModelViewSet):
    queryset = User_Comment.objects.filter(validated= True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.Admin,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ("on_user__id",)
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminCommentSerializer
        else: return UserCommentSerilizer
    def get_queryset(self):
        if self.request.user.is_staff:
            return User_Comment.objects.all()
        else: return User_Comment.objects.filter(validated=True)
