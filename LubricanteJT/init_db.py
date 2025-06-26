from app import app, db, Usuario
from werkzeug.security import generate_password_hash

def init_database():
    with app.app_context():
        # Crear todas las tablas
        db.create_all()
        
        # Crear usuario administrador si no existe
        if not Usuario.query.filter_by(username='admin').first():
            admin = Usuario(
                username='admin',
                password_hash=generate_password_hash('admin123'),
                nombre='Administrador',
                rol='admin',
                activo=True
            )
            db.session.add(admin)
            db.session.commit()
            print("✅ Usuario administrador creado:")
            print("   Usuario: admin")
            print("   Contraseña: admin123")
        else:
            print("ℹ️ El usuario administrador ya existe")
        
        print("✅ Base de datos inicializada correctamente")

if __name__ == '__main__':
    init_database()