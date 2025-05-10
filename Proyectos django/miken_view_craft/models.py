from django.db import models

# Create your models here.
class Pagina(models.Model):
    titulo = models.CharField(max_length=100)
    orden = models.PositiveIntegerField()
    
    def __str__(self):
        return self.titulo

class Seccion(models.Model):
    secciones = models.ForeignKey('Pagina',related_name='promocion_seccion', null=True, blank=True, on_delete=models.PROTECT)
    template_name = models.CharField(max_length=100)
    tags = models.TextField(blank=True)

    def __str__(self):
        return self.template_name

    
