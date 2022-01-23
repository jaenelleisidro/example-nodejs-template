import { CreateResult, CrudDaoImpl, DeleteResult, ListResult, RetrieveResult, UpdateResult } from "../interface/crud.interface";
import BaseDao, {BaseDaoImpl, Row, RowWithId } from "./base.dao";


export default class CrudDao implements CrudDaoImpl{

    constructor(private tableName:string,private baseDao:BaseDaoImpl){

    }

    
     async list():Promise<ListResult>{
        let {tableName,baseDao}=this;
        let rows=await baseDao.list(tableName);
        return {rows};
    }
    async retrieve(id: string): Promise<RetrieveResult> {
        let {tableName,baseDao}=this;
        let row=await baseDao.retrieve(tableName,id);
        return {row};
    }
    async create(row: Row):Promise<CreateResult>{
        let {tableName,baseDao}=this;
        row=await baseDao.create(tableName,row);
        return {row};
    }

    async update(row: RowWithId):Promise<UpdateResult>{
        let {tableName,baseDao}=this;
        row=await baseDao.update(tableName,row);
        return {row};
    }
    async delete(id:string):Promise<DeleteResult>{
        throw new Error("unable to find id:"+id);
    }
}

