from rest_framework import serializers
from django.contrib.auth.models import User as UserDetail
from users.models import User


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

