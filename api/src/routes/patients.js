"use strict";
exports.__esModule = true;
var express_1 = require("express");
var patientService_1 = require("../services/patientService");
var utils_1 = require("../utils");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send(patientService_1["default"].getAll());
});
router.get('/:id', function (req, res) {
    try {
        res.send(patientService_1["default"].getPatientData(req.params.id));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
router.post('/', function (req, res) {
    try {
        var newPatientData = (0, utils_1.toNewPatientData)(req.body);
        var newPatient = patientService_1["default"].addPatient(newPatientData);
        res.json(newPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
router.post('/:id', function (req, res) {
    try {
        var newEntry = (0, utils_1.toNewEntryData)(req.body);
        var patientWithNewEntry = patientService_1["default"].addPatientEntry(newEntry, req.params.id);
        res.json(patientWithNewEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports["default"] = router;
