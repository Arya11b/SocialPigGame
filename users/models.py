from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser as u

from dicemania import settings


class User(u):
    picture = models.ImageField(upload_to='user_images',default='no image',null=True)
    friends = models.ManyToManyField('self', through='Friends',
                                           symmetrical=False,
                                           related_name='follows')
    def set_friends(self):
        self.friends.set([])
class Friends(models.Model):
    follower = models.ForeignKey(User,on_delete=models.PROTECT, related_name='follower')
    following = models.ForeignKey(User,on_delete=models.PROTECT, related_name='following')
class Comment(models.Model):
    comment_text = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL,default=0,on_delete=models.SET_DEFAULT,related_name='author')
    validated = models.BooleanField(default=False)
class User_Comment(Comment):
    on_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='on_user',default=0)
