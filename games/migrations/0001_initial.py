# Generated by Django 2.1.5 on 2019-01-20 07:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('log', models.TextField()),
                ('player1_score', models.IntegerField()),
                ('player2_score', models.IntegerField()),
                ('player1_cscore', models.IntegerField(default=0)),
                ('player2_cscore', models.IntegerField(default=0)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('done', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Game_Comment',
            fields=[
                ('comment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.Comment')),
                ('game', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='games.Game')),
            ],
            bases=('users.comment',),
        ),
        migrations.CreateModel(
            name='GameMode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('death_dice', models.IntegerField(default=1)),
                ('max_score', models.IntegerField(default=250)),
                ('dice_count', models.IntegerField(default=1)),
                ('max_dice_role', models.IntegerField(default=-1)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('creator', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GameMode_Comment',
            fields=[
                ('comment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.Comment')),
                ('game_mode', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='games.GameMode')),
            ],
            bases=('users.comment',),
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField()),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Game_Rating',
            fields=[
                ('rating_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='games.Rating')),
            ],
            bases=('games.rating',),
        ),
        migrations.CreateModel(
            name='GameMode_Rating',
            fields=[
                ('rating_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='games.Rating')),
                ('game_mode', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='games.GameMode')),
            ],
            bases=('games.rating',),
        ),
        migrations.AddField(
            model_name='rating',
            name='rater',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='game',
            name='game_mode',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='mode', to='games.GameMode'),
        ),
        migrations.AddField(
            model_name='game',
            name='player1',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='player1', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='game',
            name='player2',
            field=models.ForeignKey(default=0, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='player2', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='game_rating',
            name='game',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='games.Game'),
        ),
    ]
