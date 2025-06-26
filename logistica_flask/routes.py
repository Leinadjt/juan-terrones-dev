from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, send_file
from flask_login import login_required, current_user, login_user, logout_user
from models import db, Usuario, Cliente, Vehiculo, Chofer, Guia, Ruta, Factura, FacturaDetalle, GuiaRemision, Egreso
from datetime import datetime, date
import random
import io
import openpyxl

# Blueprint principal
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
@login_required
def dashboard():
    # Estadísticas del dashboard
    total_clientes = Cliente.query.filter_by(activo=True).count()
    total_vehiculos = Vehiculo.query.filter_by(estado='activo').count()
    total_choferes = Chofer.query.filter_by(estado='activo').count()
    total_rutas = Ruta.query.filter_by(estado='activa').count()
    
    # Facturas del día
    hoy = date.today()
    facturas_hoy = Factura.query.filter(
        db.func.date(Factura.fecha_emision) == hoy
    ).count()
    
    # Facturas recientes
    facturas_recientes = Factura.query.order_by(Factura.fecha_emision.desc()).limit(5).all()
    
    # Vehículos en mantenimiento
    vehiculos_mantenimiento = Vehiculo.query.filter_by(estado='mantenimiento').count()
    
    # Alertas de kilometraje
    vehiculos = Vehiculo.query.all()
    alertas_km = {}
    for v in vehiculos:
        if v.kilometraje_real is not None and v.km_ultimo_mantenimiento is not None:
            if (v.kilometraje_real - v.km_ultimo_mantenimiento) >= 15000:
                alertas_km[v.id] = f"¡El vehículo {v.placa} ha recorrido 15,000 km desde el último mantenimiento! Realizar mantenimiento preventivo."
    
    return render_template('dashboard.html',
                         total_clientes=total_clientes,
                         total_vehiculos=total_vehiculos,
                         total_choferes=total_choferes,
                         total_rutas=total_rutas,
                         facturas_hoy=facturas_hoy,
                         facturas_recientes=facturas_recientes,
                         vehiculos_mantenimiento=vehiculos_mantenimiento,
                         alertas_km=alertas_km)

@main_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = Usuario.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('main.dashboard'))
        else:
            flash('Usuario o contraseña incorrectos', 'error')
    
    return render_template('login.html')

@main_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.login'))

# Blueprint de rutas
rutas_bp = Blueprint('rutas', __name__)

@rutas_bp.route('/')
@login_required
def index():
    rutas = Ruta.query.all()
    vehiculos = Vehiculo.query.filter_by(estado='activo').all()
    choferes = Chofer.query.filter_by(estado='activo').all()
    guias = Guia.query.filter_by(estado='activo').all()
    return render_template('rutas/index.html', rutas=rutas, vehiculos=vehiculos, choferes=choferes, guias=guias)

@rutas_bp.route('/nueva', methods=['GET', 'POST'])
@login_required
def nueva_ruta():
    if request.method == 'POST':
        ruta = Ruta(
            nombre=request.form['nombre'],
            origen=request.form['origen'],
            destino=request.form['destino'],
            distancia=float(request.form['distancia']),
            tiempo_estimado=int(request.form['tiempo_estimado']),
            tipo_carga=request.form['tipo_carga'],
            precio_base=float(request.form['precio_base']),
            vehiculo_id=int(request.form['vehiculo_id']),
            chofer_id=int(request.form['chofer_id']),
            guia_id=int(request.form['guia_id']) if request.form['guia_id'] else None,
            estado='activa'
        )
        db.session.add(ruta)
        db.session.commit()
        flash('Ruta creada exitosamente', 'success')
        return redirect(url_for('rutas.index'))
    
    vehiculos = Vehiculo.query.filter_by(estado='activo').all()
    choferes = Chofer.query.filter_by(estado='activo').all()
    guias = Guia.query.filter_by(estado='activo').all()
    return render_template('rutas/nueva_ruta.html', vehiculos=vehiculos, choferes=choferes, guias=guias)

