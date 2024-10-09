from django.shortcuts import render  # Import Django's shortcut functions (not used in this case)
from django.contrib.auth.models import User  # Import Django's built-in User model
from rest_framework import generics  # Import generic views from Django Rest Framework
from .serializers import UserSerializer, NoteSerializer  # Import the custom serializers for User and Note
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import permission classes for access control
from .models import Note  # Import the custom Note model


# A view to list all notes for the authenticated user and create new notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer  # Specify the serializer for Note
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view
    
    # This method defines the queryset, which is the list of notes that will be displayed
    def get_queryset(self):
        user = self.request.user  # Get the current authenticated user from the request
        return Note.objects.filter(author=user)  # Return only the notes that belong to the current user
    
    # This method is called when a new note is being created
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)  # Save the note with the current user as the author
        else:
            print(serializer.errors)  # Print validation errors if any

# A view to delete a note for the authenticated user
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer  # Specify the serializer for Note
    permission_classes = [IsAuthenticated]  # Only authenticated users can delete notes
    
    # This method defines the queryset, ensuring that users can only delete their own notes
    def get_queryset(self):
        user = self.request.user  # Get the current authenticated user
        return Note.objects.filter(author=user)  # Return only the notes that belong to the current user

# A view to create a new user (registration)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Define the queryset as all users
    serializer_class = UserSerializer  # Specify the serializer for User
    permission_classes = [AllowAny]  # Anyone can create a new user (no authentication required)
