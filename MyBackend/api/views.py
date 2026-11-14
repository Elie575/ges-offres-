from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
import json
from rest_framework import  status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .models import *
from django.conf import settings
from .serializers import  CvSerializer, ExperSerializer, OffreEmploiSerializer, UtilisateurSerializer
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Utilisateurs  # Assurez-vous d'importer votre modèle

def photoutilisateur(request, user_id):
    uti = get_object_or_404(Utilisateurs, id=user_id)

    # Récupérer l'URL complète de la photo
    photo_url = None
    if uti.photo:
        photo_url = request.build_absolute_uri(uti.photo.url)

    # Renvoyer les informations de l'utilisateur
    data = {
        "id": uti.id,
        "nom": uti.nom,
        "email": uti.email,
        "photo": photo_url,
        "role": uti.role,
        "contact": uti.contact,
    }

    return JsonResponse(data, status=200)



class inscription(viewsets.ModelViewSet):
    queryset = Utilisateurs.objects.all()
    serializer_class = UtilisateurSerializer

def login(request):
        email = request.GET.get('email')
        code = request.GET.get('code')
        try:
            utilisateur = Utilisateurs.objects.get(email=email,code=code)
            if utilisateur : 
             return JsonResponse({
                'status': 'success',
                'role': utilisateur.role,'id':utilisateur.id})
        except Utilisateurs.DoesNotExist:
            return JsonResponse({'status': 'error'}, status=400)


class parametre(viewsets.ModelViewSet):
    queryset = Cv.objects.all()
    serializer_class = CvSerializer

class experience(viewsets.ModelViewSet):
    queryset = Experiences.objects.all()
    serializer_class =  ExperSerializer 


@csrf_exempt
def ajoutExpe(request):
    
    data = json.loads(request.body)
    best = Cv.objects.last()
    cv = Cv.objects.get(id=best.id)
    exper = Experiences.objects.create(
    entreprise = data.get('entreprise'),
    poste = data.get('poste'),
    dates = data.get ('dates'),
    description = data.get('description'),
    cv=cv)  
    return JsonResponse({'status': 'succes'})

@csrf_exempt
def ajoutFormat(request):
    data = json.loads(request.body)
    forma = Cv.objects.last()
    cv = Cv.objects.get(id=forma.id)
    format = Formations.objects.create(
    etablissement = data.get('etablissement'),
    diplome = data.get('diplome'),
    dates = data.get ('dates'),
    cv=cv)  
    return JsonResponse({'status': 'succes'})

@csrf_exempt
def ajoutComp(request):
    data = json.loads(request.body)
    compt = Cv.objects.last()
    cv = Cv.objects.get(id=compt.id)
    comp = Competences.objects.create(
    nom = data.get('nom'),
    cv=cv)  
    return JsonResponse({'status': 'succes'})


@csrf_exempt
def ajoutLan(request):
    data = json.loads(request.body)
    lans = Cv.objects.last()
    cv = Cv.objects.get(id=lans.id)
    Lang = Langues.objects.create(
    langue = data.get('langue'),
    niveau = data.get('niveau'),
    cv=cv)  
    return JsonResponse({'status': 'succes'})

@csrf_exempt
def ajoutCert(request):
    data = json.loads(request.body)
    cerf = Cv.objects.last()
    cv = Cv.objects.get(id=cerf.id)
    cert = Certifications.objects.create(
    nom = data.get('nom'),
    cv=cv)  
    return JsonResponse({'status': 'succes'})


class OffreEmploiCreateView(viewsets.ModelViewSet):
    serializer_class = OffreEmploiSerializer
    def get_queryset(self):   
        publie_par= self.request.query_params.get('utilisateur')
        if publie_par:
            return Offreemploi.objects.filter(publie_par=publie_par)
        return Offreemploi.objects.all().select_related('publie_par')
    
    

    @action(detail=True, methods=['put']) # type: ignore
    def valider(self, request, pk=None):
        offre = self.get_object()
        offre.status = 'valide'
        offre.save()
        return Response({'status': 'offre validée'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put']) # type: ignore
    def rejeter(self, request, pk=None):
        offre = self.get_object()
        offre.status = 'rejete'
        offre.save()
        return Response({'status': 'offre rejetée'}, status=status.HTTP_200_OK)
       