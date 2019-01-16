from django.db import models
from users.models import User
class Game(models.Model):
    log = models.TextField()
    player1_score = models.IntegerField()
    player2_score = models.IntegerField()
    date = models.DateTimeField()
    # ratings
    # comments
    # players
class Game_Modes(models.Model):
    name = models.CharField(max_length=255)
    #creator
    death_dice = models.IntegerField(default=1)
    max_score = models.IntegerField(default=250)
    dice_count = models.IntegerField(default=1)
    max_dice_role = models.IntegerField(default=-1)
    date = models.DateTimeField()
    creator = models.ForeignKey(User,on_delete=models.CASCADE)

