"use strict";
exports.__esModule = true;
var diagnoses_json_1 = require("../../data/diagnoses.json");
var diagnoses = diagnoses_json_1["default"];
var getAll = function () {
    return diagnoses;
};
exports["default"] = {
    getAll: getAll
};
