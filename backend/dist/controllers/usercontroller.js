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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserecords = exports.updateUser = exports.getuserByemail = exports.getuserByid = exports.getallUsers = exports.registerUser = exports.signinUser = void 0;
const uuid_1 = require("uuid");
const validations_1 = require("../helpers/validations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbhelper_1 = require("../dbhelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uemail, upassword } = req.body;
        const { error } = validations_1.loginSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error.details[0].message);
        }
        let user = yield (yield dbhelper_1.DbControllerHelpers.exec('getUserbyEmail', { uemail })).recordset;
        if (!user[0]) {
            return res.status(404).json({ message: "user email not found" });
        }
        const validpwd = yield bcrypt_1.default.compare(upassword, user[0].upassword);
        //console.log(validpwd);
        if (!validpwd) {
            return res.status(404).json({ message: "passwords do not match" });
        }
        const payload = user.map(usr => {
            const { upassword, uisDeleted, uemailSent, uprofPic } = usr, rest = __rest(usr, ["upassword", "uisDeleted", "uemailSent", "uprofPic"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, { expiresIn: '3600s' });
        return res.status(200).json({ message: "login successful!!", token, role: user[0].urole, name: user[0].uname, email: user[0].uemail });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.signinUser = signinUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userid = (0, uuid_1.v4)();
        const { uname, uemail, upassword } = req.body;
        const { error } = validations_1.signupSchema.validate(req.body);
        if (error) {
            return res.status(422).json(error.details[0].message);
        }
        let hashpwd = yield bcrypt_1.default.hash(upassword, 10);
        yield dbhelper_1.DbControllerHelpers.exec('registerUser', { uid: userid, uname, uemail, upassword: hashpwd });
        return res.status(201).json({ message: "user successfully registered" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.registerUser = registerUser;
const getallUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield (yield dbhelper_1.DbControllerHelpers.exec('getUserecords')).recordset;
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getallUsers = getallUsers;
const getuserByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let user = yield (yield dbhelper_1.DbControllerHelpers.exec('getUserbyId', { uid: id })).recordset[0];
        if (user) {
            return res.status(200).json(user);
        }
        //console.log(user);
        return res.status(404).json({ message: "user not found. " });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getuserByid = getuserByid;
const getuserByemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uzeremail } = req.query;
        // console.log(uzeremail)
        let user = yield (yield dbhelper_1.DbControllerHelpers.query(`SELECT * FROM USERS WHERE uemail=${uzeremail}`)).recordset;
        // let user:iUSER = (await DbControllerHelpers.exec('getUserbyEmail', {uemail:email})).recordset[0]
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: "user not found. email is invalid" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getuserByemail = getuserByemail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let user = yield (yield dbhelper_1.DbControllerHelpers.exec('getUserbyId', { uid: id })).recordset;
        if (!user.length) {
            return res.status(404).json({ message: "user not found. the user id is invalid" });
        }
        const { uname, uemail, upassword, urole, uprofPic } = req.body;
        let hashpwd = yield bcrypt_1.default.hash(upassword, 10);
        yield dbhelper_1.DbControllerHelpers.exec('updateUserecords', { uid: id, uname, uemail, upassword: hashpwd, urole, uprofPic });
        return res.status(200).json({ message: "user records successfully updated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
//  only admin can delete
const deleteUserecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.info && req.info.urole === 'admin') {
            const { email } = req.params;
            let user = yield (yield dbhelper_1.DbControllerHelpers.exec('getUserbyEmail', { uemail: email })).recordset;
            if (!user.length) {
                return res.status(404).json({ message: "user not found. email is invalid" });
            }
            yield dbhelper_1.DbControllerHelpers.exec('deleteUserecords', { uemail: email });
            return res.status(200).json({ message: "user successfully deleted" });
        }
        else {
            return res.status(403).json({ message: "access is denied" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteUserecords = deleteUserecords;
