"use strict";
exports.__esModule = true;
exports.backendFqdn = exports.backendPort = void 0;
var EnvironmentVariable_1 = require("../infra/EnvironmentVariable");
var retrieveEnvVariable_1 = require("../infra/retrieveEnvVariable");
var defaultBackendPort = '8000';
var defaultBackendFqdn = 'localhost';
exports.backendPort = parseInt((0, retrieveEnvVariable_1.retrieveEnvVariable)(EnvironmentVariable_1.EnvironmentVariable.BACKEND_PORT, defaultBackendPort));
exports.backendFqdn = (0, retrieveEnvVariable_1.retrieveEnvVariable)(EnvironmentVariable_1.EnvironmentVariable.BACKEND_FQDN, defaultBackendFqdn);
