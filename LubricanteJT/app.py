from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'lubricante_jt_secret_key_2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lubricante_jt.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Configurar Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))

@app.before_request
def log_session_status():
    print(f'[SESSION] User authenticated: {current_user.is_authenticated} | User: {getattr(current_user, "username", None)} | Path: {request.path}')

# Modelos de Base de Datos
class Usuario(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(20), default='empleado')  # admin, empleado
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(20))
    email = db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    activo = db.Column(db.Boolean, default=True)

class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    placa = db.Column(db.String(20), unique=True, nullable=False)
    tipo = db.Column(db.String(50))  # auto, camion, moto, etc.
    marca = db.Column(db.String(50))
    modelo = db.Column(db.String(50))
    año = db.Column(db.Integer)
    kilometraje = db.Column(db.Integer)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    activo = db.Column(db.Boolean, default=True)
    
    cliente = db.relationship('Cliente', backref='vehiculos')

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(50))  # aceite, filtro, accesorio
    viscosidad = db.Column(db.String(20))  # 10W-40, 5W-30, etc.
    presentacion = db.Column(db.String(20))  # 1L, 4L, 20L
    stock_actual = db.Column(db.Float, default=0)
    stock_minimo = db.Column(db.Float, default=5)
    precio_compra = db.Column(db.Float, default=0)
    precio_venta = db.Column(db.Float, default=0)
    proveedor = db.Column(db.String(100))
    activo = db.Column(db.Boolean, default=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)

class Servicio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculo.id'))
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    tipo_servicio = db.Column(db.String(100), nullable=False)  # cambio aceite, filtro, etc.
    kilometraje_actual = db.Column(db.Integer)
    kilometraje_proximo = db.Column(db.Integer)
    fecha_servicio = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_proximo = db.Column(db.DateTime)
    observaciones = db.Column(db.Text)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    vehiculo = db.relationship('Vehiculo', backref='servicios')
    cliente = db.relationship('Cliente', backref='servicios')
    usuario = db.relationship('Usuario', backref='servicios')

class DetalleServicio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicio.id'))
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))
    cantidad = db.Column(db.Float, nullable=False)
    precio_unitario = db.Column(db.Float, default=0)
    
    servicio = db.relationship('Servicio', backref='detalles')
    producto = db.relationship('Producto', backref='detalles_servicio')

class Venta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numero_ticket = db.Column(db.String(20), unique=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculo.id'))
    tipo_venta = db.Column(db.String(20), default='servicio')  # servicio, producto
    subtotal = db.Column(db.Float, default=0)
    igv = db.Column(db.Float, default=0)
    total = db.Column(db.Float, default=0)
    metodo_pago = db.Column(db.String(20), default='efectivo')  # efectivo, yape, tarjeta
    fecha_venta = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    cliente = db.relationship('Cliente', backref='ventas')
    vehiculo = db.relationship('Vehiculo', backref='ventas')
    usuario = db.relationship('Usuario', backref='ventas')

class DetalleVenta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    venta_id = db.Column(db.Integer, db.ForeignKey('venta.id'))
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicio.id'))
    descripcion = db.Column(db.String(200))
    cantidad = db.Column(db.Float, default=1)
    precio_unitario = db.Column(db.Float, default=0)
    subtotal = db.Column(db.Float, default=0)
    
    venta = db.relationship('Venta', backref='detalles')
    producto = db.relationship('Producto', backref='detalles_venta')
    servicio = db.relationship('Servicio', backref='detalles_venta')

class Compra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numero_factura = db.Column(db.String(50))
    proveedor = db.Column(db.String(100), nullable=False)
    ruc = db.Column(db.String(20))
    fecha_compra = db.Column(db.DateTime, default=datetime.utcnow)
    subtotal = db.Column(db.Float, default=0)
    igv = db.Column(db.Float, default=0)
    total = db.Column(db.Float, default=0)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    usuario = db.relationship('Usuario', backref='compras')

class DetalleCompra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    compra_id = db.Column(db.Integer, db.ForeignKey('compra.id'))
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))
    cantidad = db.Column(db.Float, nullable=False)
    precio_unitario = db.Column(db.Float, default=0)
    subtotal = db.Column(db.Float, default=0)
    
    compra = db.relationship('Compra', backref='detalles')
    producto = db.relationship('Producto', backref='detalles_compra')