# Blueprint de clientes
clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/')
@login_required
def index():
    clientes = Cliente.query.all()
    return render_template('clientes/index.html', clientes=clientes)

@clientes_bp.route('/nuevo', methods=['GET', 'POST'])
@login_required
def nuevo_cliente():
    if request.method == 'POST':
        cliente = Cliente(
            nombre=request.form['nombre'],
            apellido=request.form['apellido'],
            email=request.form['email'],
            telefono=request.form['telefono'],
            direccion=request.form['direccion'],
            empresa=request.form['empresa'],
            ruc=request.form['ruc'],
            activo=True
        )
        db.session.add(cliente)
        db.session.commit()
        flash('Cliente registrado exitosamente', 'success')
        return redirect(url_for('clientes.index'))
    
    return render_template('clientes/nuevo_cliente.html')

# Blueprint de vehículos
vehiculos_bp = Blueprint('vehiculos', __name__)

@vehiculos_bp.route('/')
@login_required
def index():
    vehiculos = Vehiculo.query.all()
    alertas_km = {}
    for v in vehiculos:
        if v.kilometraje_real is not None and v.km_ultimo_mantenimiento is not None:
            if (v.kilometraje_real - v.km_ultimo_mantenimiento) >= 15000:
                alertas_km[v.id] = f"¡El vehículo {v.placa} ha recorrido 15,000 km desde el último mantenimiento! Realizar mantenimiento preventivo."
    return render_template('vehiculos/index.html', vehiculos=vehiculos, alertas_km=alertas_km)

@vehiculos_bp.route('/reiniciar_alerta/<int:vehiculo_id>', methods=['POST'])
@login_required
def reiniciar_alerta(vehiculo_id):
    vehiculo = Vehiculo.query.get_or_404(vehiculo_id)
    vehiculo.km_ultimo_mantenimiento = vehiculo.kilometraje_real
    db.session.commit()
    flash(f'Alerta de mantenimiento reiniciada para el vehículo {vehiculo.placa}', 'success')
    return redirect(url_for('vehiculos.index'))

@vehiculos_bp.route('/nuevo', methods=['GET', 'POST'])
@login_required
def nuevo_vehiculo():
    if request.method == 'POST':
        km_inicial = int(request.form['kilometraje_real']) if request.form['kilometraje_real'] else None
        vehiculo = Vehiculo(
            placa=request.form['placa'],
            marca=request.form['marca'],
            modelo=request.form['modelo'],
            año=int(request.form['año']),
            capacidad=int(request.form['capacidad']),
            tipo=request.form['tipo'],
            fecha_adquisicion=datetime.strptime(request.form['fecha_adquisicion'], '%Y-%m-%d').date() if request.form['fecha_adquisicion'] else None,
            fecha_vencimiento_soat=datetime.strptime(request.form['fecha_vencimiento_soat'], '%Y-%m-%d').date() if request.form['fecha_vencimiento_soat'] else None,
            fecha_vencimiento_revision=datetime.strptime(request.form['fecha_vencimiento_revision'], '%Y-%m-%d').date() if request.form['fecha_vencimiento_revision'] else None,
            kilometraje_real=km_inicial,
            km_ultimo_mantenimiento=km_inicial,
            estado='activo'
        )
        db.session.add(vehiculo)
        db.session.commit()
        flash('Vehículo registrado exitosamente', 'success')
        return redirect(url_for('vehiculos.index'))
    return render_template('vehiculos/nuevo_vehiculo.html')

