export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root", 
  PASSWORD: process.env.DB_PASSWORD || "MysqlPass2004",
  DB: process.env.DB_NAME || "testdb",
  PORT: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

//Esteban Chávez Villalta