import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  });

export const Patients = mongoose.model('Patients', patientSchema);