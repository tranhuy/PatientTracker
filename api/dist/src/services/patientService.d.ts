import { PatientData, NonSensitivePatientData, NewPatientData, NewEntryData } from '../types';
declare const _default: {
    getAll: () => PatientData[];
    getNonSensitive: () => NonSensitivePatientData[];
    getPatientData: (id: string) => PatientData;
    addPatient: (patient: NewPatientData) => PatientData;
    addPatientEntry: (entry: NewEntryData, patiendId: string) => PatientData;
};
export default _default;
