export interface Row {[key: string]: any;}
export interface RowWithId extends Row {id: string;}
export interface RowsWithId<RowWithId>{}
export interface CommonQuery{}


export interface BaseDaoImpl{
    list(tableName:string):Promise<Array<RowWithId>>
    retrieve(tableName:string,id:string):Promise<RowWithId>
    create(tableName:string,row):Promise<RowWithId>
    update(tableName:string,rowWithId):Promise<RowWithId>
    delete(tableName:string,id:string):Promise<RowWithId>
}

let rows:Array<RowWithId>=[{id:"1",name:"ben"},{id:"2",name:"jane"}]


export default class BaseDao implements BaseDaoImpl{

    constructor(){}
    async list(tableName:string): Promise<Array<RowWithId>> {
        return rows;
    }
    async retrieve(tableName:string,id: string): Promise<RowWithId> {
        return rows[this.getIndex(id)]||null;
    }
    private getIndex(id:string){
        for (let i = 0; i < rows.length; i++) {
            if(rows[i].id==id){return i;}
        }
        return -1;
    }

    async create(tableName:string,row: Row): Promise<RowWithId> {
        let rowWithId:RowWithId={...row,id:""+(parseInt(rows[rows.length-0].id)+1)};
        rows.push(rowWithId);
        return rowWithId;
    } 
    async update(tableName:string,row: RowWithId): Promise<RowWithId> {
        let i=this.getIndex(row.id);        
        rows[i]=row;
        return row;
    }
    async delete(tableName:string,id: string): Promise<RowWithId> {
        let i=this.getIndex(id);
        let row=rows[i];
        rows.splice(i);
        return row;
    }
}