@vehiculos_bp.route('/editar/<int:vehiculo_id>', methods=['GET', 'POST'])
@login_required
def editar_vehiculo(vehiculo_id):
    vehiculo = Vehiculo.query.get_or_404(vehiculo_id)
    if request.method == 'POST':
        vehiculo.placa = request.form['placa']
        vehiculo.marca = request.form['marca']
        vehiculo.modelo = request.form['modelo']
        vehiculo.año = int(request.form['año']) if request.form['año'] else None
        vehiculo.capacidad = int(request.form['capacidad']) if request.form['capacidad'] else None
        vehiculo.tipo = request.form['tipo']
        vehiculo.fecha_adquisicion = datetime.strptime(request.form['fecha_adquisicion'], '%Y-%m-%d').date() if request.form['fecha_adquisicion'] else None
        vehiculo.fecha_vencimiento_soat = datetime.strptime(request.form['fecha_vencimiento_soat'], '%Y-%m-%d').date() if request.form['fecha_vencimiento_soat'] else None
        vehiculo.fecha_vencimiento_revision = datetime.strptime(request.form['fecha_vencimiento_revision'], '%Y-%m-%d').date() if request.form['fecha_vencimiento_revision'] else None
        nuevo_km = int(request.form['kilometraje_real']) if request.form['kilometraje_real'] else None
        vehiculo.kilometraje_real = nuevo_km
        if vehiculo.km_ultimo_mantenimiento is None and nuevo_km is not None:
            vehiculo.km_ultimo_mantenimiento = nuevo_km
        db.session.commit()
        flash('Vehículo actualizado exitosamente', 'success')
        return redirect(url_for('vehiculos.index'))
    return render_template('vehiculos/editar_vehiculo.html', vehiculo=vehiculo)

# Blueprint de choferes
choferes_bp = Blueprint('choferes', __name__)

@choferes_bp.route('/')
@login_required
def index():
    choferes = Chofer.query.all()
    return render_template('choferes/index.html', choferes=choferes)

@choferes_bp.route('/nuevo', methods=['GET', 'POST'])
@login_required
def nuevo_chofer():
    if request.method == 'POST':
        chofer = Chofer(
            nombre=request.form['nombre'],
            apellido=request.form['apellido'],
            dni=request.form['dni'],
            licencia=request.form['licencia'],
            telefono=request.form['telefono'],
            email=request.form['email'],
            direccion=request.form['direccion'],
            fecha_vencimiento_licencia=datetime.strptime(request.form['fecha_vencimiento'], '%Y-%m-%d').date(),
            estado='activo'
        )
        db.session.add(chofer)
        db.session.commit()
        flash('Chofer registrado exitosamente', 'success')
        return redirect(url_for('choferes.index'))
    
    return render_template('choferes/nuevo_chofer.html')

# Blueprint de guías
guias_bp = Blueprint('guias', __name__)

@guias_bp.route('/')
@login_required
def index():
    guias = Guia.query.all()
    return render_template('guias/index.html', guias=guias)

@guias_bp.route('/nuevo', methods=['GET', 'POST'])
@login_required
def nuevo_guia():
    if request.method == 'POST':
        guia = Guia(
            nombre=request.form['nombre'],
            apellido=request.form['apellido'],
            dni=request.form['dni'],
            telefono=request.form['telefono'],
            email=request.form['email'],
            especialidad=request.form['especialidad'],
            idiomas=request.form['idiomas']
        )
        db.session.add(guia)
        db.session.commit()
        flash('Guía registrado exitosamente', 'success')
        return redirect(url_for('guias.index'))
    
    return render_template('guias/nuevo_guia.html')

# Blueprint de facturas
facturas_bp = Blueprint('facturas', __name__)

@facturas_bp.route('/')
@login_required
def index():
    facturas = Factura.query.order_by(Factura.fecha_emision.desc()).all()
    return render_template('facturas/index.html', facturas=facturas)

