"""
Vistas de la API con ViewSets de DRF.
Cada ViewSet da automaticamente las 5 operaciones CRUD
(list, retrieve, create, update, destroy).
"""
from rest_framework import viewsets
from .models import Producto, Empleado, Cliente, Servicio, Orden
from .serializers import (
    ProductoSerializer, EmpleadoSerializer, ClienteSerializer,
    ServicioSerializer, OrdenSerializer,
)


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
