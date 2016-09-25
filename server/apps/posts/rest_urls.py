from django.conf.urls import url

from .rest_views import GetPost, PostList


urlpatterns = [
    url(r'^(?P<slug>[-\w\d]+)/?$', GetPost.as_view(),
        name='post-detail'),
    url(r'^$', PostList.as_view(),
        name='post-list'),
]
