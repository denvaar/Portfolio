from django.conf.urls import url

from .rest_views import FetchAboutSection


urlpatterns = [
    url(r'^about-section/(?P<pk>\d+)/?$', FetchAboutSection.as_view(),
        name='about-section'),
]
