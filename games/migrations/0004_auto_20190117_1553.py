# Generated by Django 2.1.5 on 2019-01-17 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_game_game_mode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamemode',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
