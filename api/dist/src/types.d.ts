export interface DiagnosisData {
    code: string;
    name: string;
    latin?: string;
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisData['code']>;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}
export declare enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating;
}
export declare type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;
export interface PatientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
export declare type NonSensitivePatientData = Omit<PatientData, 'ssn' | 'entries'>;
export declare type NewPatientData = Omit<PatientData, 'id' | 'entries'>;
declare type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export declare type NewEntryData = UnionOmit<Entry, 'id'>;
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export {};
