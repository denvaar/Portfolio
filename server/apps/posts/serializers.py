from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'summary', 'content', 'date_created',
                  'is_published', 'slug', )
        lookup_field = 'slug'

