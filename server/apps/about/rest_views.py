from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from .serializers import AboutSectionSerializer
from .models import AboutSection


class FetchAboutSection(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AboutSectionSerializer
    queryset = AboutSection.objects.all()

