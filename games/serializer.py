import datetime

from rest_framework import serializers
from django.contrib.auth.models import User as UserDetail
from games.models import *


class GameCommentSerilizer(serializers.ModelSerializer):
    comment = Game_Comment
    class Meta:
        model = Game_Comment
        fields = ('comment_text','game')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        comment = Game_Comment(
            author= User.objects.filter(username=self.context['request'].user)[0],
            validated=False,
            comment_text= validated_data["comment_text"],
            game= validated_data["game"],
        )
        comment.save()
        return comment
class AdminGameCommentSerilizer(serializers.ModelSerializer):
    comment = Game_Comment
    class Meta:
        model = Game_Comment
        fields = ('comment_text','game','author','validated','id')
        read_only_fields = ('author','comment_text','game','id')

        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        comment = Game_Comment(
            validated=validated_data['validated'],
        )
        comment.save()
        return comment
class GameRatingSerilizer(serializers.ModelSerializer):
    rating = Game_Rating
    class Meta:
        model = Game_Rating
        fields = ('rate','game')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        rating = Game_Rating(
            rater= User.objects.filter(username=self.context['request'].user)[0],
            game= validated_data["game"],
            rate= validated_data["rate"]
        )
        rating.save()
        return rating
class AdminGameModeCommentSerilizer(serializers.ModelSerializer):
    comment = GameMode_Comment
    class Meta:
        model = GameMode_Comment
        fields = ('comment_text', 'game_mode', 'author', 'validated', 'id')
        read_only_fields = ('author', 'comment_text', 'game_mode', 'id')
    def create(self, validated_data):
        comment = GameMode_Comment(
            validated=validated_data['validated'],
        )
        comment.save()
        return comment
class GameModeCommentSerilizer(serializers.ModelSerializer):
    comment = GameMode_Comment
    class Meta:
        model = GameMode_Comment
        fields = ('comment_text','game_mode')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        comment = GameMode_Comment(
            author= User.objects.filter(username=self.context['request'].user)[0],
            game_mode= GameMode.objects.filter(name=validated_data["game_mode"])[0],
            validated=False,
            comment_text= validated_data["comment_text"]
        )
        comment.save()
        return comment
class GameModeRatingSerilizer(serializers.ModelSerializer):
    rating = GameMode_Rating
    class Meta:
        model = GameMode_Rating
        fields = ('rate','game_mode','rater','date')
        read_only_fields = ('rater','date')
    def create(self, validated_data):
        rating = GameMode_Rating(
            rater= User.objects.filter(username=self.context['request'].user)[0],
            game_mode= GameMode.objects.filter(name=validated_data["game_mode"])[0],
            rate= validated_data["rate"]
        )
        rating.save()
        return rating

class GameSerializer(serializers.ModelSerializer):
    game = Game
    class Meta:
        model = Game
        fields = ('game_mode','id','log','player1_score','player2_score','player1_cscore','player2_cscore','player1','player2','date','done','active')
        read_only_fields = ('id','log','player1_score','player2_score','player1_cscore','player2_cscore','player1','player2','date','done','active')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        game = Game(
            active= True,
            player1_score=0,
            player2_score=0,
            player1= User.objects.filter(username=self.context['request'].user)[0],
            # player2= User.objects.filter(username=self.context['request'].user)[0],
            game_mode= GameMode.objects.filter(name=validated_data['game_mode'])[0]
        )
        game.save()
        return game
class GameModeSerializer(serializers.ModelSerializer):
    game_mode = GameMode
    class Meta:
        model = GameMode
        fields = ('name','death_dice','max_score','dice_count','max_dice_role','id')
        read_only_fields = ('id',)
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        print(User.objects.filter(username=self.context['request'].user)[0])
        game_mode = GameMode(
            name= validated_data["name"],
            death_dice=validated_data["death_dice"],
            max_score=validated_data["max_score"],
            dice_count=validated_data["dice_count"],
            max_dice_role=validated_data["max_dice_role"],
            creator= User.objects.filter(username=self.context['request'].user)[0],
        )
        print(self.context['request'].user)
        game_mode.save()
        return game_mode

