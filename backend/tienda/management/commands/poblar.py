"""
Comando para poblar la base de datos con datos de ejemplo.
Uso:  python manage.py poblar
"""
from django.core.management.base import BaseCommand
from tienda.models import Producto, Empleado, Cliente, Servicio, Orden


PRODUCTOS = [
    ("Subwoofer Pioneer 12", "Audio", 2499.00, 8, "Subwoofer de 12 pulgadas"),
    ("Polarizado 3M Grado 20", "Polarizado", 1800.00, 15, "Polarizado para 4 ventanas"),
    ("Pantalla Alpine 9", "Audio", 6999.00, 5, "Pantalla con Android Auto"),
    ("Rines 17 Negros", "Estetica", 4500.00, 4, "Juego de 4 rines negros"),
    ("Alarma Viper 3305V", "Seguridad", 3200.00, 10, "Alarma con control remoto"),
    ("Amplificador Rockford 500W", "Audio", 3800.00, 6, "Amplificador clase D"),
    ("Kit Neon LED", "Estetica", 850.00, 20, "Tiras LED para el auto"),
    ("Bocinas JBL 6x9", "Audio", 1299.00, 12, "Par de bocinas 300W"),
]

EMPLEADOS = [
    ("Jorge Alvarez", "dueno", "4491112233"),
    ("Luis Mendez", "mostrador", "4492223344"),
    ("Carlos Ruiz", "instalador", "4493334455"),
]

CLIENTES = [
    ("Pedro Ramirez", "4495556677", "pedro@correo.com", "Av. Universidad 100"),
    ("Ana Torres", "4496667788", "ana@correo.com", "Calle Morelos 25"),
]

SERVICIOS = [
    ("Instalacion de polarizado", "Colocacion en 4 ventanas", 500.00, 90),
    ("Instalacion de sonido", "Montaje de bocinas y amplificador", 800.00, 120),
    ("Instalacion de alarma", "Configuracion completa", 600.00, 60),
]


class Command(BaseCommand):
    help = 'Puebla la base de datos con datos de ejemplo'

    def handle(self, *args, **options):
        if Producto.objects.exists():
            self.stdout.write(self.style.WARNING('Ya hay datos. No se hace nada.'))
            return

        for nombre, cat, precio, stock, desc in PRODUCTOS:
            Producto.objects.create(nombre=nombre, categoria=cat, precio=precio,
                                    stock=stock, descripcion=desc)

        for nombre, rol, tel in EMPLEADOS:
            Empleado.objects.create(nombre=nombre, rol=rol, telefono=tel)

        for nombre, tel, correo, dire in CLIENTES:
            Cliente.objects.create(nombre=nombre, telefono=tel, correo=correo, direccion=dire)

        for nombre, desc, precio, dur in SERVICIOS:
            Servicio.objects.create(nombre=nombre, descripcion=desc, precio=precio, duracion_min=dur)

        # Un par de ordenes de ejemplo
        Orden.objects.create(
            cliente=Cliente.objects.first(), empleado=Empleado.objects.get(rol='mostrador'),
            producto=Producto.objects.first(), servicio=Servicio.objects.first(),
            cantidad=1, estado='completada',
        )
        Orden.objects.create(
            cliente=Cliente.objects.last(), empleado=Empleado.objects.get(rol='mostrador'),
            producto=Producto.objects.last(), cantidad=2, estado='pendiente',
        )

        self.stdout.write(self.style.SUCCESS('Base de datos poblada correctamente.'))
