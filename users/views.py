from django.shortcuts import render
from django.http import HttpResponse
from .models import User
def index(request):
    user = User.objects.all()
    output = ', '.join([u.user.username for u in User.objects.all()])
    return HttpResponse(output)

# Create your views here.