class MovimientoInventario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'))
    tipo_movimiento = db.Column(db.String(20))  # entrada, salida
    cantidad = db.Column(db.Float, nullable=False)
    stock_anterior = db.Column(db.Float)
    stock_nuevo = db.Column(db.Float)
    motivo = db.Column(db.String(100))  # compra, venta, ajuste
    referencia = db.Column(db.String(50))  # id de venta, compra, etc.
    fecha_movimiento = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    producto = db.relationship('Producto', backref='movimientos')
    usuario = db.relationship('Usuario', backref='movimientos_inventario')

class Caja(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, default=datetime.utcnow().date)
    monto_apertura = db.Column(db.Float, default=0)
    monto_cierre = db.Column(db.Float, default=0)
    ingresos = db.Column(db.Float, default=0)
    egresos = db.Column(db.Float, default=0)
    estado = db.Column(db.String(20), default='abierta')  # abierta, cerrada
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    fecha_apertura = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_cierre = db.Column(db.DateTime)
    
    usuario = db.relationship('Usuario', backref='cajas')

class MovimientoCaja(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caja_id = db.Column(db.Integer, db.ForeignKey('caja.id'))
    tipo = db.Column(db.String(20))  # ingreso, egreso
    concepto = db.Column(db.String(200))
    monto = db.Column(db.Float, nullable=False)
    referencia = db.Column(db.String(50))  # id de venta, etc.
    fecha_movimiento = db.Column(db.DateTime, default=datetime.utcnow)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    caja = db.relationship('Caja', backref='movimientos')
    usuario = db.relationship('Usuario', backref='movimientos_caja')

# Rutas principales
@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = Usuario.query.filter_by(username=username, activo=True).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Usuario o contraseña incorrectos', 'error')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# API Routes para Servicios
@app.route('/api/servicios', methods=['GET'])
def get_servicios():
    servicios = Servicio.query.order_by(Servicio.fecha_servicio.desc()).limit(50).all()
    data = [{
        'id': s.id,
        'placa': s.vehiculo.placa if s.vehiculo else 'N/A',
        'cliente': s.cliente.nombre if s.cliente else 'N/A',
        'tipo_servicio': s.tipo_servicio,
        'kilometraje_actual': s.kilometraje_actual,
        'fecha_servicio': s.fecha_servicio.strftime('%d/%m/%Y %H:%M'),
        'fecha_proximo': s.fecha_proximo.strftime('%d/%m/%Y') if s.fecha_proximo else None,
        'total': sum(d.precio_unitario * d.cantidad for d in s.detalles)
    } for s in servicios]
    return jsonify(data)

@app.route('/api/servicios', methods=['POST'])
def crear_servicio():
    data = request.json
    
    # Crear o buscar cliente
    cliente = Cliente.query.filter_by(celular=data['cliente']['celular']).first()
    if not cliente:
        cliente = Cliente(
            nombre=data['cliente']['nombre'],
            celular=data['cliente']['celular']
        )
        db.session.add(cliente)
        db.session.flush()
    
    # Crear o buscar vehículo
    vehiculo = Vehiculo.query.filter_by(placa=data['vehiculo']['placa']).first()
    if not vehiculo:
        vehiculo = Vehiculo(
            placa=data['vehiculo']['placa'],
            tipo=data['vehiculo']['tipo'],
            marca=data['vehiculo']['marca'],
            modelo=data['vehiculo']['modelo'],
            año=data['vehiculo']['año'],
            kilometraje=data['vehiculo']['kilometraje'],
            cliente_id=cliente.id
        )
        db.session.add(vehiculo)
        db.session.flush()
    
    # Crear servicio
    servicio = Servicio(
        vehiculo_id=vehiculo.id,
        cliente_id=cliente.id,
        tipo_servicio=data['tipo_servicio'],
        kilometraje_actual=data['kilometraje_actual'],
        kilometraje_proximo=data['kilometraje_proximo'],
        observaciones=data.get('observaciones', ''),
        usuario_id=current_user.id
    )
    db.session.add(servicio)
    db.session.flush()
    
    # Crear detalles del servicio
    total_servicio = 0
    for detalle in data['detalles']:
        producto = Producto.query.get(detalle['producto_id'])
        if producto:
            detalle_servicio = DetalleServicio(
                servicio_id=servicio.id,
                producto_id=producto.id,
                cantidad=detalle['cantidad'],
                precio_unitario=detalle['precio_unitario']
            )
            db.session.add(detalle_servicio)
            
            # Actualizar inventario
            producto.stock_actual -= detalle['cantidad']
            
            # Registrar movimiento de inventario
            movimiento = MovimientoInventario(
                producto_id=producto.id,
                tipo_movimiento='salida',
                cantidad=detalle['cantidad'],
                stock_anterior=producto.stock_actual + detalle['cantidad'],
                stock_nuevo=producto.stock_actual,
                motivo='servicio',
                referencia=str(servicio.id),
                usuario_id=current_user.id
            )
            db.session.add(movimiento)
            
            total_servicio += detalle['precio_unitario'] * detalle['cantidad']
    
    # Crear venta
    venta = Venta(
        numero_ticket=f"TKT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        cliente_id=cliente.id,
        vehiculo_id=vehiculo.id,
        tipo_venta='servicio',
        subtotal=total_servicio,
        igv=total_servicio * 0.18,
        total=total_servicio * 1.18,
        metodo_pago=data['metodo_pago'],
        usuario_id=current_user.id
    )
    db.session.add(venta)
    db.session.flush()
    
    # Crear detalle de venta
    detalle_venta = DetalleVenta(
        venta_id=venta.id,
        servicio_id=servicio.id,
        descripcion=f"Servicio: {data['tipo_servicio']} - {vehiculo.placa}",
        cantidad=1,
        precio_unitario=total_servicio,
        subtotal=total_servicio
    )
    db.session.add(detalle_venta)
    
    # Registrar movimiento de caja
    caja_actual = Caja.query.filter_by(estado='abierta').first()
    if caja_actual:
        movimiento_caja = MovimientoCaja(
            caja_id=caja_actual.id,
            tipo='ingreso',
            concepto=f"Venta servicio - {vehiculo.placa}",
            monto=total_servicio * 1.18,
            referencia=str(venta.id),
            usuario_id=current_user.id
        )
        db.session.add(movimiento_caja)
        caja_actual.ingresos += total_servicio * 1.18
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'servicio_id': servicio.id,
        'venta_id': venta.id,
        'ticket': venta.numero_ticket
    })

