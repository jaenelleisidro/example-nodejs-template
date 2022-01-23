import { Row, RowWithId } from "../dao/base.dao";
import { CreateResult, CrudDaoImpl, CrudServiceImpl, DeleteResult, ListResult, RetrieveResult, UpdateResult } from "../interface/crud.interface";

export default class CrudService implements CrudServiceImpl{
    constructor(private crudDao:CrudDaoImpl){}
    async list():Promise<ListResult>{
        return await this.crudDao.list();
    }
    async retrieve(id: string): Promise<RetrieveResult> {
        return await this.crudDao.retrieve(id);
    }
    async create(row: Row):Promise<CreateResult>{
        return await this.crudDao.create(row);
    }
    async update(row: RowWithId):Promise<UpdateResult>{
        return await this.crudDao.update(row);
    }
    async delete(id:string):Promise<DeleteResult>{
        return await this.crudDao.delete(id);
    }
}