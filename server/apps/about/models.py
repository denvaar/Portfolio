from django.db import models


class AboutSection(models.Model):
    content = models.TextField()
    date_modified = models.DateField(auto_now=True)

    def __str__(self):
        return 'About Section'

