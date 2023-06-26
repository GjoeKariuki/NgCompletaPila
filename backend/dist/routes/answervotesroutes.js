"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answervotecontroller_1 = require("../controllers/answervotecontroller");
const tokenizing_1 = require("../middlewares/tokenizing");
const answervotesRoutes = (0, express_1.Router)();
answervotesRoutes.post('', tokenizing_1.tokenize, answervotecontroller_1.postAnswervotes);
answervotesRoutes.get('', tokenizing_1.tokenize, answervotecontroller_1.getAnswerVotes);
answervotesRoutes.get('/aid/:id', tokenizing_1.tokenize, answervotecontroller_1.getAnswerVotesbyAid);
answervotesRoutes.get('/avid/:id', tokenizing_1.tokenize, answervotecontroller_1.getAnswerVotesbyid);
answervotesRoutes.put('/:id', tokenizing_1.tokenize, answervotecontroller_1.updateAnswerVotes);
// answervotesRoutes.get('', )
exports.default = answervotesRoutes;
