import jwt
from django.conf.urls import include, url

from rest_framework_jwt.views import verify_jwt_token

from .rest_views import SessionCreate, UserRetrieve


urlpatterns = [
    url(r'verify-jwt-token/?$', verify_jwt_token, name='verify-jwt'),
    url(r'sessions/?$', SessionCreate.as_view(), name='login'),
    url(r'^users/retrieve/?$', UserRetrieve.as_view(), name='user-retrieve'),
]

