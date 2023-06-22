"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questagcontroller_1 = require("../controllers/questagcontroller");
const questiontagRoutes = (0, express_1.Router)();
questiontagRoutes.post('', questagcontroller_1.createQuestionTag);
questiontagRoutes.get('', questagcontroller_1.getallQuestionsTags);
questiontagRoutes.get('/:id', questagcontroller_1.getQuestiontagsbyId);
exports.default = questiontagRoutes;
