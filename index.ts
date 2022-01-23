import { server } from "./app/other/singeton";
import { userRoute } from "./app/presentation/routes/user.routes";


let startUp=async ()=>{
    await server.startServerAsync({port:8082});
    userRoute();
};
startUp();
