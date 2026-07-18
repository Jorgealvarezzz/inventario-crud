"""
Rutas de la API. El router de DRF genera automaticamente:
  /api/productos/   /api/empleados/   /api/clientes/
  /api/servicios/   /api/ordenes/
con soporte GET, POST, PUT, DELETE.
"""
from rest_framework.routers import DefaultRouter
from .views import (
    ProductoViewSet, EmpleadoViewSet, ClienteViewSet,
    ServicioViewSet, OrdenViewSet,
)

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'empleados', EmpleadoViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'ordenes', OrdenViewSet)

urlpatterns = router.urls
