import rabbitQueue from '../BusinessLogic/messageBroker.js';
import patientLogic from '../BusinessLogic/PatientLogic.js';
const patientService = patientLogic();
const queueService = rabbitQueue();

export default function (app) {
  app.get("/test", async (req, res) => {
    try {
      const allPatients = 'TestData';
      queueService.sendDataToQueue(allPatients);
      res.status(200).json(allPatients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching patients");
    }
  });

  app.get("/patient/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const patient = await patientService.getPatientById(id);
      if (!patient) return res.status(404).send("patient not found");
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching patient");
    }
  });
  
  app.get("/patients", async (req, res) => {
    try {
      const allPatients = await patientService.getAllPatients();
      res.status(200).json(allPatients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching patients");
    }
  });
}
