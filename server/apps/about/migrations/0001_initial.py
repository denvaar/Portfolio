# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-19 03:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date_modified', models.DateField(auto_now=True)),
            ],
        ),
    ]
