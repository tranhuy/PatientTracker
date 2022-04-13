"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default.map(p => {
    if (!p.entries) {
        return Object.assign(Object.assign({}, p), { entries: [] });
    }
    return p;
});
const getAll = () => {
    return patients;
};
const getNonSensitive = () => {
    const nonSensitivePatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
    return nonSensitivePatients;
};
const getPatientData = (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)(), entries: [] }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addPatientEntry = (entry, patiendId) => {
    let patientIndex = -1;
    patients.forEach((patient, index) => {
        if (patient.id == patiendId) {
            patientIndex = index;
            const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
            patient.entries.push(newEntry);
        }
    });
    if (patientIndex === -1) {
        throw Error('Patient not found');
    }
    return patients[patientIndex];
};
exports.default = {
    getAll, getNonSensitive, getPatientData, addPatient, addPatientEntry
};
