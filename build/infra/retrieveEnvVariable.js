"use strict";
exports.__esModule = true;
exports.retrieveEnvVariable = void 0;
function retrieveEnvVariable(envVariableValue, envVariableName, defaultValue) {
    if (envVariableValue)
        return envVariableValue;
    if (defaultValue)
        return defaultValue;
    throw new Error("Missing env variable ".concat(envVariableName));
}
exports.retrieveEnvVariable = retrieveEnvVariable;
