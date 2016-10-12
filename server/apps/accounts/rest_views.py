from django.contrib.auth import authenticate
from django.http import Http404

from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


class SessionCreate(APIView):

    def post(self, request, format=None):
        try:
            username = request.data['username']
            password = request.data['password']
        except:
            return Response(
                {'non_field_errors': ['Missing username or password field']},
                status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username.lower(), password=password)
        if user is not None:
            if user.is_active and user.is_superuser:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'non_field_errors': ['User is not active']},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'non_field_errors': ['Incorrect password']},
                        status=status.HTTP_400_BAD_REQUEST)


class UserRetrieve(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        if user.is_active:
            return user
        raise Http404('Invalid user')

