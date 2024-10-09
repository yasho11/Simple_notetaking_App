from django.urls import path  # Import path for defining URL patterns
from . import views  # Import the views from the current app

# Define URL patterns for the app
urlpatterns = [
    # URL pattern for listing and creating notes
    # When a user accesses the "notes/" URL, it will call the `NoteListCreate` view
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),

    # URL pattern for deleting a note by its primary key (id)
    # When a user accesses "note/delete/<int:pk>/", it will call the `NoteDelete` view
    # <int:pk> is a dynamic segment that will capture the note's ID from the URL
    path("note/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]
