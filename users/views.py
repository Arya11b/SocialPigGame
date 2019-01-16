from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets, permissions, filters
from django.contrib.auth.models import User as UserDetail
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from users.serializer import UserSerializer
from .models import User

class GetUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating and updating profiles"""

    serializer_class = UserSerializer
    queryset = User.objects.all()