# API Routes para Inventario
@app.route('/api/inventario', methods=['GET'])
def get_inventario():
    productos = Producto.query.filter_by(activo=True).all()
    return jsonify([{
        'id': p.id,
        'nombre': p.nombre,
        'tipo': p.tipo,
        'viscosidad': p.viscosidad,
        'presentacion': p.presentacion,
        'stock_actual': p.stock_actual,
        'stock_minimo': p.stock_minimo,
        'precio_compra': p.precio_compra,
        'precio_venta': p.precio_venta,
        'proveedor': p.proveedor,
        'alerta': p.stock_actual <= p.stock_minimo
    } for p in productos])

@app.route('/api/inventario', methods=['POST'])
def crear_producto():
    data = request.json
    producto = Producto(
        nombre=data['nombre'],
        tipo=data['tipo'],
        viscosidad=data.get('viscosidad', ''),
        presentacion=data.get('presentacion', ''),
        stock_actual=data.get('stock_actual', 0),
        stock_minimo=data.get('stock_minimo', 5),
        precio_compra=data.get('precio_compra', 0),
        precio_venta=data.get('precio_venta', 0),
        proveedor=data.get('proveedor', '')
    )
    db.session.add(producto)
    db.session.commit()
    return jsonify({'success': True, 'id': producto.id})

@app.route('/api/inventario/<int:id>', methods=['PUT'])
def actualizar_producto(id):
    producto = Producto.query.get_or_404(id)
    data = request.json
    
    producto.nombre = data['nombre']
    producto.tipo = data['tipo']
    producto.viscosidad = data.get('viscosidad', '')
    producto.presentacion = data.get('presentacion', '')
    producto.stock_minimo = data.get('stock_minimo', 5)
    producto.precio_compra = data.get('precio_compra', 0)
    producto.precio_venta = data.get('precio_venta', 0)
    producto.proveedor = data.get('proveedor', '')
    
    db.session.commit()
    return jsonify({'success': True})

