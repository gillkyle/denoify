#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var globProxy_1 = require("../tools/globProxy");
var modTsFile_1 = require("../lib/modTsFile");
var pathDepth_1 = require("../tools/pathDepth");
var moveContentUpOneLevel_1 = require("../tools/moveContentUpOneLevel");
var isInsideOrIsDir_1 = require("../tools/isInsideOrIsDir");
var exec_1 = require("../tools/exec");
var getIsDryRun_1 = require("../lib/getIsDryRun");
var crawl_1 = require("../tools/crawl");
var fs = require("fs");
var commentJson = require("comment-json");
/**
 * To disable dry run mode  DRY_RUN=1 env variable must be set.
 * This function Change change the working directory.
 * */
function run(params) {
    return __awaiter(this, void 0, void 0, function () {
        var isDryRun, exec, moveContentUpOneLevel, packageJsonParsed, packageJsonFilesResolved, _a, srcDirPath, denoDistPath, tsconfigOutDir, newPackageJsonRaw;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isDryRun = getIsDryRun_1.getIsDryRun().isDryRun;
                    exec = exec_1.execFactory({ isDryRun: isDryRun }).exec;
                    moveContentUpOneLevel = moveContentUpOneLevel_1.moveContentUpOneLevelFactory({ isDryRun: isDryRun }).moveContentUpOneLevel;
                    process.chdir(params.pathToTargetModule);
                    if (fs.existsSync(".npmignore")) {
                        throw new Error(".npmignore not supported, please use package.json 'files' instead");
                    }
                    packageJsonParsed = JSON.parse(fs.readFileSync("package.json")
                        .toString("utf8"));
                    return [4 /*yield*/, (function () {
                            var pathWithWildcards = packageJsonParsed
                                .files;
                            if (!pathWithWildcards) {
                                return undefined;
                            }
                            var globProxy = globProxy_1.globProxyFactory({ "cwdAndRood": "." }).globProxy;
                            var flat = [
                                function (prev, curr) { return __spread(prev, curr); },
                                []
                            ];
                            return Promise.all(pathWithWildcards
                                .map(function (pathWithWildcard) { return globProxy({ pathWithWildcard: pathWithWildcard }); })).then(function (arrOfArr) {
                                var _a;
                                return (_a = arrOfArr
                                    .reduce.apply(arrOfArr, __spread(flat)).map(function (fileOrDirPath) {
                                    return !fs.lstatSync(fileOrDirPath).isDirectory() ?
                                        [fileOrDirPath]
                                        :
                                            crawl_1.crawl(fileOrDirPath)
                                                .map(function (filePath) { return path.join(fileOrDirPath, filePath); });
                                })).reduce.apply(_a, __spread(flat));
                            });
                        })()];
                case 1:
                    packageJsonFilesResolved = _b.sent();
                    _a = fs.existsSync("./mod.ts") ?
                        modTsFile_1.modTsFile.parseMetadata({ "projectPath": "." })
                        :
                            {
                                "srcDirPath": "./src",
                                "denoDistPath": undefined,
                                "tsconfigOutDir": commentJson.parse(fs.readFileSync("./tsconfig.json")
                                    .toString("utf8"))["compilerOptions"]["outDir"]
                            }, srcDirPath = _a.srcDirPath, denoDistPath = _a.denoDistPath, tsconfigOutDir = _a.tsconfigOutDir;
                    if (pathDepth_1.pathDepth(tsconfigOutDir) != 1) {
                        throw new Error("tsconfig out dir must be a directory at the root of the project for this script to work");
                    }
                    if (!!packageJsonFilesResolved &&
                        packageJsonFilesResolved.find(function (fileOrDirPath) { return isInsideOrIsDir_1.isInsideOrIsDir({
                            "dirPath": srcDirPath,
                            fileOrDirPath: fileOrDirPath
                        }); })) {
                        throw new Error("Can't include file from " + srcDirPath + " in the NPM module");
                    }
                    return [4 /*yield*/, exec("rm -r " + srcDirPath)];
                case 2:
                    _b.sent();
                    if (!!!denoDistPath) return [3 /*break*/, 4];
                    return [4 /*yield*/, exec("rm -r " + denoDistPath)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, moveContentUpOneLevel({ "dirPath": tsconfigOutDir })];
                case 5:
                    _b.sent();
                    {
                        newPackageJsonRaw = JSON.stringify(__assign(__assign(__assign(__assign(__assign(__assign({}, packageJsonParsed), ("main" in packageJsonParsed ? {
                            "main": path.relative(tsconfigOutDir, packageJsonParsed.main)
                        } : {})), ("types" in packageJsonParsed ? {
                            "types": path.relative(tsconfigOutDir, packageJsonParsed.types)
                        } : {})), ("bin" in packageJsonParsed ? {
                            "bin": (function () {
                                var out = {};
                                Object.keys(packageJsonParsed.bin)
                                    .map(function (binName) { return [binName, packageJsonParsed.bin[binName]]; })
                                    .forEach(function (_a) {
                                    var _b = __read(_a, 2), binName = _b[0], binFilePath = _b[1];
                                    return out[binName] = path.relative(isInsideOrIsDir_1.isInsideOrIsDir({
                                        "dirPath": tsconfigOutDir,
                                        "fileOrDirPath": binFilePath
                                    }) ?
                                        tsconfigOutDir : ".", binFilePath);
                                });
                                return out;
                            })()
                        } : {})), (!!packageJsonFilesResolved ? {
                            "files": packageJsonFilesResolved
                                .map(function (fileOrDirPath) {
                                return path.relative(isInsideOrIsDir_1.isInsideOrIsDir({
                                    "dirPath": tsconfigOutDir,
                                    fileOrDirPath: fileOrDirPath
                                }) ?
                                    tsconfigOutDir : ".", // ./dist : .
                                fileOrDirPath // ./dist/lib
                                );
                            } // ./lib
                            )
                        } : {})), { "scripts": undefined }), null, 2);
                        console.log((isDryRun ? "(dry)" : "") + " package.json:\n" + newPackageJsonRaw);
                        if (!isDryRun) {
                            fs.writeFileSync("package.json", Buffer.from(newPackageJsonRaw, "utf8"));
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    process.once("unhandledRejection", function (error) { throw error; });
    run({ "pathToTargetModule": "." });
}
//# sourceMappingURL=enableShortNpmImportPath.js.map