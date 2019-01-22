import datetime
import random

from rest_framework import serializers
from django.contrib.auth.models import User as UserDetail
from rest_framework.utils import model_meta

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
        fields = ('game_mode','id','dice','log','player1_score','player2_score','player1_cscore','player2_cscore','player1','player2','date','done','active')
        read_only_fields = ('id','log','dice','player1_score','player2_score','player1_cscore','player2_cscore','player1','date','done','active')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        game = Game(
            active= True,
            player1_score=0,
            player2_score=0,
            player1_cscore=0,
            player2_cscore=0,
            player1= User.objects.filter(username=self.context['request'].user)[0],
            # player2= User.objects.filter(pk=self.context['request'].data['player2'])[0],
            game_mode= GameMode.objects.filter(pk=self.context['request'].data['game_mode'])[0],
        )
        game.save()
        return game
    def update(self, instance, validated_data):
        info = model_meta.get_field_info(instance)
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                field.set(value)
            else:
                setattr(instance, attr, value)
        gm = getattr(instance,'game_mode')
        p1 = getattr(instance,'player1')
        p2 = getattr(instance,'player2')
        if self.context['request'].data['log'] ==  0 and getattr(instance,'log')=='':
            setattr(instance,'active',False)
            setattr(instance,'log','1')
        turn = getattr(instance,'log')
        print(turn)
        if self.context['request'].data['log'] == 1  and turn == '1':
            print('b')
            cscore = getattr(instance,'player1_cscore')
            d = []
            setattr(instance, 'dice', d)
            r = random.randint(1,6)
            d.append(r)
            setattr(instance, 'dice', d)
            if r == gm.death_dice:
                setattr(instance,'player1_cscore',0)
                setattr(instance, 'log', '2')
            else:
                setattr(instance,'player1_cscore',r + cscore)
        elif self.context['request'].data['log'] == 2  and turn == '2':
            print('b')
            cscore = getattr(instance,'player2_cscore')
            d = []
            setattr(instance, 'dice', d)
            r = random.randint(1, 6)
            d.append(r)
            setattr(instance, 'dice', d)
            if r == gm.death_dice:
                setattr(instance,'player2_cscore',0)
                setattr(instance, 'log', '1')
            else:
                setattr(instance,'player2_cscore',r + cscore)
        elif self.context['request'].data['log'] == 3  and turn == '1':
            print('b')
            cscore = getattr(instance, 'player1_cscore')
            score = getattr(instance, 'player1_score')
            setattr(instance, 'player1_score', cscore + score)
            setattr(instance, 'player1_cscore', 0)
            setattr(instance,'log','2')
            if getattr(instance,'player1_score') >= gm.max_score:
                setattr(instance,'done',True)
                setattr(instance, 'log', '3')

        elif self.context['request'].data['log'] == 4  and turn == '2':
            print('b')
            cscore = getattr(instance, 'player2_cscore')
            score = getattr(instance, 'player2_score')
            setattr(instance, 'player2_score', cscore + score)
            setattr(instance, 'player2_cscore', 0)
            setattr(instance, 'log', '1')
            if getattr(instance, 'player2_score') >= gm.max_score:
                setattr(instance,'done',True)
                setattr(instance, 'log', '4')
        instance.save()

        return instance

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

