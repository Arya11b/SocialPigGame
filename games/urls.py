from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register("active", views.GameViewSet)
router.register('modes', views.GameModeViewSet)
router.register('comments', views.GameMode_CommentViewSet)
router.register('ratings', views.GameMode_RatingViewSet)
router.register('gcomments', views.Game_CommentViewSet)
router.register('gratings', views.Game_RatingViewSet)
urlpatterns = [
    # path('', views.GetUser.as_view()),
    path('games/', include(router.urls)),
]
# urlpatterns = format_suffix_patterns(urlpatterns)