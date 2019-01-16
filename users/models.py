from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User as u
from django.contrib.auth.models import AnonymousUser
class User(u):
    picture = models.ImageField(upload_to='user_images',default='no image')

class User_Comment(models.Model):
    comment_text = models.TextField()
    author = models.ForeignKey(User,on_delete=models.CASCADE)
