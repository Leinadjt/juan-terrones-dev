from app import create_app
from models import db, Usuario

def init_database():
    app = create_app()
    
    with app.app_context():
        # Crear todas las tablas
        db.create_all()
        
        # Verificar si ya existe un usuario administrador
        admin = Usuario.query.filter_by(username='admin').first()
        
        if not admin:
            # Crear usuario administrador
            admin = Usuario(
                username='admin',
                email='admin@logistica.com',
                nombre='Administrador',
                apellido='Sistema',
                rol='admin'
            )
            admin.set_password('admin123')
            
            db.session.add(admin)
            db.session.commit()
            
            print("✅ Usuario administrador creado:")
            print("   Usuario: admin")
            print("   Contraseña: admin123")
        else:
            print("ℹ️  El usuario administrador ya existe")
        
        print("✅ Base de datos inicializada correctamente")

if __name__ == '__main__':
    init_database() 