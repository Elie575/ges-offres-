
from django.urls import include, path 
from django import urls
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from MyBackend import settings 
from .views import *

router = DefaultRouter()
router.register(r'inscrire', inscription ,basename='Utilisateurs')
router.register(r'relationCv',parametre, basename = 'Cv')
router.register(r'offres-emploi', OffreEmploiCreateView ,basename='Offreemploi')


urlpatterns = [ 

    path('api/',include(router.urls)),
    path('connecter/',login,name='connecter'),
    path('ajoutExper/',ajoutExpe,name='ajoutEx'),
    path('ajoutForma/',ajoutFormat,name='ajoutForm'),
    path('ajoutCompe/',ajoutComp,name='ajoutCom'),
    path('ajoutLang/',ajoutLan,name='Lang'),
    path('ajoutCerti/',ajoutCert,name='ajoutCer'),
    path('api/utilisateur-connecte/<int:user_id>',photoutilisateur,name='photo'),
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  
