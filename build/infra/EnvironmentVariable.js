"use strict";
exports.__esModule = true;
exports.onMissingEnvVariable = exports.EnvironmentVariable = void 0;
/* eslint-disable no-unused-vars */
var EnvironmentVariable;
(function (EnvironmentVariable) {
    EnvironmentVariable["TWITCHTOKEN"] = "TWITCHTOKEN";
    EnvironmentVariable["TWITCHUSERNAME"] = "TWITCHUSERNAME";
    EnvironmentVariable["TWITCHCHANNEL"] = "TWITCHCHANNEL";
    EnvironmentVariable["GCP_PROJECT_ID"] = "GCP_PROJECT_ID";
    EnvironmentVariable["GCP_CLIENT_EMAIL"] = "GCP_CLIENT_EMAIL";
    EnvironmentVariable["GCP_PRIVATE_KEY"] = "GCP_PRIVATE_KEY";
    EnvironmentVariable["BACKEND_PORT"] = "PORT";
    EnvironmentVariable["BACKEND_FQDN"] = "BACKEND_FQDN";
    EnvironmentVariable["BACKEND_SHEME"] = "BACKEND_SHEME";
})(EnvironmentVariable = exports.EnvironmentVariable || (exports.EnvironmentVariable = {}));
var onMissingEnvVariable = function (envVar) { throw new Error("Missing env variable ".concat(envVar)); };
exports.onMissingEnvVariable = onMissingEnvVariable;
