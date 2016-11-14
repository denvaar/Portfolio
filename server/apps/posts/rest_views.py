from rest_framework.generics import (
    RetrieveAPIView,
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import PostSerializer
from .models import Post


class GetPost(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'slug'


class PostList(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CreatePost(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer


class DetailPost(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'slug'