@app.route('/api/inventario/ajustar', methods=['POST'])
def ajustar_stock():
    data = request.json
    producto = Producto.query.get_or_404(data['producto_id'])
    
    stock_anterior = producto.stock_actual
    producto.stock_actual = data['nuevo_stock']
    
    movimiento = MovimientoInventario(
        producto_id=producto.id,
        tipo_movimiento='ajuste',
        cantidad=data['nuevo_stock'] - stock_anterior,
        stock_anterior=stock_anterior,
        stock_nuevo=producto.stock_actual,
        motivo='ajuste manual',
        referencia='manual',
        usuario_id=current_user.id
    )
    db.session.add(movimiento)
    db.session.commit()
    
    return jsonify({'success': True})

# API Routes para Caja
@app.route('/api/caja/abrir', methods=['POST'])
def abrir_caja():
    data = request.json
    caja_abierta = Caja.query.filter_by(estado='abierta').first()
    
    if caja_abierta:
        return jsonify({'success': False, 'message': 'Ya hay una caja abierta'})
    
    caja = Caja(
        monto_apertura=data['monto_apertura'],
        usuario_id=current_user.id
    )
    db.session.add(caja)
    db.session.commit()
    
    return jsonify({'success': True, 'id': caja.id})

@app.route('/api/caja/cerrar', methods=['POST'])
def cerrar_caja():
    caja = Caja.query.filter_by(estado='abierta').first()
    if not caja:
        return jsonify({'success': False, 'message': 'No hay caja abierta'})
    
    data = request.json
    caja.monto_cierre = data['monto_cierre']
    caja.estado = 'cerrada'
    caja.fecha_cierre = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'success': True})

@app.route('/api/caja/estado')
def estado_caja():
    caja = Caja.query.filter_by(estado='abierta').first()
    if caja:
        return jsonify({
            'abierta': True,
            'id': caja.id,
            'monto_apertura': caja.monto_apertura,
            'ingresos': caja.ingresos,
            'egresos': caja.egresos,
            'saldo_esperado': caja.monto_apertura + caja.ingresos - caja.egresos
        })
    return jsonify({'abierta': False})

@app.route('/api/caja/egreso', methods=['POST'])
def registrar_egreso():
    data = request.json
    caja = Caja.query.filter_by(estado='abierta').first()
    
    if not caja:
        return jsonify({'success': False, 'message': 'No hay caja abierta'})
    
    movimiento = MovimientoCaja(
        caja_id=caja.id,
        tipo='egreso',
        concepto=data['concepto'],
        monto=data['monto'],
        usuario_id=current_user.id
    )
    db.session.add(movimiento)
    caja.egresos += data['monto']
    db.session.commit()
    
    return jsonify({'success': True})

# API Routes para Ventas
@app.route('/api/ventas', methods=['GET'])
def get_ventas():
    ventas = Venta.query.order_by(Venta.fecha_venta.desc()).limit(50).all()
    return jsonify([{
        'id': v.id,
        'numero_ticket': v.numero_ticket,
        'cliente': v.cliente.nombre if v.cliente else 'Cliente general',
        'placa': v.vehiculo.placa if v.vehiculo else 'N/A',
        'tipo_venta': v.tipo_venta,
        'subtotal': v.subtotal,
        'igv': v.igv,
        'total': v.total,
        'metodo_pago': v.metodo_pago,
        'fecha_venta': v.fecha_venta.strftime('%d/%m/%Y %H:%M'),
        'usuario': v.usuario.nombre
    } for v in ventas])

