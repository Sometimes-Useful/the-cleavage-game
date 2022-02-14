"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var serverEnvironnementVariables_1 = require("../env/serverEnvironnementVariables");
var serverApplication_1 = require("../serverApplication");
var expressCommandApi_1 = require("./express/expressCommandApi");
var expressListen_1 = require("./express/expressListen");
var expressQueryApi_1 = require("./express/expressQueryApi");
var expressStaticFrontEnd_1 = require("./express/expressStaticFrontEnd");
(0, dotenv_1.config)();
var expressApplication = (0, express_1["default"])();
(0, expressCommandApi_1.expressCommandApi)(expressApplication, serverApplication_1.serverApplication);
(0, expressQueryApi_1.expressQueryApi)(expressApplication, serverApplication_1.serverApplication);
(0, expressStaticFrontEnd_1.expressStaticFrontEnd)(expressApplication);
(0, expressListen_1.expressListen)(expressApplication, serverEnvironnementVariables_1.backendSheme, serverEnvironnementVariables_1.backendFqdn, serverEnvironnementVariables_1.backendPort);
