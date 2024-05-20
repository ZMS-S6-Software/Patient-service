import express from 'express';
// import mongoose from 'mongoose';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';
//controllers
import patientController from "./Controllers/PatientController.js";

//env inladen
dotenv.config();

//app aanmaken
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND || 'http://localhost:8083'
}));

// Configuratie voor databaseverbinding
const config = {
  user: 'sa',
  password: 'admin',
  server: 'DESKTOP-T5DHN9T',
  database: 'master',
  options: {
      encrypt: false
  }
};

// Connectie maken met de database
sql.connect(config)
.then(() => {
  console.log('Database verbonden');
  
  // Server starten nadat de databaseverbinding tot stand is gebracht
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  //controller inlezen
  patientController(app)
 
})
.catch(err => {
  console.error('Fout bij het verbinden met de database:', err);
});



// //debug aanzetten
// mongoose.set('debug', true);
// //database connectie maken
// mongoose.connect(process.env.URL);

// //server aanmaken
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// //controller inlezen
// patientController(app)



