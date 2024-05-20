import { Patients } from "../models/patients.js";

export default function () {
  async function getPatientById(id) {
    try {
      const patient = await Patients.findByPk(id);
      return patient;
    } catch (error) {
      throw new Error("Error fetching patient");
    }
  }

  async function getAllPatients() {
    try {
      const allPatients = await Patients.findAll();
      return allPatients;
    } catch (error) {
      throw new Error("Error fetching patients");
    }
  }

  async function updatePatient(id, updates) {
    try {
      const patient = await Patients.findByPk(id);

      if (!patient) {
        throw new Error("Patient not found");
      }

      patient.firstname = updates.firstname || patient.firstname;
      patient.prefix = updates.prefix || patient.prefix;
      patient.lastname = updates.lastname || patient.lastname;
      patient.email = updates.email || patient.email;
      patient.bio = updates.bio || patient.bio;
      patient.isActive = updates.isActive || patient.isActive;

      const updatedPatient = await patient.save();

      return updatedPatient;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  }

  return {
    getPatientById,
    getAllPatients,
    updatePatient
  };
}


// import { Patients } from "../models/patients.js";

// export default function () {
//   async function getPatientById(id) {
//     try {
//       const patient = await Patients.findById(id);
//       return patient;
//     } catch (error) {
//       throw new Error("Error fetching patient");
//     }
//   }

//   async function getAllPatients() {
//     try {
//       const allPatients = await Patients.find();
//       return allPatients;
//     } catch (error) {
//       throw new Error("Error fetching patients");
//     }
//   }

//   async function updatePatient(id, updates) {
//     try {
//       const patient = await Patients.findById(id);

//       if (!patient) {
//         throw new Error("Patient not found");
//       }

//       patient.firstname = updates.firstname || patient.firstname;
//       patient.prefix = updates.prefix || patient.prefix;
//       patient.lastname = updates.lastname || patient.lastname;
//       patient.email = updates.email || patient.email;
//       patient.bio = updates.bio || patient.bio;
//       patient.isActive = updates.isActive || patient.isActive;

//       const updatedPatient = await patient.save();

//       return updatedPatient;
//     } catch (err) {
//       console.error(err);
//       throw new Error("Internal server error");
//     }
//   }

//   return {
//     getPatientById,
//     getAllPatients,
//     updatePatient
//   };
// }