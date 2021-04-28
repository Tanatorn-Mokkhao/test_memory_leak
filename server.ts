import express from "express";
import v8 from "v8";
import fs from "fs";


type test = {
    msg: String;
}


class Server {
    public app: express.Application;
    private port = process.env.PORT || 2000;
    private mem: Array<test> = [];
    constructor() {
        this.app = express();
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
    notleak() {
               this.app.get('/doLeak', (req, res) => { 
                    // ทุกครั้งที่เรียกเข้ามา จะสร้าง Object 1 หมื่นตัวใส่ Array จำลองการเกิด Memory Leak
                    let mem = []
                    let date = new Date()
                    for(let i = 0; i < 100000; i++){
                        mem.push({
                            msg: `I'M CAUSE MEMORY LEAK!!: ${date}: ${mem.length}`
                        })
                   }
                   this.createHeapSnapshot();
                   return res.send(`current object in mem variable: ${mem.length}`)
               })
    }
     createHeapSnapshot() {
        const snapshotStream = v8.getHeapSnapshot();
        const fileName = `${Date.now()}.heapsnapshot`;
        const fileStream = fs.createWriteStream(fileName);
        snapshotStream.pipe(fileStream);
      }
    start() {
        this.app.listen(this.port, () => {
            console.log("server is runnung on port", this.port);
        })
    }
}

const server = new Server;
server.start();
