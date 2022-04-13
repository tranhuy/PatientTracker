"use strict";
exports.__esModule = true;
exports.Gender = exports.healthCheckRating = void 0;
var healthCheckRating;
(function (healthCheckRating) {
    healthCheckRating[healthCheckRating["Healthy"] = 0] = "Healthy";
    healthCheckRating[healthCheckRating["LowRisk"] = 1] = "LowRisk";
    healthCheckRating[healthCheckRating["HighRisk"] = 2] = "HighRisk";
    healthCheckRating[healthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(healthCheckRating = exports.healthCheckRating || (exports.healthCheckRating = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
