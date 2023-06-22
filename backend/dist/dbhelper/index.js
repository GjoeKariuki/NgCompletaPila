"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbControllerHelpers = void 0;
const config_1 = require("../config");
const mssql_1 = __importDefault(require("mssql"));
class DbControllerHelpers {
    static addsinpuTorequest(request, data = {}) {
        const keys = Object.keys(data);
        keys.map(keyname => {
            return request.input(keyname, data[keyname]);
        });
        return request;
    }
    static exec(storedprocedure, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = (yield DbControllerHelpers.pool).request();
            request = DbControllerHelpers.addsinpuTorequest(request, data);
            return yield request.execute(storedprocedure);
        });
    }
    static query(querystring) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield DbControllerHelpers.pool).request().query(querystring);
        });
    }
}
exports.DbControllerHelpers = DbControllerHelpers;
DbControllerHelpers.pool = mssql_1.default.connect(config_1.sqlConfig);