@app.route('/api/ventas', methods=['POST'])
@login_required
def crear_venta():
    try:
        data = request.get_json()
        
        # PRINTS DE DEPURACIÓN
        print("=" * 50)
        print("DEPURACIÓN: Nueva venta recibida")
        print(f"Tipo de venta: {data.get('tipo_venta', 'NO ESPECIFICADO')}")
        print(f"Total ingresado: {data.get('total', 'NO ESPECIFICADO')}")
        print(f"Productos: {len(data.get('productos', []))}")
        print(f"Cliente: {data.get('cliente', {}).get('nombre', 'NO ESPECIFICADO')}")
        print("=" * 50)
        
        # Generar número de ticket
        from datetime import datetime
        numero_ticket = f"T{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        # Procesar cliente
        cliente_data = data.get('cliente', {})
        cliente = Cliente.query.filter_by(nombre=cliente_data.get('nombre')).first()
        if not cliente:
            cliente = Cliente(
                nombre=cliente_data.get('nombre'),
                celular=cliente_data.get('celular', ''),
                email=cliente_data.get('email', ''),
                direccion=cliente_data.get('direccion', '')
            )
            db.session.add(cliente)
            db.session.flush()  # Para obtener el ID
        
        # Procesar vehículo si se proporciona
        vehiculo = None
        vehiculo_data = data.get('vehiculo', {})
        if vehiculo_data.get('placa'):
            vehiculo = Vehiculo.query.filter_by(placa=vehiculo_data.get('placa')).first()
            if not vehiculo:
                vehiculo = Vehiculo(
                    placa=vehiculo_data.get('placa'),
                    tipo=vehiculo_data.get('tipo'),
                    marca=vehiculo_data.get('marca'),
                    modelo=vehiculo_data.get('modelo'),
                    cliente_id=cliente.id
                )
                db.session.add(vehiculo)
                db.session.flush()
        
        # Calcular totales
        productos_data = data.get('productos', [])
        subtotal = 0
        
        for producto_data in productos_data:
            cantidad = float(producto_data.get('cantidad', 0))
            precio_unitario = float(producto_data.get('precio_unitario', 0))
            subtotal += cantidad * precio_unitario
        
        # El subtotal calculado es la base imponible
        # El total ingresado por el usuario ya incluye IGV
        total_ingresado = float(data.get('total', subtotal))
        
        # Calcular subtotal real (base imponible) y IGV
        # Si el usuario ingresó un total que incluye IGV:
        if data.get('total_incluye_igv', True):
            subtotal_real = total_ingresado / 1.18  # Base imponible
            igv = total_ingresado - subtotal_real
        else:
            # Si el usuario ingresó el subtotal sin IGV
            subtotal_real = total_ingresado
            igv = subtotal_real * 0.18
        
        # Crear la venta
        venta = Venta(
            numero_ticket=numero_ticket,
            cliente_id=cliente.id,
            vehiculo_id=vehiculo.id if vehiculo else None,
            tipo_venta=data.get('tipo_venta', 'producto'),
            subtotal=round(subtotal_real, 2),
            igv=round(igv, 2),
            total=round(total_ingresado, 2),
            metodo_pago=data.get('metodo_pago', 'efectivo'),
            usuario_id=current_user.id
        )
        db.session.add(venta)
        db.session.flush()

        # Si la venta es de tipo servicio, crear el registro de servicio
        if data.get('tipo_venta') == 'servicio':
            print("DEPURACIÓN: Creando servicio desde venta...")
            tipos_servicio = data.get('tipos_servicio', [])
            if isinstance(tipos_servicio, list):
                tipos_servicio_str = ', '.join(tipos_servicio)
            else:
                tipos_servicio_str = str(tipos_servicio)
            kilometraje = data.get('kilometraje', None)
            servicio = Servicio(
                vehiculo_id=vehiculo.id if vehiculo else None,
                cliente_id=cliente.id,
                tipo_servicio=tipos_servicio_str,
                kilometraje_actual=kilometraje,
                usuario_id=current_user.id
            )
            db.session.add(servicio)
            db.session.flush()
            print(f"DEPURACIÓN: Servicio creado con ID: {servicio.id}")
            # Crear detalles de venta y actualizar inventario
            for producto_data in productos_data:
                producto_id = int(producto_data.get('producto_id'))
                cantidad = float(producto_data.get('cantidad', 0))
                precio_unitario = float(producto_data.get('precio_unitario', 0))
                # Crear detalle
                detalle = DetalleVenta(
                    venta_id=venta.id,
                    producto_id=producto_id,
                    cantidad=cantidad,
                    precio_unitario=precio_unitario,
                    subtotal=cantidad * precio_unitario
                )
                db.session.add(detalle)
                # Actualizar stock
                producto = Producto.query.get(producto_id)
                print(f'Intentando descontar stock para producto_id={producto_id}, cantidad={cantidad}')
                if producto:
                    stock_anterior = producto.stock_actual
                    producto.stock_actual -= cantidad
                    stock_nuevo = producto.stock_actual
                    print(f'Stock de {producto.nombre}: {stock_anterior} -> {stock_nuevo}')
                    # Registrar movimiento de inventario
                    movimiento = MovimientoInventario(
                        producto_id=producto_id,
                        tipo_movimiento='salida',
                        cantidad=cantidad,
                        stock_anterior=stock_anterior,
                        stock_nuevo=stock_nuevo,
                        motivo='venta',
                        referencia=str(venta.id),
                        usuario_id=current_user.id
                    )
                    db.session.add(movimiento)
                else:
                    print(f'Producto con id {producto_id} no encontrado!')
        else:
            print("DEPURACIÓN: Venta de tipo PRODUCTO - creando detalles de venta...")
            # Para ventas de productos, crear detalles de venta
            for producto_data in productos_data:
                producto_id = int(producto_data.get('producto_id'))
                cantidad = float(producto_data.get('cantidad', 0))
                precio_unitario = float(producto_data.get('precio_unitario', 0))
                
                # Crear detalle de venta
                detalle = DetalleVenta(
                    venta_id=venta.id,
                    producto_id=producto_id,
                    cantidad=cantidad,
                    precio_unitario=precio_unitario,
                    subtotal=cantidad * precio_unitario
                )
                db.session.add(detalle)
                
                # Actualizar stock
                producto = Producto.query.get(producto_id)
                print(f'DEPURACIÓN: Descontando stock para producto_id={producto_id}, cantidad={cantidad}')
                if producto:
                    stock_anterior = producto.stock_actual
                    producto.stock_actual -= cantidad
                    stock_nuevo = producto.stock_actual
                    print(f'DEPURACIÓN: Stock de {producto.nombre}: {stock_anterior} -> {stock_nuevo}')
                    
                    # Registrar movimiento de inventario
                    movimiento = MovimientoInventario(
                        producto_id=producto_id,
                        tipo_movimiento='salida',
                        cantidad=cantidad,
                        stock_anterior=stock_anterior,
                        stock_nuevo=stock_nuevo,
                        motivo='venta',
                        referencia=str(venta.id),
                        usuario_id=current_user.id
                    )
                    db.session.add(movimiento)
                else:
                    print(f'DEPURACIÓN: Producto con id {producto_id} no encontrado!')
        
        # Registrar ingreso en caja si hay caja abierta
        caja_abierta = Caja.query.filter_by(estado='abierta').first()
        if caja_abierta:
            movimiento_caja = MovimientoCaja(
                caja_id=caja_abierta.id,
                tipo='ingreso',
                concepto=f'Venta {numero_ticket}',
                monto=total_ingresado,
                referencia=str(venta.id),
                usuario_id=current_user.id
            )
            db.session.add(movimiento_caja)
            
            # Actualizar totales de caja
            caja_abierta.ingresos += total_ingresado
        
        db.session.commit()
        print("DEPURACIÓN: Venta registrada exitosamente!")
        print("=" * 50)
        
        return jsonify({
            'success': True,
            'message': 'Venta registrada exitosamente',
            'venta_id': venta.id,
            'numero_ticket': numero_ticket,
            'subtotal': round(subtotal_real, 2),
            'igv': round(igv, 2),
            'total': round(total_ingresado, 2)
        })
        
    except Exception as e:
        db.session.rollback()
        print(f"DEPURACIÓN: ERROR en venta: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Error al registrar la venta: {str(e)}'
        }), 500

