# Generated by Django 2.1.5 on 2019-01-17 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20190117_1523'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='game_mode',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='mode', to='games.GameMode'),
        ),
    ]