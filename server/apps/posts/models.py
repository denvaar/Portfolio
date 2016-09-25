from datetime import datetime

from django.db import models
from django.template.defaultfilters import slugify


class Post(models.Model):
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    content = models.TextField()
    date_created = models.DateField(default=datetime.today)
    is_published = models.BooleanField(default=False, blank=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return '[{}] {}...'.format(self.title, self.content[:15])

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)

