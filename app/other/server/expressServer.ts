
const http = require("http");
const https = require('https');
const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const fs = require('fs');


let s:(a: number, b: number) => number=(a,b)=>{
    return 1;
}

interface MethodResponse{
    json?:any
}
interface MethodParam{method?:string,path:string,callback(locals,body,query):Promise<MethodResponse>}

interface StartServerParam{port:number,staticFolder?:string,https?:{serverKeyPath:string,serverCrtPath:string,serverCaPath:string}}

export interface Server{
    startServerAsync(params:StartServerParam);
    get(param:MethodParam);
    post(param:MethodParam);
    put(param:MethodParam);
    patch(param:MethodParam);
    delete(param:MethodParam);
}

export default class ExpressServer implements Server{
    express:any;

    
    startServerAsync({port,staticFolder,https:httpsParam}:StartServerParam){
        let server=this.express=express();
        if(staticFolder){
            server.use(express.static(staticFolder));
        }
        server.use(fileUpload({createParentPath:true}));
        server.use(cors({origin:true,credentials:true}));
        let httpServer=null;
        if(httpsParam){
            server.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
                res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
                next();
            });
            let {serverCaPath,serverCrtPath,serverKeyPath}=httpsParam;
            let key  = fs.readFileSync(serverKeyPath, 'utf8');
            let cert = fs.readFileSync(serverCrtPath, 'utf8');
            let ca = fs.readFileSync(serverCaPath, 'utf8');
            httpServer = https.createServer({key, cert,ca},server);    
            console.log(httpsParam)
        }else{
            httpServer = http.createServer(server);
        }

        return new Promise(async (resolve,reject)=>{
            httpServer.listen(port, () => {
                console.log("App listening on port "+port+"!");
                resolve(true);
            });
        });
    }


    private wrapCallback(callback:any){
        return async (req,res)=>{
            try{
                let response:MethodResponse=await callback({locals:req.locals,body:req.body,query:req.query});
                if(response.json){
                    res.json({status:"success",data:response.json});
                }
            }catch(e){
                res.json({status:'failed',error:e.message});
                // res.send(500,"Internal Server Error");
                // res.send(401,e.message);
            }
        }
    }

    private allMethod({method,path,callback}:MethodParam){
        path="/"+path;
        console.log(method+":"+path);        
        this.express[method](path,this.wrapCallback(callback));
    }
    get(param:MethodParam){param.method="get";this.allMethod(param);}
    post(param:MethodParam){param.method="post";this.allMethod(param);}
    put(param:MethodParam){param.method="put";this.allMethod(param);}
    patch(param:MethodParam){param.method="patch";this.allMethod(param);}
    delete(param:MethodParam){param.method="delete";this.allMethod(param);}



}