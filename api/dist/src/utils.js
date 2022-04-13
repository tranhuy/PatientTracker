"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntryData = exports.toNewPatientData = void 0;
const types_1 = require("./types");
const diagnoses_json_1 = __importDefault(require("../data/diagnoses.json"));
const toNewPatientData = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return newPatient;
};
exports.toNewPatientData = toNewPatientData;
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }
    return name;
};
const parseDateOfBirth = (dob) => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing patient date of birth');
    }
    return dob;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing patient ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing patient occupation');
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing patient gender');
    }
    return gender;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const toNewEntryData = (_a) => {
    var { type, description, date, specialist, diagnosisCodes } = _a, otherFields = __rest(_a, ["type", "description", "date", "specialist", "diagnosisCodes"]);
    const newEntryBase = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    };
    let newEntry;
    switch (newEntryBase.type) {
        case "HealthCheck":
            const { healthCheckRating } = otherFields;
            const healthCheckEntry = {
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            };
            newEntry = Object.assign(Object.assign(Object.assign({}, newEntryBase), { type: "HealthCheck" }), healthCheckEntry);
            break;
        case "Hospital":
            const { discharge } = otherFields;
            const hospitalEntry = {
                discharge: {
                    date: parseDate(discharge.date),
                    criteria: discharge.criteria
                }
            };
            newEntry = Object.assign(Object.assign(Object.assign({}, newEntryBase), { type: "Hospital" }), hospitalEntry);
            break;
        case "OccupationalHealthcare":
            const { employerName, sickLeave } = otherFields;
            const occupationalHealthcareEntry = {
                employerName,
                sickLeave: sickLeave ? {
                    startDate: parseDate(sickLeave.startDate),
                    endDate: parseDate(sickLeave.endDate)
                } : undefined
            };
            newEntry = Object.assign(Object.assign(Object.assign({}, newEntryBase), { type: "OccupationalHealthcare" }), occupationalHealthcareEntry);
            break;
    }
    return newEntry;
};
exports.toNewEntryData = toNewEntryData;
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing entry type');
    }
    return type;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing entry description');
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing entry specialist');
    }
    return specialist;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes) {
        return undefined;
    }
    //check if provided diagnosis codes were sent in the correct format
    if (!Array.isArray(codes) || !isArrayOfType(codes)) {
        throw new Error('Diagnosis codes are in the wrong format');
    }
    //check if provided diagnosis codes are listed in diagnoses.json data file
    if (!areValidDiagnosesCodes(codes)) {
        throw new Error('One or more of the provided diagnosis codes are invalid');
    }
    return codes;
};
const parseHealthCheckRating = (rating) => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing healthcheck rating');
    }
    return rating;
};
const isHealthCheckRating = (rating) => {
    return Object.values(types_1.healthCheckRating).includes(rating);
};
const isType = (type) => {
    return type === "OccupationalHealthcare" || type === "Hospital" || type === "HealthCheck";
};
const isArrayOfType = (array) => {
    return array.every(item => isString(item));
};
const areValidDiagnosesCodes = (codes) => {
    let validCodes = true;
    codes.forEach(code => {
        validCodes = validCodes && diagnoses_json_1.default.some(diagnosis => diagnosis.code === code);
    });
    return validCodes;
};
