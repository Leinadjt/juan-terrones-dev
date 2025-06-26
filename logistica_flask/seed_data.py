from app import create_app
from models import db, Usuario, Cliente, Vehiculo, Chofer, Ruta, Factura, FacturaDetalle, GuiaRemision, Egreso
from datetime import datetime, timedelta, date
import random

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Usuarios
    admin = Usuario(username='admin', email='admin@logistica.com', nombre='Admin', apellido='Root', rol='admin')
    admin.set_password('admin123')
    user1 = Usuario(username='juan', email='juan@empresa.com', nombre='Juan', apellido='Pérez', rol='user')
    user1.set_password('1234')
    user2 = Usuario(username='maria', email='maria@empresa.com', nombre='María', apellido='García', rol='user')
    user2.set_password('1234')
    db.session.add_all([admin, user1, user2])

    # Clientes
    clientes = []
    for i in range(1, 6):
        c = Cliente(nombre=f'Cliente{i}', apellido=f'Apellido{i}', email=f'cliente{i}@mail.com', telefono=f'999000{i}', direccion=f'Calle {i}', empresa=f'Empresa{i}', ruc=f'10000000{i}', activo=True)
        clientes.append(c)
    db.session.add_all(clientes)

    # Vehículos
    vehiculos = []
    for i in range(1, 4):
        v = Vehiculo(placa=f'ABC-10{i}', marca='Marca'+str(i), modelo='Modelo'+str(i), año=2020+i, capacidad=5+i, tipo='Camión', estado='activo', fecha_adquisicion=date(2020,1,1)+timedelta(days=365*i), kilometraje_real=10000*i, km_ultimo_mantenimiento=10000*(i-1))
        vehiculos.append(v)
    db.session.add_all(vehiculos)

    # Choferes
    choferes = []
    for i in range(1, 4):
        ch = Chofer(nombre=f'Chofer{i}', apellido=f'Apellido{i}', dni=f'1234567{i}', licencia=f'LIC00{i}', telefono=f'988000{i}', email=f'chofer{i}@mail.com', direccion=f'Avenida {i}', estado='activo')
        choferes.append(ch)
    db.session.add_all(choferes)

    # Rutas
    rutas = []
    for i in range(1, 4):
        r = Ruta(nombre=f'Ruta {i}', origen=f'Ciudad {i}', destino=f'Ciudad {i+1}', distancia=100*i, tiempo_estimado=2*i, tipo_carga='General', precio_base=500*i, estado='activa', vehiculo_id=vehiculos[i-1].id, chofer_id=choferes[i-1].id)
        rutas.append(r)
    db.session.add_all(rutas)

    db.session.commit()

    # Facturas y detalles
    facturas = []
    for i in range(1, 11):
        f = Factura(numero_factura=f"F{1000+i}", cliente_id=random.choice(clientes).id, ruta_id=random.choice(rutas).id, usuario_id=admin.id, fecha_emision=date.today()-timedelta(days=random.randint(1,60)), total=0, igv=0, subtotal=0)
        db.session.add(f)
        db.session.flush()  # Para obtener el id
        total = 0
        for j in range(random.randint(1,3)):
            cantidad = random.randint(1,5)
            precio = random.randint(100,500)
            detalle = FacturaDetalle(factura_id=f.id, descripcion=f'Servicio {j+1}', cantidad=cantidad, unidad='UND', valor_unitario=precio, importe_total=cantidad*precio)
            db.session.add(detalle)
            total += cantidad*precio
        f.subtotal = total/1.18
        f.igv = total - f.subtotal
        f.total = total
        facturas.append(f)
    db.session.commit()

    # Guías de remisión
    for i in range(1, 9):
        g = GuiaRemision(chofer_id=random.choice(choferes).id, vehiculo_id=random.choice(vehiculos).id, fecha=date.today()-timedelta(days=random.randint(1,60)), cliente_id=random.choice(clientes).id, guia_receptor=f'Receptor {i}', guia_remitente=f'Remitente {i}', origen=f'Ciudad {random.randint(1,3)}', destino=f'Ciudad {random.randint(2,4)}', kilometros_recorridos=random.randint(50,300))
        db.session.add(g)
    db.session.commit()

    # Egresos
    tipos = ['Combustible', 'Mantenimiento', 'Peaje', 'Multa', 'Otros']
    for i in range(1, 13):
        e = Egreso(fecha=date.today()-timedelta(days=random.randint(1,60)), descripcion=f'Egreso {i}', monto=random.randint(100,1000), tipo_egreso=random.choice(tipos), observaciones='', vehiculo_id=random.choice(vehiculos).id, usuario_id=admin.id)
        db.session.add(e)
    db.session.commit()

    print('✅ Datos ficticios cargados correctamente.') 