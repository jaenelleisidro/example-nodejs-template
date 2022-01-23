import { crudApi} from "../../other/singeton";

export let userRoute=async ()=>{
    let path="user";
    crudApi.initialize({path});
}


