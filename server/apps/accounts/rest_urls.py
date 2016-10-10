import jwt
from django.conf.urls import include, url

from rest_framework_jwt.views import verify_jwt_token

from .rest_views import SessionCreate


urlpatterns = [
    url(r'verify-jwt-token/?$', verify_jwt_token, name='verify-jwt'),
    url(r'sessions/?$', SessionCreate.as_view(), name='login'),
]

