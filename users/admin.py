from django.contrib import admin
from .models import *
admin.site.register(User)
admin.site.register(Friends)
admin.site.register(User_Comment)