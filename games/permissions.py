from rest_framework import permissions

class LoggedIn(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id
    def has_permission(self, request, view):
        """Check user is trying to edit their own profile."""
        # return False
        # print(obj.id)
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.id > 0 :
            return True
        return False
        # return obj.id != 0