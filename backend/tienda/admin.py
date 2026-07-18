"""
Panel de administracion.
Cada modelo se registra con list_display, list_filter, search_fields y ordering.
"""
from django.contrib import admin
from .models import Producto, Empleado, Cliente, Servicio, Orden


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'stock')
    list_filter = ('categoria',)
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'rol', 'telefono', 'activo', 'fecha_contratacion')
    list_filter = ('rol', 'activo')
    search_fields = ('nombre', 'telefono')
    ordering = ('nombre',)


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'telefono', 'correo', 'direccion')
    list_filter = ('nombre',)
    search_fields = ('nombre', 'correo', 'telefono')
    ordering = ('nombre',)


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'duracion_min')
    list_filter = ('duracion_min',)
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)


@admin.register(Orden)
class OrdenAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'empleado', 'producto', 'cantidad', 'estado', 'fecha')
    list_filter = ('estado', 'empleado', 'fecha')
    search_fields = ('cliente__nombre', 'producto__nombre')
    ordering = ('-fecha',)
