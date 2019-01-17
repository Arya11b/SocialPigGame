from django.db import models
from users.models import *
class Game(models.Model):
    log = models.TextField()
    player1_score = models.IntegerField()
    player2_score = models.IntegerField()
    date = models.DateTimeField()
    player1 = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0,related_name="player1")
    player2 = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0,related_name="player2")
    done = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
class GameMode(models.Model):
    name = models.CharField(max_length=255)
    #creator
    death_dice = models.IntegerField(default=1)
    max_score = models.IntegerField(default=250)
    dice_count = models.IntegerField(default=1)
    max_dice_role = models.IntegerField(default=-1)
    date = models.DateTimeField()
    creator = models.ForeignKey(User,on_delete=models.CASCADE)
class Rating(models.Model):
    rate = models.IntegerField()
    rater = models.ForeignKey(User,on_delete=models.SET_DEFAULT,default=0)
    validated = models.BooleanField(default=False)
class Game_Comment(Comment):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)
class Game_Rating(Rating):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)
class GameMode_Comment(Comment):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)
class GameMode_Rating(Rating):
    game = models.ForeignKey(Game,on_delete=models.CASCADE,default=0)

