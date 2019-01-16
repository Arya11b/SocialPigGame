from rest_framework import generics, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from users import permissions
from users.serializer import UserSerializer
from .models import User
from rest_framework import viewsets, filters, status

class GetUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class UserViewSet(viewsets.ModelViewSet):
    """Handles creating and updating profiles"""

    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
