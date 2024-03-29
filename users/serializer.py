from rest_framework import serializers
from users.models import *

class UserCommentSerilizer(serializers.ModelSerializer):
    comment = User_Comment
    class Meta:
        model = User_Comment
        fields = ('comment_text','on_user','author')
        read_only_fields = ('author',)
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        comment = User_Comment(
            author= User.objects.filter(username=self.context['request'].user)[0],
            on_user= User.objects.filter(username=validated_data["on_user"])[0],
            validated=False,
            comment_text= validated_data["comment_text"]
        )
        comment.save()
        return comment
class AdminCommentSerializer(serializers.ModelSerializer):
    comment = User_Comment
    class Meta:
        model = User_Comment
        fields = ('comment_text','on_user','author','validated','id')
        read_only_fields = ('author','comment_text','on_user','id')

        def create(self, validated_data):
            comment = User_Comment(
                validated=validated_data["validated"],
            )
            comment.save()
            return comment
        # extra_kwargs =  {'password': {'write-only': True}}
class UserSerializer(serializers.ModelSerializer):
    user = User
    class Meta:
        model = User
        fields = ('username','email','picture','password','date_joined','id','first_name','last_name','last_login','date_joined')
        read_only_fields = ('date_joined','id','last_login','picture','date_joined')
        extra_kwargs =  {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            # picture=validated_data["picture"],
        )
        # user.set_friends()
        user.set_password(validated_data["password"])
        user.save()
        return user
class FriendSerializer(serializers.ModelSerializer):
    friend = Friends
    class Meta:
        model = Friends
        fields = ('following','id','follower')
        read_only_fields = ('follower','id')
        extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        friend = Friends(
            follower=User.objects.filter(username=self.context['request'].user)[0],
            following=User.objects.filter(username=validated_data["following"])[0]
        )
        # user.set_friends()
        friend.save()
        return friend

