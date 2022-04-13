"use strict";
exports.__esModule = true;
var express_1 = require("express");
var diagnosisService_1 = require("../services/diagnosisService");
var router = express_1["default"].Router();
router.get('/', function (_req, res) {
    res.send(diagnosisService_1["default"].getAll());
});
exports["default"] = router;
