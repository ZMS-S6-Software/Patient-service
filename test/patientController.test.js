import sinon from 'sinon';
import { expect } from 'chai';
import supertest from 'supertest';
import sql from 'mssql';
import patientController from '../Controllers/PatientController.js';
import express from 'express';

describe('Patient Controller', () => {
  let request;
  let poolStub;
  let app;

  before(() => {
    app = express();
    app.use(express.json());
    poolStub = sinon.stub(sql, 'connect').resolves({
      request: sinon.stub().returnsThis(),
      input: sinon.stub().returnsThis(),
      query: sinon.stub(),
      close: sinon.stub().resolves()
    });

    patientController(app);

    request = supertest(app);
  });

  after(() => {
    poolStub.restore();
  });

  it('should return 500 when an error occurs during fetching patient data', async () => {
    poolStub.rejects(new Error('Database error'));

    const response = await request.get('/patient/3');
    expect(response.status).to.equal(500);
    expect(response.text).to.equal('Error fetching patient');
  });
});
