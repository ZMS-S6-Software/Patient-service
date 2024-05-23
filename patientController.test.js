const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sql = require('mssql');
const config = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Patient endpoint', () => {
  describe('GET /patient/:id', () => {
    it('should return a patient with the given id', async () => {
      sinon.stub(sql, 'connect').resolves();
      sinon.stub(pool, 'request').returns({
        input: sinon.stub().returnsThis(),
        query: sinon.stub().resolves({ recordset: [{ patientId: 1, name: 'Test Patient' }] })
      });

      const res = await chai.request(app).get('/patient/1');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('patientId', 1);
      expect(res.body).to.have.property('name', 'Test Patient');

      sql.connect.restore();
      pool.request.restore();
    });

    it('should return 404 if the patient is not found', async () => {
      sinon.stub(sql, 'connect').resolves();
      sinon.stub(pool, 'request').returns({
        input: sinon.stub().returnsThis(),
        query: sinon.stub().resolves({ recordset: [] })
      });

      const res = await chai.request(app).get('/patient/1');

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error', 'patient not found');

      sql.connect.restore();
      pool.request.restore();
    });

    it('should return 500 if there is an error fetching the patient', async () => {
      sinon.stub(sql, 'connect').rejects(new Error('Database connection failed'));

      const res = await chai.request(app).get('/patient/1');

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error', 'Error fetching patient');

      sql.connect.restore();
    });
  });
});