from extensions import db
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(20), default='admin')
    activo = db.Column(db.Boolean, default=True)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True)
    telefono = db.Column(db.String(20))
    direccion = db.Column(db.Text)
    empresa = db.Column(db.String(100))
    ruc = db.Column(db.String(20))
    activo = db.Column(db.Boolean, default=True)
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    facturas = db.relationship('Factura', backref='cliente', lazy=True)

class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    placa = db.Column(db.String(20), unique=True, nullable=False)
    marca = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    año = db.Column(db.Integer)
    capacidad = db.Column(db.Integer)  # Capacidad en toneladas
    tipo = db.Column(db.String(50))  # Camión, furgón, etc.
    estado = db.Column(db.String(20), default='activo')  # activo, mantenimiento, inactivo
    fecha_adquisicion = db.Column(db.Date)
    fecha_vencimiento_soat = db.Column(db.Date)  # Nuevo campo
    fecha_vencimiento_revision = db.Column(db.Date)  # Nuevo campo
    kilometraje_real = db.Column(db.Integer)  # Nuevo campo
    km_ultimo_mantenimiento = db.Column(db.Integer, nullable=True)  # Kilometraje del último mantenimiento
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    rutas = db.relationship('Ruta', backref='vehiculo', lazy=True)

class Chofer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    licencia = db.Column(db.String(20), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(120))
    direccion = db.Column(db.Text)
    fecha_vencimiento_licencia = db.Column(db.Date)
    estado = db.Column(db.String(20), default='activo')  # activo, inactivo, suspendido
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    rutas = db.relationship('Ruta', backref='chofer', lazy=True)

class Guia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(120))
    especialidad = db.Column(db.String(100))  # Turismo, logística, etc.
    idiomas = db.Column(db.Text)  # Idiomas que habla
    estado = db.Column(db.String(20), default='activo')
    fecha_registro = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    rutas = db.relationship('Ruta', backref='guia', lazy=True)

class Ruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    origen = db.Column(db.String(100), nullable=False)
    destino = db.Column(db.String(100), nullable=False)
    distancia = db.Column(db.Float)  # En kilómetros
    tiempo_estimado = db.Column(db.Integer)  # En horas
    tipo_carga = db.Column(db.String(50))  # Tipo de carga que transporta
    precio_base = db.Column(db.Float, default=0.0)
    estado = db.Column(db.String(20), default='activa')  # activa, inactiva
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculo.id'))
    chofer_id = db.Column(db.Integer, db.ForeignKey('chofer.id'))
    guia_id = db.Column(db.Integer, db.ForeignKey('guia.id'), nullable=True)
    facturas = db.relationship('Factura', backref='ruta', lazy=True)

class Factura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numero_factura = db.Column(db.String(20), unique=True, nullable=False)
    fecha_emision = db.Column(db.DateTime, default=datetime.utcnow)
    subtotal = db.Column(db.Float, default=0.0)
    igv = db.Column(db.Float, default=0.0)
    total = db.Column(db.Float, default=0.0)
    estado = db.Column(db.String(20), default='pendiente')  # pendiente, pagada, anulada
    metodo_pago = db.Column(db.String(50))
    observaciones = db.Column(db.Text)
    
    # Relaciones
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    ruta_id = db.Column(db.Integer, db.ForeignKey('ruta.id'), nullable=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    
    # Relación con usuario que creó la factura
    usuario = db.relationship('Usuario', backref='facturas_creadas')

class GuiaRemision(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chofer_id = db.Column(db.Integer, db.ForeignKey('chofer.id'), nullable=False)
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculo.id'), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    guia_receptor = db.Column(db.String(100), nullable=False)
    guia_remitente = db.Column(db.String(100), nullable=False)
    origen = db.Column(db.String(100), nullable=False)
    destino = db.Column(db.String(100), nullable=False)
    kilometros_recorridos = db.Column(db.Integer, nullable=False)
    # Relaciones
    chofer = db.relationship('Chofer', backref='guias_remision')
    vehiculo = db.relationship('Vehiculo', backref='guias_remision')
    cliente = db.relationship('Cliente', backref='guias_remision')

class FacturaDetalle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    factura_id = db.Column(db.Integer, db.ForeignKey('factura.id'), nullable=False)
    cantidad = db.Column(db.Float, nullable=False)
    unidad = db.Column(db.String(20), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    valor_unitario = db.Column(db.Float, nullable=False)
    importe_total = db.Column(db.Float, nullable=False)
    
    factura = db.relationship('Factura', backref=db.backref('detalles', lazy=True))

class Egreso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    monto = db.Column(db.Float, nullable=False)
    tipo_egreso = db.Column(db.String(50), nullable=False)
    observaciones = db.Column(db.String(255))
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculo.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=True)
    vehiculo = db.relationship('Vehiculo', backref=db.backref('egresos', lazy=True))
    usuario = db.relationship('Usuario', backref='egresos')

    def __repr__(self):
        return f'<Egreso {self.id} - {self.descripcion} - S/ {self.monto}>' 