@facturas_bp.route('/nueva', methods=['GET', 'POST'])
@login_required
def nueva_factura():
    if request.method == 'POST':
        numero_factura = f"F{datetime.now().strftime('%Y%m%d')}{random.randint(1000, 9999)}"
        subtotal = float(request.form['subtotal'])
        igv = subtotal * 0.18
        total = subtotal + igv
        estado = 'pagada' if request.form['forma_pago'] == 'Efectivo' else 'pendiente'
        factura = Factura(
            numero_factura=numero_factura,
            fecha_emision=datetime.strptime(request.form['fecha_emision'], '%Y-%m-%d'),
            subtotal=subtotal,
            igv=igv,
            total=total,
            estado=estado,
            metodo_pago=request.form['forma_pago'],
            observaciones=request.form['observaciones'],
            cliente_id=int(request.form['cliente_id']),
            ruta_id=None,  # No se usa en el nuevo formulario
            usuario_id=current_user.id
        )
        db.session.add(factura)
        db.session.flush()  # Para obtener el id de la factura
        # Guardar detalle de ítems
        cantidades = request.form.getlist('cantidad[]')
        unidades = request.form.getlist('unidad[]')
        descripciones = request.form.getlist('descripcion[]')
        valores_unitarios = request.form.getlist('valor_unitario[]')
        importes_totales = request.form.getlist('importe_total[]')
        for i in range(len(cantidades)):
            detalle = FacturaDetalle(
                factura_id=factura.id,
                cantidad=float(cantidades[i]),
                unidad=unidades[i],
                descripcion=descripciones[i],
                valor_unitario=float(valores_unitarios[i]),
                importe_total=float(importes_totales[i])
            )
            db.session.add(detalle)
        db.session.commit()
        flash('Factura creada exitosamente', 'success')
        return redirect(url_for('facturas.index'))
    clientes = Cliente.query.filter_by(activo=True).all()
    return render_template('facturas/nueva_factura.html', clientes=clientes)

# Blueprint de perfil
perfil_bp = Blueprint('perfil', __name__)

@perfil_bp.route('/')
@login_required
def index():
    return render_template('perfil/index.html')

@perfil_bp.route('/editar', methods=['GET', 'POST'])
@login_required
def editar():
    if request.method == 'POST':
        current_user.nombre = request.form['nombre']
        current_user.apellido = request.form['apellido']
        current_user.email = request.form['email']
        
        if request.form.get('password'):
            current_user.set_password(request.form['password'])
        
        db.session.commit()
        flash('Perfil actualizado exitosamente', 'success')
        return redirect(url_for('perfil.index'))
    
    return render_template('perfil/editar.html')

# Blueprint de guías de remisión
guias_remision_bp = Blueprint('guias_remision', __name__)

@guias_remision_bp.route('/')
@login_required
def index():
    guias = GuiaRemision.query.order_by(GuiaRemision.fecha.desc()).all()
    return render_template('guias_remision/index.html', guias=guias)

@guias_remision_bp.route('/nueva', methods=['GET', 'POST'])
@login_required
def nueva_guia():
    if request.method == 'POST':
        guia = GuiaRemision(
            chofer_id=int(request.form['chofer_id']),
            vehiculo_id=int(request.form['vehiculo_id']),
            fecha=datetime.strptime(request.form['fecha'], '%Y-%m-%d').date(),
            cliente_id=int(request.form['cliente_id']),
            guia_receptor=request.form['guia_receptor'],
            guia_remitente=request.form['guia_remitente'],
            origen=request.form['origen'],
            destino=request.form['destino'],
            kilometros_recorridos=int(request.form['kilometros_recorridos'])
        )
        db.session.add(guia)
        # Sumar kilómetros al vehículo
        vehiculo = Vehiculo.query.get(guia.vehiculo_id)
        if vehiculo.kilometraje_real:
            vehiculo.kilometraje_real += guia.kilometros_recorridos
        else:
            vehiculo.kilometraje_real = guia.kilometros_recorridos
        db.session.commit()
        flash('Guía de Remisión registrada exitosamente', 'success')
        return redirect(url_for('guias_remision.index'))
    choferes = Chofer.query.filter_by(estado='activo').all()
    vehiculos = Vehiculo.query.filter_by(estado='activo').all()
    clientes = Cliente.query.filter_by(activo=True).all()
    return render_template('guias_remision/nueva_guia.html', choferes=choferes, vehiculos=vehiculos, clientes=clientes)

