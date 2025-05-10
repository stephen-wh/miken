from miken_view_craft.models import Pagina, Seccion
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def inicio(request, titulo):
    return HttpResponse('El título es: {}'.format(titulo))