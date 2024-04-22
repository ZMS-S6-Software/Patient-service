import { Patients } from "../models/patients.js";

export default function () {
  async function getPatientById(id) {
    try {
      const patient = await Patients.findById(id);
      return patient;
    } catch (error) {
      throw new Error("Error fetching movie");
    }
  }

  async function getAllPatients() {
    try {
      const allPatients = await Patients.find();
      return allPatients;
    } catch (error) {
      throw new Error("Error fetching patients");
    }
  }

  return {
    getPatientById,
    getAllPatients
  };
}