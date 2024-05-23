import rabbitQueue from '../BusinessLogic/messageBroker.js';
import sql from 'mssql';
import config from '../BusinessLogic/dbConfig.js';
const queueService = rabbitQueue();

export default function (app) {

  app.get("/patient/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const pool = await sql.connect(config);

      const result = await pool.request()
        .input('patientId', sql.Int, id)
        .query('SELECT * FROM Patients WHERE patientId = @patientId');

      const patient = result.recordset[0];

      if (!patient) return res.status(404).send("patient not found");

      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching patient");
    } finally {
      sql.close();
    }
  });

  app.get("/patients", async (req, res) => {
    try {
      const pool = await sql.connect(config);

      const result = await pool.request().query('SELECT * FROM Patients');

      const allPatients = result.recordset;

      res.status(200).json(allPatients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching patients");
    } finally {
      sql.close();
    }
  });

  app.put("/patient/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
      const pool = await sql.connect(config);

      const oldPatientResult = await pool.request()
        .input('patientId', sql.Int, id)
        .query('SELECT * FROM Patients WHERE patientId = @patientId');

      const oldPatient = oldPatientResult.recordset[0];

      if (!oldPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      const updateQuery = `
        UPDATE Patients
        SET ${Object.keys(updates).map(key => `${key} = @${key}`).join(', ')}
        WHERE patientId = @patientId
      `;
      const request = pool.request();
      Object.keys(updates).forEach(key => {
        request.input(key, sql.VarChar, updates[key]);
      });
      request.input('patientId', sql.Int, id);

      await request.query(updateQuery);

      const updatedPatientResult = await pool.request()
        .input('patientId', sql.Int, id)
        .query('SELECT * FROM Patients WHERE patientId = @patientId');

      const updatedPatient = updatedPatientResult.recordset[0];

      const queueData = {
        title: 'updatePatient',
        oldEmail: oldPatient.email,
        updatedPatient
      };
      queueService.sendDataToQueue(JSON.stringify(queueData));

      res.json(updatedPatient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating patient" });
    } finally {
      sql.close();
    }
  });
}
