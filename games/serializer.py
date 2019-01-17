from rest_framework import serializers
from django.contrib.auth.models import User as UserDetail
from games.models import *


class GameSerializer(serializers.ModelSerializer):
    game = Game
    class Meta:
        model = Game
        fields = ('log','player1_score','player2_score','done','active','player1','player2')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        game = Game(
            active= True,
            player1= self.context['request'].user,
            # not sure if it's correct
            log= ""
        )
        game.save()
        return game
        # user.set_password(validated_data["password"])
        # user.save()
        # return user
class GameModeSerializer(serializers.ModelSerializer):
    game_mode = GameMode
    class Meta:
        model = GameMode
        fields = ('name','death_dice','max_score','dice_count','max_dice_role','creator')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        game_mode = GameMode(
            name= validated_data["name"],
            death_dice=validated_data["death_dice"],
            max_score=validated_data["max_score"],
            dice_count=validated_data["dice_count"],
            max_dice_role=validated_data["max_dice_role"],
            creator=self.context['request'].user,
        )
        print(self.context['request'].user)
        game_mode.save()
        return game_mode
        # user.set_password(validated_data["password"])
        # user.save()
        # return user


