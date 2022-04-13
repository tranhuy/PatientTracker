import patientData from '../../data/patients';
import { PatientData, NonSensitivePatientData, NewPatientData, NewEntryData } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientData> = patientData.map(p => {
                                        if (!p.entries) {
                                            return { ...p, entries: [] };
                                        }
                                        
                                        return p;
                                    });

const getAll = (): Array<PatientData> => {
    return patients;
}

const getNonSensitive = () : Array<NonSensitivePatientData> => {
    const nonSensitivePatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

    return nonSensitivePatients;
}

const getPatientData = (id: string): PatientData => {
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        throw new Error('Patient not found');
    }

    return patient;
}

const addPatient = (patient : NewPatientData): PatientData => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
}

const addPatientEntry = (entry: NewEntryData, patiendId: string): PatientData => {
    let patientIndex = -1;
    
    patients.forEach((patient, index) => {
        if (patient.id == patiendId) {
            patientIndex = index;
            const newEntry = {
                id: uuid(),
                ...entry
            }
            patient.entries.push(newEntry);
        }
    });

    if (patientIndex === -1) {
        throw Error('Patient not found');
    }

    return patients[patientIndex];
};

export default {
    getAll, getNonSensitive, getPatientData, addPatient, addPatientEntry
};