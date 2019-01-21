import hashlib

from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AnonymousUser

from users.models import *
class GameMode(models.Model):
    name = models.CharField(max_length=255,unique=True)
    death_dice = models.IntegerField(default=1)
    max_score = models.IntegerField(default=250)
    dice_count = models.IntegerField(default=1)
    max_dice_role = models.IntegerField(default=-1)
    date = models.DateTimeField(default=now)
    creator = models.ForeignKey(User,on_delete=models.CASCADE,default=0)
    def __str__(self):
        return self.name
class Game(models.Model):
    log = models.TextField()
    player1_score = models.IntegerField()
    player2_score = models.IntegerField()
    player1_cscore = models.IntegerField(default=0)
    player2_cscore = models.IntegerField(default=0)
    date = models.DateTimeField(default=now)
    player1 = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0,related_name="player1")
    player2 = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0,related_name="player2",null=True)
    game_mode = models.ForeignKey(GameMode,on_delete=models.SET_DEFAULT,default=0,related_name="mode")
    done = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    @property
    def id_hash(self):
        return hashlib.md5(str(self.id).encode('utf8')).hexdigest()
    def __str__(self):
        # return str(self.id)
        return self.id_hash
class Rating(models.Model):
    rate = models.IntegerField()
    rater = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0)
    date = models.DateTimeField(default=now)
class Game_Comment(Comment):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)
class Game_Rating(Rating):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)
class GameMode_Comment(Comment):
    game_mode = models.ForeignKey(GameMode,on_delete=models.CASCADE,default=0)
class GameMode_Rating(Rating):
    game_mode = models.ForeignKey(GameMode,on_delete=models.CASCADE,default=0)