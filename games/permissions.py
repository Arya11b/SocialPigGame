from rest_framework import permissions

# class LoggedIn(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return request.user.id != 0