"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answervotecontroller_1 = require("../controllers/answervotecontroller");
const answervotesRoutes = (0, express_1.Router)();
answervotesRoutes.post('', answervotecontroller_1.postAnswervotes);
answervotesRoutes.get('', answervotecontroller_1.getAnswerVotes);
answervotesRoutes.get('/aid/:id', answervotecontroller_1.getAnswerVotesbyAid);
answervotesRoutes.get('/avid/:id', answervotecontroller_1.getAnswerVotesbyid);
answervotesRoutes.put('/:id', answervotecontroller_1.updateAnswerVotes);
// answervotesRoutes.get('', )
exports.default = answervotesRoutes;