@app.route('/api/ventas/<int:venta_id>', methods=['GET'])
def get_venta_detalles(venta_id):
    venta = Venta.query.get_or_404(venta_id)
    
    detalles = []
    for detalle in venta.detalles:
        detalles.append({
            'producto': detalle.producto.nombre if detalle.producto else detalle.descripcion,
            'cantidad': detalle.cantidad,
            'precio_unitario': detalle.precio_unitario,
            'subtotal': detalle.subtotal
        })
    
    return jsonify({
        'id': venta.id,
        'numero_ticket': venta.numero_ticket,
        'cliente': {
            'nombre': venta.cliente.nombre if venta.cliente else 'Cliente general',
            'celular': venta.cliente.celular if venta.cliente else '',
            'email': venta.cliente.email if venta.cliente else ''
        },
        'vehiculo': {
            'placa': venta.vehiculo.placa if venta.vehiculo else 'N/A',
            'tipo': venta.vehiculo.tipo if venta.vehiculo else '',
            'marca': venta.vehiculo.marca if venta.vehiculo else '',
            'modelo': venta.vehiculo.modelo if venta.vehiculo else ''
        },
        'tipo_venta': venta.tipo_venta,
        'subtotal': venta.subtotal,
        'igv': venta.igv,
        'total': venta.total,
        'metodo_pago': venta.metodo_pago,
        'fecha_venta': venta.fecha_venta.strftime('%d/%m/%Y %H:%M'),
        'usuario': venta.usuario.nombre,
        'detalles': detalles
    })

