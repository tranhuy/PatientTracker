import { NewPatientData, Gender, healthCheckRating, NewEntryData, HospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry } from "./types";
import diagnosesData from "../data/diagnoses.json";

type PatientFields = { 
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
}

export const toNewPatientData = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatientData => {
    const newPatient: NewPatientData = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    }

    return newPatient;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }

    return name;
}

const parseDateOfBirth = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing patient date of birth');
    }

    return dob
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing patient ssn');
    }

    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing patient occupation');
    }

    return occupation;
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing patient gender');
    }

    return gender;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text  instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

type EntryFields = { 
    type: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: unknown;
}

export const toNewEntryData = ({ type, description, date, specialist, diagnosisCodes, ...otherFields }: EntryFields): NewEntryData => {
    const newEntryBase = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    };

    let newEntry: NewEntryData;

    switch (newEntryBase.type) {
        case "HealthCheck":
            const { healthCheckRating } = otherFields as HealthCheckEntry;
            const healthCheckEntry = {
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            }
            newEntry = { ...newEntryBase, type: "HealthCheck", ...healthCheckEntry};
            break;
        case "Hospital":
            const { discharge } = otherFields as HospitalEntry;
            const hospitalEntry = {
                discharge: {
                    date: parseDate(discharge.date),
                    criteria: discharge.criteria
                }
            }
            newEntry = { ...newEntryBase, type: "Hospital", ...hospitalEntry };
            break;
        case "OccupationalHealthcare":
            const { employerName, sickLeave } = otherFields as OccupationalHealthCareEntry;
            const occupationalHealthcareEntry = {
                employerName,
                sickLeave: sickLeave ? {
                    startDate: parseDate(sickLeave.startDate),
                    endDate: parseDate(sickLeave.endDate)
                } : undefined
            }
            newEntry = { ...newEntryBase, type: "OccupationalHealthcare", ...occupationalHealthcareEntry };
            break;
    }

    return newEntry;
}

const parseType = (type: unknown): "OccupationalHealthcare" | "Hospital" | "HealthCheck" => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing entry type');
    }

    return type;
}

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing entry description');
    }

    return description;
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
}

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing entry specialist');
    }

    return specialist;
}

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
    if (!codes) {
        return undefined;
    }

    //check if provided diagnosis codes were sent in the correct format
    if (!Array.isArray(codes) || !isArrayOfType<string>(codes)) {
        throw new Error('Diagnosis codes are in the wrong format');
    } 

    //check if provided diagnosis codes are listed in diagnoses.json data file
    if (!areValidDiagnosesCodes(codes)) {
        throw new Error('One or more of the provided diagnosis codes are invalid');
    }

    return codes;
}

const parseHealthCheckRating = (rating: unknown): healthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing healthcheck rating');
    }

    return rating;
}

const isHealthCheckRating = (rating: any): rating is healthCheckRating => {
    return Object.values(healthCheckRating).includes(rating);
}

const isType = (type: unknown): type is "OccupationalHealthcare" | "Hospital" | "HealthCheck" => {
    return type === "OccupationalHealthcare" || type === "Hospital" || type === "HealthCheck";
}

const isArrayOfType = <T>(array: T[]): array is Array<T> => {    
    return array.every(item => isString(item));
}

const areValidDiagnosesCodes = (codes: string[]): boolean => { 
    let validCodes = true;

    codes.forEach(code => {
        validCodes = validCodes && diagnosesData.some(diagnosis => diagnosis.code === code);
    })

    return validCodes;
}