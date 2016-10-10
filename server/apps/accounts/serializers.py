from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    jwt = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'jwt', 'first_name', 'last_name')

    def create(self, validate_data):
        instance = super(UserSerializer, self).create(validate_data)
        instance.set_password(self.initial_data.get('password'))
        instance.save()
        return instance

    def validate(self, data):
        if not self.instance and not self.initial_data.get('password'):
            raise serializers.ValidationError(
                {'password': ['Password is required.']})
        return data

    def get_jwt(self, obj):
        payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        encode_handler = api_settings.JWT_ENCODE_HANDLER
        try:
            payload = payload_handler(obj)
            token = encode_handler(payload)
        except:
            token = ''
        return token

    
