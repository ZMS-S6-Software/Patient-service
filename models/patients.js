import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Patients = sequelize.define('Patients', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prefix: DataTypes.STRING,
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  bio: DataTypes.TEXT,
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {});

export default Patients;


// import mongoose from "mongoose";

// const patientSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     firstname: {
//       type: String,
//       required: true,
//     },
//     prefix: {
//       type: String,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     bio: {
//       type: String
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   });

// export const Patients = mongoose.model('Patients', patientSchema);