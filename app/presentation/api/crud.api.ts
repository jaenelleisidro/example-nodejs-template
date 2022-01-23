import { Row, RowWithId } from "../../dao/base.dao";
import { CreateResult, CrudPresentationImpl, CrudServiceImpl, DeleteResult, ListResult, RetrieveResult, UpdateResult } from "../../interface/crud.interface";
import { Server } from "../../other/server/ExpressServer";

export interface CrudApiInitializeParam{path:string}
export interface CrudApiImpl extends CrudPresentationImpl{initialize(param:CrudApiInitializeParam)}


export default class CrudApi implements CrudApiImpl{
    constructor(private crudService:CrudServiceImpl,private server:Server){}
    async list():Promise<ListResult>{
        return await this.crudService.list();
    }
    async retrieve(id: string): Promise<RetrieveResult> {
        return await this.crudService.retrieve(id);
    }
    async create(row: Row):Promise<CreateResult>{
        return await this.crudService.create(row);
    }
    async update(row: RowWithId):Promise<UpdateResult>{
        return await this.crudService.update(row);
    }
    async delete(id:string):Promise<DeleteResult>{
        return await this.crudService.delete(id);
    }

    async initialize({path}:CrudApiInitializeParam){
        let {server}=this;
        let pathWithId=path+"/:id"
        server.get({path,callback:async ({locals,query,body})=>{
            let json=await this.list();
            return {json};
        }});
        server.get({path:pathWithId,callback:async ({locals,query,body,params})=>{
            params.id
            let json=await this.list();
            return {json};
        }});
        server.post({path,callback:async ({locals,query,body})=>{
            let row:Row=body;
            let json=await this.create(body);
            return {json};
        }});
        server.patch({path:pathWithId,callback:async ({locals,query,body,params})=>{
            let row:RowWithId={...body,id:params.id};
            let json=await this.update(row);
            return {json};
        }});
        server.delete({path:pathWithId,callback:async ({locals,query,body,params})=>{
            let row:RowWithId={...body,id:params.id};
            let json=await this.update(row);
            return {json};
        }});
        
    }
}

