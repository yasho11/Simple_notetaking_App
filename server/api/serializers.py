from django.contrib.auth.models import User  # Import the built-in User model for authentication
from rest_framework import serializers  # Import DRF's serializers to serialize/deserialize data
from .models import Note  # Import the custom Note model from your app

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specifies the User model to serialize
        fields = ["id", "username", "password"]  # Fields to include in the serialized output
        extra_kwargs = {
            "password": {"write_only": True}  # Ensures that password is write-only (not included in GET responses)
        }

    # This method is called when a new user is created
    def create(self, validated_data):
        # Use the `create_user` method to handle user creation, which takes care of hashing the password
        user = User.objects.create_user(**validated_data)
        return user

# Serializer for the Note model
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note  # Specifies the Note model to serialize
        fields = ["id", "title", "content", "created_at", "author"]  # Fields to include in the serialized output
        extra_kwargs = {
            "author": {"read_only": True}  # Author field is read-only, as it is usually set based on the logged-in user
        }
