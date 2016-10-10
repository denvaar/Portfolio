from django.conf.urls import include, url
from django.contrib import admin

from apps.core.views import Index


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', Index.as_view(), name='index'),
    url(r'^api/v1/', include('apps.about.rest_urls', namespace='about')),
    url(r'^api/v1/posts/', include('apps.posts.rest_urls', namespace='posts')),
    url(r'^api/v1/accounts/', include('apps.accounts.rest_urls',
        namespace='accounts')),
]

