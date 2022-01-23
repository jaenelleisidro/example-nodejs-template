import { BaseDaoImpl, Row, RowWithId } from "../dao/base.dao";


export interface CrudPresentationImpl extends CrudBaseImpl{}
export interface Result{row:Row}

export interface ListResult {rows:Array<Row>}
export interface RetrieveResult extends Result{}
export interface CreateResult extends Result{}
export interface UpdateResult extends Result{}
export interface DeleteResult extends Result{}

export interface CrudBaseImpl{
    list():Promise<ListResult>,
    retrieve(id:string):Promise<RetrieveResult>,
    create(row:Row):Promise<CreateResult>,
    update(row:RowWithId):Promise<UpdateResult>,
    delete(id:string):Promise<DeleteResult>
}

export interface CrudServiceImpl extends CrudBaseImpl{
}

export interface CrudDaoImpl extends CrudBaseImpl{}



