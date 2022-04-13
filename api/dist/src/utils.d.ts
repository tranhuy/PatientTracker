import { NewPatientData, NewEntryData } from "./types";
declare type PatientFields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};
export declare const toNewPatientData: ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields) => NewPatientData;
declare type EntryFields = {
    type: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: unknown;
};
export declare const toNewEntryData: ({ type, description, date, specialist, diagnosisCodes, ...otherFields }: EntryFields) => NewEntryData;
export {};
