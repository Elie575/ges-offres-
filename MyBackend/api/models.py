
from django.db import models


class Admin(models.Model):
    utilisateurs = models.OneToOneField('Utilisateurs', models.DO_NOTHING, primary_key=True)
  
    class Meta:
        managed = True
        db_table = 'admin'

class Candidat(models.Model):
    utilisateurs = models.OneToOneField('Utilisateurs', models.DO_NOTHING, primary_key=True)
  

    class Meta:
        managed = True
        db_table = 'candidat'


class Candidature(models.Model):
    id = models.BigAutoField(primary_key=True)
    statut_candidature = models.CharField(max_length=20)
    date_candidature = models.DateTimeField()
    cv = models.ForeignKey('Cv', models.DO_NOTHING, blank=True, null=True)
    offre_emploi = models.ForeignKey('Offreemploi', models.DO_NOTHING)
    candidat = models.ForeignKey(Candidat, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'candidature'


class Categorie(models.Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = True
        db_table = 'categorie'


class Certifications(models.Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    cv = models.ForeignKey('Cv', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'certifications'


class Competences(models.Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    cv = models.ForeignKey('Cv', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'competences'

class Cv(models.Model):
    id = models.BigAutoField(primary_key=True)
    photo = models.ImageField(upload_to='profil_cv/', null=True, blank=True)
    profil = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'cv'

class Discussion(models.Model):
    id_discussion = models.AutoField(primary_key=True)
    contenu = models.CharField(max_length=400)
    candidat = models.ForeignKey(Candidat, models.DO_NOTHING, db_column='candidat', blank=True, null=True)
    date_envoi = models.DateTimeField(blank=True, null=True)
    recruteur = models.ForeignKey('Recruteur', models.DO_NOTHING, db_column='recruteur', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'discussion'

class Experiences(models.Model):
    id = models.BigAutoField(primary_key=True)
    entreprise = models.CharField(max_length=100)
    poste = models.CharField(max_length=100)
    dates = models.CharField(max_length=50)
    description = models.TextField()
    cv = models.ForeignKey(Cv, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'experiences'


class Formations(models.Model):
    id = models.BigAutoField(primary_key=True)
    etablissement = models.CharField(max_length=100)
    diplome = models.CharField(max_length=100)
    dates = models.CharField(max_length=50)
    cv = models.ForeignKey(Cv, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'formations'


class Langues(models.Model):
    id = models.BigAutoField(primary_key=True)
    langue = models.CharField(max_length=50)
    niveau = models.CharField(max_length=50)
    cv = models.ForeignKey(Cv, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'langues'

class Entreprise(models.Model):
    nom = models.CharField(max_length=150)
    logo = models.ImageField(
        upload_to='entreprises/logos/',
        blank=True,
        null=True
    )
    class Meta:
        db_table = 'entreprise'
        ordering = ['nom']

    def __str__(self):
        return self.nom



class Offreemploi(models.Model):
    id = models.BigAutoField(primary_key=True)
    titre = models.CharField(max_length=255)
    description = models.TextField()
    localisation = models.CharField(max_length=255)
    plage_salaire = models.CharField(max_length=100)
    type_contrat = models.CharField(max_length=50)
    exigences = models.TextField()
    cree_le = models.DateTimeField(auto_now_add=True)
    date_limite = models.DateField()
    categorie = models.ForeignKey(Categorie, models.DO_NOTHING, blank=True, null=True)
    publie_par = models.ForeignKey('Utilisateurs', models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(max_length=10 , default='encours')

    class Meta:
        managed = True
        db_table = 'offreemploi'


class Recruteur(models.Model):
    utilisateurs_id = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = True
        db_table = 'recruteur'


class Utilisateurs(models.Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    email = models.CharField(unique=True, max_length=100)
    code = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    contact = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'utilisateurs'
