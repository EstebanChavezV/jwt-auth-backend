// server.js
import express from 'express';
import cors from 'cors';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';

const app = express();

// Configuración CORS para producción y desarrollo
var corsOptions = {
   origin: [
     "http://localhost:3000", 
     "http://localhost:8081",
     "https://tu-frontend.vercel.app", // Añadir cuando despliegues frontend
     "https://tu-frontend.netlify.app" // Añadir cuando despliegues frontend
   ]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar rutas (llamando las funciones exportadas)
authRoutes(app);
userRoutes(app);

// Ruta simple
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to JWT Auth API - Esteban Chávez", 
    status: "success",
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 8080;

// Función para insertar roles iniciales
async function initial() {
  try {
    // Verificar si ya existen roles
    const roleCount = await db.role.count();
    
    if (roleCount === 0) {
      console.log("Creando roles iniciales...");
      
      await db.role.create({
        id: 1,
        name: "user"
      });
      
      await db.role.create({
        id: 2,
        name: "moderator"
      });
      
      await db.role.create({
        id: 3,
        name: "admin"
      });
      
      console.log("Roles creados exitosamente.");
    } else {
      console.log("Los roles ya existen en la base de datos.");
    }
  } catch (error) {
    console.error("Error al crear roles iniciales:", error);
  }
}

// Sincronizar base de datos
db.sequelize.sync({ alter: true }) // Cambiado de force: true a alter: true
  .then(() => {
    console.log("Base de datos sincronizada.");
    return initial();
  })
  .then(() => {
    // Escuchar en todas las interfaces para producción
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}.`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error("Error al inicializar la aplicación:", error);
  });

//Esteban Yahir Chávez Villalta