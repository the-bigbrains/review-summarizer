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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var positive_1 = require("./positive");
var negative_1 = require("./negative");
var puppeteer = require("puppeteer");
function run(url) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, html, linkSelector, link, review_positive, review_negative;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 3:
                    _a.sent(); // go to url
                    return [4 /*yield*/, page.content()];
                case 4:
                    html = _a.sent();
                    linkSelector = 'a[data-hook="see-all-reviews-link-foot"]';
                    return [4 /*yield*/, page.evaluate(function (selector) {
                            var element = document.querySelector(selector);
                            return element ? element.href : null;
                        }, linkSelector)];
                case 5:
                    link = _a.sent();
                    if (!link) return [3 /*break*/, 7];
                    return [4 /*yield*/, page.goto(link)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    console.log("Link not found on the page.");
                    _a.label = 8;
                case 8: return [4 /*yield*/, (0, positive_1.positive)(page)];
                case 9:
                    review_positive = _a.sent();
                    return [4 /*yield*/, (0, negative_1.negative)(page)];
                case 10:
                    review_negative = _a.sent();
                    console.log("Negative Reviews: ", review_negative);
                    console.log("Positive Reviews: ", review_positive);
                    return [4 /*yield*/, browser.close()];
                case 11:
                    _a.sent(); // close browser
                    return [2 /*return*/];
            }
        });
    });
}
run("https://www.amazon.com/AmazonBasics-Pound-Neoprene-Dumbbells-Weights/dp/B01LR5S6HK/?_encoding=UTF8&pd_rd_w=VmDoS&content-id=amzn1.sym.64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_p=64be5821-f651-4b0b-8dd3-4f9b884f10e5&pf_rd_r=QNMAB4MPATAA66QTZK7F&pd_rd_wg=1Ac1s&pd_rd_r=d22f6dfb-23d5-405e-acf3-c5dffa629d45&ref_=pd_gw_crs_zg_bs_3375251&th=1");
