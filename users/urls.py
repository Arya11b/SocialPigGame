from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register("", views.UserViewSet)
urlpatterns = [
    # path('', views.GetUser.as_view()),
    path('', include(router.urls)),
]
# urlpatterns = format_suffix_patterns(urlpatterns)