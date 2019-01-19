from rest_framework import permissions

class UpdateOwnProfile(permissions.BasePermission):
    """Allows users to edit their own profile."""

    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id

class LoggedIn(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id

    def has_permission(self, request, view):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.id is not None:
            return True
        return False
class Admin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id or request.user.is_staff

    def has_permission(self, request, view):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.id is not None:
            return True
        return False
