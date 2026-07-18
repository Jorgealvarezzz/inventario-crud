"""
Modelos de la tienda de autopartes.

5 modelos:
  1. Producto  -> la autoparte / accesorio (ya existia en la version Flask)
  2. Empleado  -> el personal (mostrador, instalador, dueno)
  3. Cliente   -> quien compra
  4. Servicio  -> la instalacion que se cobra aparte
  5. Orden     -> la venta; relaciona Cliente, Empleado, Producto y Servicio
"""
from django.db import models


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    descripcion = models.TextField(blank=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Empleado(models.Model):
    ROLES = [
        ('mostrador', 'Mostrador'),
        ('instalador', 'Instalador'),
        ('dueno', 'Dueno'),
    ]
    nombre = models.CharField(max_length=100)
    rol = models.CharField(max_length=20, choices=ROLES, default='mostrador')
    telefono = models.CharField(max_length=15, blank=True)
    activo = models.BooleanField(default=True)
    fecha_contratacion = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} ({self.get_rol_display()})"


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, blank=True)
    correo = models.EmailField(blank=True)
    direccion = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_min = models.PositiveIntegerField(
        help_text="Duracion estimada en minutos", default=60
    )

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Orden(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='ordenes')
    empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, related_name='ordenes')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.SET_NULL, null=True, blank=True)
    cantidad = models.PositiveIntegerField(default=1)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha']

    def __str__(self):
        return f"Orden #{self.id} - {self.cliente.nombre}"
