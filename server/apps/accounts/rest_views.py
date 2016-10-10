from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer


class SessionCreate(APIView):

    def post(self, request, format=None):
        print (request.data)
        try:
            email = request.data['email']
            password = request.data['password']
        except:
            return Response(
                {'non_field_errors': ['Missing email or password field']},
                status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=email.lower(), password=password)
        if user is not None:
            if user.is_active and user.is_superuser:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'non_field_errors': ['User is not active']},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'non_field_errors': ['Incorrect password']},
                        status=status.HTTP_400_BAD_REQUEST)

                
