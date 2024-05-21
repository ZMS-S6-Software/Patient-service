// Configuratie voor databaseverbinding
import dotenv from 'dotenv';
//env inladen
dotenv.config();

const config = {
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    server: `${process.env.DB_HOST}`,
    database: 'Patients',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export default config;
