from django.contrib import admin
from .models import Pagina, Seccion

class SeccionInline(admin.TabularInline):  # Usamos Inline para asociar Secciones a Páginas
    model = Seccion
    extra = 1  # Esto permite agregar nuevas Secciones directamente desde el admin de Pagina
    fields = ('template_name', 'tags')

class PaginaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'orden')
    inlines = [SeccionInline]  # Añadimos el inline para que se pueda editar directamente desde PaginaAdmin

admin.site.register(Pagina, PaginaAdmin)
admin.site.register(Seccion)
