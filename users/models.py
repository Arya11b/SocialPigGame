from django.db import models
from django.contrib.auth.models import User as u
from django.contrib.auth.models import AnonymousUser
class User(models.Model):
    user = models.OneToOneField(u,on_delete=models.CASCADE,default=0)
    picture = models.ImageField(upload_to='user_images',default='no image')
class User_Comment(models.Model):
    comment_text = models.TextField()
    author = models.ForeignKey(User,on_delete=models.CASCADE)
