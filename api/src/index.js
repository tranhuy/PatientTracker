"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var diagnoses_1 = require("./routes/diagnoses");
var patients_1 = require("./routes/patients");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
var PORT = 3002;
app.get('/api/ping', function (_req, res) {
    res.send('pong!');
});
app.use('/api/diagnoses', diagnoses_1["default"]);
app.use('/api/patients', patients_1["default"]);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
