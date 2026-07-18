# Inventario CRUD - Tienda de Autopartes

Sistema de gestion para una tienda de autopartes e instalaciones, con CRUD completo
(Crear, Leer, Actualizar y Eliminar) sobre 5 modelos.

## Tecnologias
- Frontend: Angular 17 (componentes standalone)
- Backend: Django 5 + Django REST Framework
- Base de datos: SQLite

> Nota historica: la primera version del backend estaba hecha en Flask con datos
> en memoria. Se migro a Django + DRF para tener base de datos real, panel de
> administracion y varios modelos relacionados.

## Modelos (5)
1. Producto  - la autoparte / accesorio
2. Empleado  - personal (mostrador, instalador, dueno)
3. Cliente   - quien compra
4. Servicio  - instalaciones que se cobran aparte
5. Orden     - la venta; relaciona Cliente, Empleado, Producto y Servicio

## Backend (Django)
    cd backend
    python -m venv venv
    # Windows:  venv\Scripts\activate
    # Mac/Linux: source venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py poblar          # carga datos de ejemplo
    python manage.py createsuperuser # crea el usuario del panel admin
    python manage.py runserver 8000

- API:   http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

## Frontend (Angular) - en otra terminal
    cd frontend
    npm install
    npm start

Abrir: http://localhost:4200
Los dos servidores (Django y Angular) deben correr al mismo tiempo.

## Servicios de Angular
- 5 servicios REST (uno por modelo): producto, empleado, cliente, servicio, orden.
- 1 servicio SIN REST: carrito.service.ts (maneja un carrito temporal en memoria).
