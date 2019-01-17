from rest_framework import serializers
from users.models import *

class User_CommentSerilizer(serializers.ModelSerializer):
    comment = User_Comment
    class Meta:
        model = User_Comment
        fields = ('comment_text','on_user')
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

class UserSerializer(serializers.ModelSerializer):
    user = User
    class Meta:
        model = User
        fields = ('username','email','picture','password')
        # extra_kwargs =  {'password': {'write-only': True}}
    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            picture=validated_data["picture"],
        )
        # user.set_friends()
        user.set_password(validated_data["password"])
        user.save()
        return user


