import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//controllers
import patientController from "./Controllers/PatientController.js";

//env inladen
dotenv.config();

//app aanmaken
const app = express();
app.use(express.json());

//debug aanzetten
mongoose.set('debug', true);
//database connectie maken
mongoose.connect(process.env.URL);

//server aanmaken
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//controller inlezen
patientController(app)
