from django.urls import path
from miken_view_craft.view.home import inicio  # Asegúrate de importar las vistas de tu aplicación

urlpatterns = [
    path('<str:titulo>/', inicio, name='inicio'),
]