@app.route('/api/ventas/ticket/<numero_ticket>', methods=['GET'])
def get_venta_por_ticket(numero_ticket):
    venta = Venta.query.filter_by(numero_ticket=numero_ticket).first_or_404()
    detalles = []
    for detalle in venta.detalles:
        detalles.append({
            'producto': detalle.producto.nombre if detalle.producto else detalle.descripcion,
            'cantidad': detalle.cantidad,
            'precio_unitario': detalle.precio_unitario,
            'subtotal': detalle.subtotal
        })
    return jsonify({
        'id': venta.id,
        'numero_ticket': venta.numero_ticket,
        'cliente': {
            'nombre': venta.cliente.nombre if venta.cliente else 'Cliente general',
            'celular': venta.cliente.celular if venta.cliente else '',
            'email': venta.cliente.email if venta.cliente else ''
        },
        'vehiculo': {
            'placa': venta.vehiculo.placa if venta.vehiculo else 'N/A',
            'tipo': venta.vehiculo.tipo if venta.vehiculo else '',
            'marca': venta.vehiculo.marca if venta.vehiculo else '',
            'modelo': venta.vehiculo.modelo if venta.vehiculo else ''
        },
        'tipo_venta': venta.tipo_venta,
        'subtotal': venta.subtotal,
        'igv': venta.igv,
        'total': venta.total,
        'metodo_pago': venta.metodo_pago,
        'fecha_venta': venta.fecha_venta.strftime('%d/%m/%Y %H:%M'),
        'usuario': venta.usuario.nombre,
        'detalles': detalles
    })

# API Routes para Compras
@app.route('/api/compras', methods=['GET'])
def get_compras():
    compras = Compra.query.order_by(Compra.fecha_compra.desc()).limit(50).all()
    return jsonify([{
        'id': c.id,
        'numero_factura': c.numero_factura,
        'proveedor': c.proveedor,
        'ruc': c.ruc,
        'total': c.total,
        'fecha_compra': c.fecha_compra.strftime('%d/%m/%Y'),
        'usuario': c.usuario.nombre
    } for c in compras])

@app.route('/api/compras', methods=['POST'])
@login_required
def crear_compra():
    data = request.json
    
    compra = Compra(
        numero_factura=data.get('numero_factura', ''),
        proveedor=data['proveedor'],
        ruc=data.get('ruc', ''),
        subtotal=0,
        igv=0,
        total=data['total'],
        usuario_id=current_user.id
    )
    db.session.add(compra)
    db.session.flush()
    
    # Crear detalles de compra
    for detalle in data['detalles']:
        producto = Producto.query.get(detalle['producto_id'])
        if producto:
            detalle_compra = DetalleCompra(
                compra_id=compra.id,
                producto_id=producto.id,
                cantidad=detalle['cantidad'],
                precio_unitario=detalle['precio_unitario'],
                subtotal=detalle['cantidad'] * detalle['precio_unitario']
            )
            db.session.add(detalle_compra)
            
            # Actualizar inventario
            producto.stock_actual += detalle['cantidad']
            
            # Registrar movimiento de inventario
            movimiento = MovimientoInventario(
                producto_id=producto.id,
                tipo_movimiento='entrada',
                cantidad=detalle['cantidad'],
                stock_anterior=producto.stock_actual - detalle['cantidad'],
                stock_nuevo=producto.stock_actual,
                motivo='compra',
                referencia=str(compra.id),
                usuario_id=current_user.id
            )
            db.session.add(movimiento)
    
    # Registrar egreso en caja si hay caja abierta
    caja_actual = Caja.query.filter_by(estado='abierta').first()
    if caja_actual:
        movimiento_caja = MovimientoCaja(
            caja_id=caja_actual.id,
            tipo='egreso',
            concepto=f"Compra a {compra.proveedor}",
            monto=compra.total,  # Ahora el egreso es el total
            referencia=str(compra.id),
            usuario_id=current_user.id
        )
        db.session.add(movimiento_caja)
        caja_actual.egresos += compra.total
    
    db.session.commit()
    return jsonify({'success': True, 'id': compra.id})

