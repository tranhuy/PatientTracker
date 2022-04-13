"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getAll());
});
router.get('/:id', (req, res) => {
    try {
        res.send(patientService_1.default.getPatientData(req.params.id));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientData = (0, utils_1.toNewPatientData)(req.body);
        const newPatient = patientService_1.default.addPatient(newPatientData);
        res.json(newPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
router.post('/:id', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntryData)(req.body);
        const patientWithNewEntry = patientService_1.default.addPatientEntry(newEntry, req.params.id);
        res.json(patientWithNewEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.default = router;
