from django.conf.urls import url

from .rest_views import GetPost, PostList, CreatePost, DetailPost


urlpatterns = [
    url(r'create/?$', CreatePost.as_view(), name='post-create'),
    url(r'^(?P<slug>[-\w\d]+)/?$', GetPost.as_view(),
        name='post-detail'),
    url(r'^(?P<slug>[-\w\d]+)/edit/?$', DetailPost.as_view(),
        name='post-edit'),
    url(r'^$', PostList.as_view(),
        name='post-list'),
]
