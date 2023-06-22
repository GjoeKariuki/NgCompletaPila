"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagcontroller_1 = require("../controllers/tagcontroller");
const tagRoutes = (0, express_1.Router)();
tagRoutes.post('', tagcontroller_1.createTag);
tagRoutes.get('', tagcontroller_1.getallTags);
tagRoutes.get('/:id', tagcontroller_1.getagById);
exports.default = tagRoutes;
