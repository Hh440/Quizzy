import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";


 //const socket=io("https://localhost:3000")   

export const Admin= ()=>{

    const[socket,setSocket]= useState<null|any>(null)

    const [quizId,setQuizId]= useState("")

    const [roomId,setRoomId]= useState("")


    useEffect(()=>{

        const socket=io("http://localhost:3000") 
        setSocket(socket)



   // client-side
    socket.on("connect", () => {
        
   console.log(socket.id); 

   socket.emit("joinAdmin",{
       password:"ADMIN_PASSWORD"

   })
   });
   //socket.on("")



    },[])

   if(!quizId){
    return (

        <div>
            <input type="text" onChange={(e)=>{
                setRoomId(e.target.value)
            }}/>

            <br />

            <button onClick={()=>{
                socket.emit("createQuiz",{
                    roomId
                })
                setQuizId(roomId)
                
                
                }}> Create Room</button>
        </div>
    )

   }

   return(

   <div>

        <CreateProblem socket={socket} roomId={quizId}/>
        <QuizControls socket={socket} roomId={roomId}/>


   </div>
   )
   
   
    

}