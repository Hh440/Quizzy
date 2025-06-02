
import { IoManager } from "./managers/IoManager"
import { UserManager } from "./managers/UserManager"




const io= IoManager.getIo()


const userManager=new UserManager()


io.on('connection',(socket)=>{
    userManager.addUser(socket)
    
})



const PORT = process.env.PORT || 3000;
io.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

