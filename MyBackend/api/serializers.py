
from rest_framework import serializers
from .models import *


class UtilisateurSerializer (serializers.ModelSerializer):
    class Meta : 
      model = Utilisateurs
      fields = '__all__'

    def create(self, validated_data):
      user = Utilisateurs.objects.create(
         
    photo = validated_data['photo'],
    nom = validated_data['nom'],
    email = validated_data['email'],
    code = validated_data['code'],
    role = validated_data['role'],
    contact = validated_data['contact'],
       )     
      return user   
    


    
class CvSerializer (serializers.ModelSerializer):
    class Meta : 
      model = Cv
      fields = '__all__'

    def create(self, validated_data):
      curriculum = Cv.objects.create(
 
    photo = validated_data['photo'],
    profil = validated_data['profil'],)     
      return curriculum 

class ExperSerializer (serializers.ModelSerializer):
    cv = serializers.PrimaryKeyRelatedField(queryset=Cv.objects.all())
    class Meta : 
      model = Experiences
      fields = '__all__'

    def create(self, validated_data):
      cv_id = validated_data.pop('cv').pk
      cv = Cv.objects.get(pk=cv_id)
      exper = Experiences.objects.create(
    entreprise = validated_data['entreprise'],
    poste = validated_data['poste'],
    dates = validated_data['dates'],
    description = validated_data['description'],
    cv = cv)     
      return exper

class OffreEmploiSerializer(serializers.ModelSerializer):
    publie_par = serializers.PrimaryKeyRelatedField(queryset=Utilisateurs.objects.filter(role='recruteur'))
    publie=UtilisateurSerializer(source='publie_par',read_only=True)
    class Meta:
        model = Offreemploi
        fields = ['id','publie_par','publie','titre','description','localisation','plage_salaire','type_contrat','exigences','date_limite','cree_le' ,'status'] 
    def create(self, validated_data):
       recruteur_id = validated_data.pop('publie_par').pk 
       recruteur = Utilisateurs.objects.get(pk=recruteur_id)
       offre= Offreemploi.objects.create(
       titre = validated_data['titre'],
    description = validated_data['description'],
    localisation = validated_data['localisation'],
    plage_salaire = validated_data['plage_salaire'],
    type_contrat = validated_data['type_contrat'],
    exigences = validated_data['exigences'],
    date_limite= validated_data['date_limite'],
    creer_le = validated_data['cree_le'],
    status = validated_data['status'],
    publie_par = recruteur
      
       )
       return offre
    

    

