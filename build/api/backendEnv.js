"use strict";
exports.__esModule = true;
exports.backendFqdn = exports.backendPort = void 0;
var retrieveEnvVariable_1 = require("../infra/retrieveEnvVariable");
var defaultBackendPort = '8000';
var defaultBackendFqdn = 'localhost';
var backendPort = function (envVariableValue, envVariableName) { return parseInt((0, retrieveEnvVariable_1.retrieveEnvVariable)(envVariableValue, envVariableName, defaultBackendPort)); };
exports.backendPort = backendPort;
var backendFqdn = function (envVariableValue, envVariableName) { return (0, retrieveEnvVariable_1.retrieveEnvVariable)(envVariableValue, envVariableName, defaultBackendFqdn); };
exports.backendFqdn = backendFqdn;