@guias_remision_bp.route('/exportar_excel', methods=['POST'])
@login_required
def exportar_excel():
    ids = request.form.getlist('guia_ids')
    guias = GuiaRemision.query.filter(GuiaRemision.id.in_(ids)).all()
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Guías de Remisión'
    # Encabezados (sin kilometros)
    ws.append([
        'Chofer', 'Vehículo', 'Fecha', 'Cliente', 'Guía Receptor', 'Guía Remitente', 'Origen', 'Destino'
    ])
    for guia in guias:
        ws.append([
            f"{guia.chofer.nombre} {guia.chofer.apellido}",
            guia.vehiculo.placa,
            guia.fecha.strftime('%d/%m/%Y'),
            f"{guia.cliente.nombre} {guia.cliente.apellido}",
            guia.guia_receptor,
            guia.guia_remitente,
            guia.origen,
            guia.destino
        ])
    output = io.BytesIO()
    wb.save(output)
    output.seek(0)
    return send_file(output, as_attachment=True, download_name='guias_remision.xlsx', mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

# Blueprint de egresos
egresos_bp = Blueprint('egresos', __name__)

@egresos_bp.route('/')
@login_required
def egresos_index():
    egresos = Egreso.query.order_by(Egreso.fecha.desc()).all()
    return render_template('egresos/index.html', egresos=egresos)

@egresos_bp.route('/nuevo', methods=['GET', 'POST'])
@login_required
def nuevo_egreso():
    if request.method == 'POST':
        egreso = Egreso(
            fecha=datetime.strptime(request.form['fecha'], '%Y-%m-%d').date(),
            descripcion=request.form['descripcion'],
            monto=float(request.form['monto']),
            tipo_egreso=request.form['tipo_egreso'],
            observaciones=request.form['observaciones'],
            vehiculo_id=int(request.form['vehiculo_id']),
            usuario_id=current_user.id
        )
        db.session.add(egreso)
        db.session.commit()
        flash('Egreso registrado exitosamente', 'success')
        return redirect(url_for('egresos.egresos_index'))
    vehiculos = Vehiculo.query.filter_by(estado='activo').all()
    return render_template('egresos/nuevo_egreso.html', vehiculos=vehiculos)

@egresos_bp.route('/eliminar/<int:egreso_id>', methods=['POST'])
@login_required
def eliminar_egreso(egreso_id):
    egreso = Egreso.query.get_or_404(egreso_id)
    db.session.delete(egreso)
    db.session.commit()
    flash('Egreso eliminado', 'success')
    return redirect(url_for('egresos.egresos_index'))

# Blueprint de reportes
reportes_bp = Blueprint('reportes', __name__)

@reportes_bp.route('/')
@login_required
def index():
    return render_template('reportes/index.html')

@reportes_bp.route('/ingresos_egresos')
@login_required
def ingresos_egresos():
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    facturas_query = Factura.query
    egresos_query = Egreso.query
    if fecha_inicio:
        facturas_query = facturas_query.filter(Factura.fecha_emision >= fecha_inicio)
        egresos_query = egresos_query.filter(Egreso.fecha >= fecha_inicio)
    if fecha_fin:
        facturas_query = facturas_query.filter(Factura.fecha_emision <= fecha_fin)
        egresos_query = egresos_query.filter(Egreso.fecha <= fecha_fin)
    facturas = facturas_query.all()
    egresos = egresos_query.all()
    total_ingresos = sum(f.total for f in facturas)
    total_egresos = sum(e.monto for e in egresos)
    ganancia_neta = total_ingresos - total_egresos
    def serialize_factura(f):
        return {
            "id": f.id,
            "numero_factura": f.numero_factura,
            "fecha_emision": f.fecha_emision.strftime("%Y-%m-%d"),
            "total": f.total
        }
    def serialize_egreso(e):
        return {
            "id": e.id,
            "fecha": e.fecha.strftime("%Y-%m-%d"),
            "tipo_egreso": e.tipo_egreso,
            "descripcion": e.descripcion,
            "monto": e.monto
        }
    facturas_json = [serialize_factura(f) for f in facturas]
    egresos_json = [serialize_egreso(e) for e in egresos]
    return render_template('reportes/ingresos_egresos.html', facturas=facturas, egresos=egresos, total_ingresos=total_ingresos, total_egresos=total_egresos, ganancia_neta=ganancia_neta, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin, facturas_json=facturas_json, egresos_json=egresos_json)

@reportes_bp.route('/uso_unidades')
@login_required
def uso_unidades():
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    guias_query = GuiaRemision.query
    if fecha_inicio:
        guias_query = guias_query.filter(GuiaRemision.fecha >= fecha_inicio)
    if fecha_fin:
        guias_query = guias_query.filter(GuiaRemision.fecha <= fecha_fin)
    guias = guias_query.all()
    # Agrupar por vehículo
    unidades = {}
    for g in guias:
        v = g.vehiculo
        if v.id not in unidades:
            unidades[v.id] = {'vehiculo': v, 'servicios': 0, 'km': 0, 'clientes': set()}
        unidades[v.id]['servicios'] += 1
        unidades[v.id]['km'] += g.kilometros_recorridos
        unidades[v.id]['clientes'].add(g.cliente_id)
    for u in unidades.values():
        u['clientes'] = len(u['clientes'])
    def serialize_unidad(u):
        return {
            'vehiculo': {
                'placa': u['vehiculo'].placa,
                'marca': u['vehiculo'].marca,
                'modelo': u['vehiculo'].modelo
            },
            'servicios': u['servicios'],
            'km': u['km'],
            'clientes': u['clientes']
        }
    unidades_json = [serialize_unidad(u) for u in unidades.values()]
    return render_template('reportes/uso_unidades.html', unidades=unidades.values(), unidades_json=unidades_json, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)

@reportes_bp.route('/clientes_frecuentes')
@login_required
def clientes_frecuentes():
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    facturas_query = Factura.query
    if fecha_inicio:
        facturas_query = facturas_query.filter(Factura.fecha_emision >= fecha_inicio)
    if fecha_fin:
        facturas_query = facturas_query.filter(Factura.fecha_emision <= fecha_fin)
    facturas = facturas_query.all()
    ranking = {}
    for f in facturas:
        c = f.cliente
        if c.id not in ranking:
            ranking[c.id] = {'cliente': c, 'servicios': 0, 'monto': 0}
        ranking[c.id]['servicios'] += 1
        ranking[c.id]['monto'] += f.total
    ranking_list = sorted(ranking.values(), key=lambda x: x['monto'], reverse=True)
    def serialize_cliente(r):
        return {
            'cliente': {
                'nombre': r['cliente'].nombre,
                'apellido': r['cliente'].apellido
            },
            'servicios': r['servicios'],
            'monto': r['monto']
        }
    ranking_json = [serialize_cliente(r) for r in ranking_list]
    return render_template('reportes/clientes_frecuentes.html', ranking=ranking_list, ranking_json=ranking_json, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)

@reportes_bp.route('/ganancia_neta')
@login_required
def ganancia_neta():
    anio = request.args.get('anio', type=int)
    mes = request.args.get('mes', type=int)
    facturas_query = Factura.query
    egresos_query = Egreso.query
    if anio:
        facturas_query = facturas_query.filter(db.extract('year', Factura.fecha_emision) == anio)
        egresos_query = egresos_query.filter(db.extract('year', Egreso.fecha) == anio)
    if mes:
        facturas_query = facturas_query.filter(db.extract('month', Factura.fecha_emision) == mes)
        egresos_query = egresos_query.filter(db.extract('month', Egreso.fecha) == mes)
    # Agrupar por mes
    from collections import defaultdict
    resumen = defaultdict(lambda: {'ingresos': 0, 'egresos': 0})
    for f in facturas_query.all():
        m = f.fecha_emision.month
        resumen[m]['ingresos'] += f.total
    for e in egresos_query.all():
        m = e.fecha.month
        resumen[m]['egresos'] += e.monto
    datos = []
    for m in range(1, 13):
        ingresos = resumen[m]['ingresos']
        egresos = resumen[m]['egresos']
        datos.append({'mes': m, 'ingresos': ingresos, 'egresos': egresos, 'ganancia_neta': ingresos-egresos})
    return render_template('reportes/ganancia_neta.html', datos=datos, anio=anio, mes=mes) 