"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var v8_1 = __importDefault(require("v8"));
var fs_1 = __importDefault(require("fs"));
var Server = /** @class */ (function () {
    function Server() {
        this.port = process.env.PORT || 2000;
        this.mem = [];
        this.app = express_1.default();
        // this.leak();
        this.notleak();
        // this.createHeapSnapshot();
    }
    // leak() {
    // // let mem = []
    //    this.app.get('/doLeak', (req, res) => { 
    //         // ทุกครั้งที่เรียกเข้ามา จะสร้าง Object 1 หมื่นตัวใส่ Array จำลองการเกิด Memory Leak
    //         let date = new Date()
    //         for(let i = 0; i < 100000; i++){
    //             this.mem.push({
    //                 msg: `I'M CAUSE MEMORY LEAK!!: ${date}: ${this.mem.length}`
    //             })
    //        }
    //        this.createHeapSnapshot();
    //        return res.send(`current object in mem variable: ${this.mem.length}`)
    //    })
    // }
    Server.prototype.notleak = function () {
        var _this = this;
        this.app.get('/doLeak', function (req, res) {
            // ทุกครั้งที่เรียกเข้ามา จะสร้าง Object 1 หมื่นตัวใส่ Array จำลองการเกิด Memory Leak
            var mem = [];
            var date = new Date();
            for (var i = 0; i < 100000; i++) {
                mem.push({
                    msg: "I'M CAUSE MEMORY LEAK!!: " + date + ": " + mem.length
                });
            }
            _this.createHeapSnapshot();
            return res.send("current object in mem variable: " + mem.length);
        });
    };
    Server.prototype.createHeapSnapshot = function () {
        var snapshotStream = v8_1.default.getHeapSnapshot();
        var fileName = Date.now() + ".heapsnapshot";
        var fileStream = fs_1.default.createWriteStream(fileName);
        snapshotStream.pipe(fileStream);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("server is runnung on port", _this.port);
        });
    };
    return Server;
}());
var server = new Server;
server.start();
