


import CrudService from "../business/crud.service";
import BaseDao, { BaseDaoImpl } from "../dao/base.dao";
import CrudDao from "../dao/crud.dao";
import {CrudDaoImpl, CrudServiceImpl } from "../interface/crud.interface";
import CrudApi, { CrudApiImpl } from "../presentation/api/crud.api";
import HelperUtil from "../util/helper.util";
import ExpressServer, { Server } from "./server/ExpressServer";

export let server:Server=new ExpressServer();



let baseDao:BaseDaoImpl=new BaseDao();
let crudDao:CrudDaoImpl=new CrudDao("crud",baseDao);
let crudService:CrudServiceImpl=new CrudService(crudDao);




export let crudApi:CrudApiImpl=new CrudApi(crudService,server);
export let helperUtil:HelperUtil=new HelperUtil();

