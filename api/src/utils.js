"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.toNewEntryData = exports.toNewPatientData = void 0;
var types_1 = require("./types");
var diagnoses_json_1 = require("../data/diagnoses.json");
var toNewPatientData = function (_a) {
    var name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation;
    var newPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};
exports.toNewPatientData = toNewPatientData;
var parseName = function (name) {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }
    return name;
};
var parseDateOfBirth = function (dob) {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing patient date of birth');
    }
    return dob;
};
var parseSsn = function (ssn) {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing patient ssn');
    }
    return ssn;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing patient occupation');
    }
    return occupation;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing patient gender');
    }
    return gender;
};
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var isGender = function (gender) {
    return Object.values(types_1.Gender).includes(gender);
};
var toNewEntryData = function (_a) {
    var type = _a.type, description = _a.description, date = _a.date, specialist = _a.specialist, diagnosisCodes = _a.diagnosisCodes, otherFields = __rest(_a, ["type", "description", "date", "specialist", "diagnosisCodes"]);
    var newEntryBase = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
    var newEntry;
    switch (newEntryBase.type) {
        case "HealthCheck":
            var healthCheckRating_1 = otherFields.healthCheckRating;
            var healthCheckEntry = {
                healthCheckRating: parseHealthCheckRating(healthCheckRating_1)
            };
            newEntry = __assign(__assign(__assign({}, newEntryBase), { type: "HealthCheck" }), healthCheckEntry);
            break;
        case "Hospital":
            var discharge = otherFields.discharge;
            var hospitalEntry = {
                discharge: {
                    date: parseDate(discharge.date),
                    criteria: discharge.criteria
                }
            };
            newEntry = __assign(__assign(__assign({}, newEntryBase), { type: "Hospital" }), hospitalEntry);
            break;
        case "OccupationalHealthcare":
            var _b = otherFields, employerName = _b.employerName, sickLeave = _b.sickLeave;
            var occupationalHealthcareEntry = {
                employerName: employerName,
                sickLeave: sickLeave ? {
                    startDate: parseDate(sickLeave.startDate),
                    endDate: parseDate(sickLeave.endDate)
                } : undefined
            };
            newEntry = __assign(__assign(__assign({}, newEntryBase), { type: "OccupationalHealthcare" }), occupationalHealthcareEntry);
            break;
    }
    return newEntry;
};
exports.toNewEntryData = toNewEntryData;
var parseType = function (type) {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing entry type');
    }
    return type;
};
var parseDescription = function (description) {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing entry description');
    }
    return description;
};
var parseDate = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
var parseSpecialist = function (specialist) {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing entry specialist');
    }
    return specialist;
};
var parseDiagnosisCodes = function (codes) {
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
var parseHealthCheckRating = function (rating) {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing healthcheck rating');
    }
    return rating;
};
var isHealthCheckRating = function (rating) {
    return Object.values(types_1.healthCheckRating).includes(rating);
};
var isType = function (type) {
    return type === "OccupationalHealthcare" || type === "Hospital" || type === "HealthCheck";
};
var isArrayOfType = function (array) {
    return array.every(function (item) { return isString(item); });
};
var areValidDiagnosesCodes = function (codes) {
    var validCodes = true;
    codes.forEach(function (code) {
        validCodes = validCodes && diagnoses_json_1["default"].some(function (diagnosis) { return diagnosis.code === code; });
    });
    return validCodes;
};