# API Routes para Reportes
@app.route('/api/reportes/servicios')
def reporte_servicios():
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    
    query = Servicio.query
    
    if fecha_inicio:
        query = query.filter(Servicio.fecha_servicio >= datetime.strptime(fecha_inicio, '%Y-%m-%d'))
    if fecha_fin:
        query = query.filter(Servicio.fecha_servicio <= datetime.strptime(fecha_fin, '%Y-%m-%d') + timedelta(days=1))
    
    servicios = query.all()
    
    data = []
    for s in servicios:
        # Buscar la venta asociada más cercana (por cliente, vehículo y fecha)
        venta = Venta.query.filter_by(cliente_id=s.cliente_id, vehiculo_id=s.vehiculo_id, tipo_venta='servicio')\
            .filter(Venta.fecha_venta >= s.fecha_servicio - timedelta(minutes=10))\
            .filter(Venta.fecha_venta <= s.fecha_servicio + timedelta(minutes=10))\
            .order_by(Venta.fecha_venta.asc()).first()
        numero_ticket = venta.numero_ticket if venta else None
        data.append({
            'id': s.id,
            'placa': s.vehiculo.placa if s.vehiculo else 'N/A',
            'cliente': s.cliente.nombre if s.cliente else 'N/A',
            'tipo_servicio': s.tipo_servicio,
            'kilometraje_actual': s.kilometraje_actual,
            'fecha_servicio': s.fecha_servicio.strftime('%d/%m/%Y'),
            'total': sum(d.precio_unitario * d.cantidad for d in s.detalles),
            'numero_ticket': numero_ticket
        })
    return jsonify(data)

@app.route('/api/reportes/ventas')
def reporte_ventas():
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    
    query = Venta.query
    
    if fecha_inicio:
        query = query.filter(Venta.fecha_venta >= datetime.strptime(fecha_inicio, '%Y-%m-%d'))
    if fecha_fin:
        query = query.filter(Venta.fecha_venta <= datetime.strptime(fecha_fin, '%Y-%m-%d') + timedelta(days=1))
    
    ventas = query.all()
    
    return jsonify([{
        'id': v.id,
        'numero_ticket': v.numero_ticket,
        'cliente': v.cliente.nombre if v.cliente else 'Cliente general',
        'tipo_venta': v.tipo_venta,
        'subtotal': v.subtotal,
        'igv': v.igv,
        'total': v.total,
        'metodo_pago': v.metodo_pago,
        'fecha_venta': v.fecha_venta.strftime('%d/%m/%Y'),
        'usuario': v.usuario.nombre
    } for v in ventas])

@app.route('/api/reportes/stock')
def reporte_stock():
    productos = Producto.query.filter_by(activo=True).all()
    return jsonify([{
        'id': p.id,
        'nombre': p.nombre,
        'tipo': p.tipo,
        'viscosidad': p.viscosidad,
        'presentacion': p.presentacion,
        'stock_actual': p.stock_actual,
        'stock_minimo': p.stock_minimo,
        'precio_compra': p.precio_compra,
        'precio_venta': p.precio_venta,
        'valor_stock': p.stock_actual * p.precio_compra,
        'alerta': p.stock_actual <= p.stock_minimo
    } for p in productos])

# Rutas de páginas
@app.route('/servicios')
@login_required
def servicios():
    return render_template('servicios.html')

@app.route('/inventario')
@login_required
def inventario():
    return render_template('inventario.html')

@app.route('/caja')
@login_required
def caja():
    return render_template('caja.html')

@app.route('/ventas')
@login_required
def ventas():
    return render_template('ventas.html')

@app.route('/compras')
@login_required
def compras():
    return render_template('compras.html')

@app.route('/reportes')
@login_required
def reportes():
    return render_template('reportes.html')

@app.route('/crear_admin')
def crear_admin():
    from werkzeug.security import generate_password_hash
    if not Usuario.query.filter_by(username='admin').first():
        nuevo = Usuario(username='admin', password_hash=generate_password_hash('admin123'), nombre='Administrador', rol='admin', activo=True)
        db.session.add(nuevo)
        db.session.commit()
        return 'Usuario admin creado'
    else:
        return 'El usuario admin ya existe'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=False, host='0.0.0.0', port=5001) 