from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register("active", views.GameViewSet)
router.register('modes', views.GameModeViewSet)
urlpatterns = [
    # path('', views.GetUser.as_view()),
    path('games/', include(router.urls)),
]
# urlpatterns = format_suffix_patterns(urlpatterns)