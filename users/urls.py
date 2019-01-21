from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns

from dicemania import settings
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('profile' , views.UserViewSet)
router.register('comment' , views.User_CommentViewSet)
router.register('friends' , views.User_AddFriendViewSet)
router.register('login' ,views.LoginViewSet, base_name='login')
urlpatterns = [
    # path('', views.GetUser.as_view()),
    path('users/', include(router.urls)),
]
# urlpatterns = format_suffix_patterns(urlpatterns)