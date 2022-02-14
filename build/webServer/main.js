"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var backendEnv_1 = require("../api/backendEnv");
var serverApplication_1 = require("../serverApplication");
var expressCommandApi_1 = require("./express/expressCommandApi");
var expressListen_1 = require("./express/expressListen");
var expressQueryApi_1 = require("./express/expressQueryApi");
var expressStaticFrontEnd_1 = require("./express/expressStaticFrontEnd");
var expressApplication = (0, express_1["default"])();
(0, expressCommandApi_1.expressCommandApi)(expressApplication, serverApplication_1.serverApplication);
(0, expressQueryApi_1.expressQueryApi)(expressApplication, serverApplication_1.serverApplication);
(0, expressStaticFrontEnd_1.expressStaticFrontEnd)(expressApplication);
(0, expressListen_1.expressListen)(expressApplication, backendEnv_1.backendFqdn, backendEnv_1.backendPort);
