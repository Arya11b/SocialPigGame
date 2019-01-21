from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser as u
from django.contrib.auth.models import AnonymousUser
from django.utils.timezone import now

from dicemania import settings


class User(u):
    picture = models.ImageField(upload_to='user_images',default='no image',null=True)
    friends = models.ManyToManyField('self', through='Friends',
                                           symmetrical=False,
                                           related_name='follows')
    def set_friends(self):
        self.friends.set([])
    def __str__(self):
        return self.username
class DefaultUser(User):
    pass
class Friends(models.Model):
    follower = models.ForeignKey(User,on_delete=models.PROTECT, related_name='follower')
    following = models.ForeignKey(User,on_delete=models.PROTECT, related_name='following')
    date = models.DateTimeField(default=now)

class Comment(models.Model):
    comment_text = models.TextField()
    author = models.ForeignKey(User,default=0,on_delete=models.SET_DEFAULT,related_name='author')
    validated = models.BooleanField(default=False)
    date = models.DateTimeField(default=now)

class User_Comment(Comment):
    on_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='on_user',default=0)