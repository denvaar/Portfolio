from rest_framework.generics import RetrieveAPIView

from .serializers import AboutSectionSerializer
from .models import AboutSection


class FetchAboutSection(RetrieveAPIView):
    serializer_class = AboutSectionSerializer
    queryset = AboutSection.objects.all()

