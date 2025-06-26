from flask import Flask
from config import Config
from extensions import db, login_manager
from routes import main_bp, rutas_bp, clientes_bp, vehiculos_bp, choferes_bp, guias_bp, facturas_bp, perfil_bp, guias_remision_bp, egresos_bp, reportes_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Inicializar extensiones
    db.init_app(app)
    login_manager.init_app(app)
    
    # Registrar blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(rutas_bp, url_prefix='/rutas')
    app.register_blueprint(clientes_bp, url_prefix='/clientes')
    app.register_blueprint(vehiculos_bp, url_prefix='/vehiculos')
    app.register_blueprint(choferes_bp, url_prefix='/choferes')
    app.register_blueprint(guias_bp, url_prefix='/guias')
    app.register_blueprint(facturas_bp, url_prefix='/facturas')
    app.register_blueprint(perfil_bp, url_prefix='/perfil')
    app.register_blueprint(guias_remision_bp, url_prefix='/guias_remision')
    app.register_blueprint(egresos_bp, url_prefix='/egresos')
    app.register_blueprint(reportes_bp, url_prefix='/reportes')
    
    # Crear tablas
    with app.app_context():
        db.create_all()
    
    from models import Usuario
    @login_manager.user_loader
    def load_user(user_id):
        return Usuario.query.get(int(user_id))
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5001) 