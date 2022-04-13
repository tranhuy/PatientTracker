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
exports.__esModule = true;
var patients_1 = require("../../data/patients");
var uuid_1 = require("uuid");
var patients = patients_1["default"].map(function (p) {
    if (!p.entries) {
        return __assign(__assign({}, p), { entries: [] });
    }
    return p;
});
var getAll = function () {
    return patients;
};
var getNonSensitive = function () {
    var nonSensitivePatients = patients.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation
        });
    });
    return nonSensitivePatients;
};
var getPatientData = function (id) {
    var patient = patients.find(function (p) { return p.id === id; });
    if (!patient) {
        throw new Error('Patient not found');
    }
    return patient;
};
var addPatient = function (patient) {
    var newPatient = __assign({ id: (0, uuid_1.v1)(), entries: [] }, patient);
    patients.push(newPatient);
    return newPatient;
};
var addPatientEntry = function (entry, patiendId) {
    var patientIndex = -1;
    patients.forEach(function (patient, index) {
        if (patient.id == patiendId) {
            patientIndex = index;
            var newEntry = __assign({ id: (0, uuid_1.v1)() }, entry);
            patient.entries.push(newEntry);
        }
    });
    if (patientIndex === -1) {
        throw Error('Patient not found');
    }
    return patients[patientIndex];
};
exports["default"] = {
    getAll: getAll,
    getNonSensitive: getNonSensitive,
    getPatientData: getPatientData,
    addPatient: addPatient,
    addPatientEntry: addPatientEntry
};
