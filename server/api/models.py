from django.db import models  # Import Django's built-in models module
from django.contrib.auth.models import User  # Import the built-in User model from Django's authentication system


# Create your models here.

# Define a model for storing notes in the database
class Note(models.Model):
    # Title of the note, limited to 100 characters
    title = models.CharField(max_length=100)
    
    # The content of the note, no character limit
    content = models.TextField()
    
    # Timestamp of when the note was last created or modified, set automatically
    created_at = models.DateTimeField(auto_now=True)
    
    # A foreign key relationship to the built-in User model, associating a note with its author
    # When the user (author) is deleted, all related notes will be deleted (CASCADE).
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    
    # This method defines what is returned when the note is converted to a string, typically used for displaying in the admin panel or console
    def __str__(self):
        return self.title  # Returns the title of the note as the string representation
