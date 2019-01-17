# Generated by Django 2.1.5 on 2019-01-17 13:48

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20190117_1523'),
    ]

    operations = [
        migrations.CreateModel(
            name='DefaultUser',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('users.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(default=users.models.DefaultUser, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user_comment',
            name='on_user',
            field=models.ForeignKey(default=users.models.DefaultUser, on_delete=django.db.models.deletion.CASCADE, related_name='on_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
