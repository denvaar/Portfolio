from rest_framework import serializers

from .models import AboutSection


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ('content', )

