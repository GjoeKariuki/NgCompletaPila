"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questioncontrollers_1 = require("../controllers/questioncontrollers");
const tokenizing_1 = require("../middlewares/tokenizing");
const questionRoutes = (0, express_1.Router)();
questionRoutes.post('', questioncontrollers_1.createQuestion);
questionRoutes.get('', questioncontrollers_1.getallQuestions);
questionRoutes.get('/:id', questioncontrollers_1.getquestionByQid);
questionRoutes.get('/email/:email', questioncontrollers_1.getquestionByEmail);
questionRoutes.put('/:id', questioncontrollers_1.updateQuestion);
questionRoutes.delete('/:id', tokenizing_1.tokenize, questioncontrollers_1.deleteQuestion);
exports.default = questionRoutes;
