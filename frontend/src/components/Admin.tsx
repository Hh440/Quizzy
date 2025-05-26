import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";
import {motion} from "framer-motion";


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

        <div className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black  to-[#16325B] ">
            <div className="flex flex-col items-center space-y-1 h-1/2 ">

                <input placeholder="Enter Room" type="text" onChange={(e)=>{
                setRoomId(e.target.value)
            }}  className="w-64 h-10 px-3  text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

            <br />

            <motion.button

            whileTap={{scale:0.85}}
            
            onClick={()=>{
                socket.emit("createQuiz",{
                    roomId
                })
                setQuizId(roomId)
                
                
                }}  className="mt-4 h-12 w-64 py-2 bg-[#686D76] text-white font-semibold rounded-md hover:bg-cyan-700 transition"> Create Room</motion.button>

            </div>
            
        </div>
    )

   }

   return(

   <div  className=" min-h-screen bg-gradient-to-r from-black  to-[#16325B]">

    <div className="flex flex-col justify-center items-center">

         <CreateProblem socket={socket} roomId={quizId}/>
        <QuizControls socket={socket} roomId={roomId}/>

    </div>

       


   </div>
   )
   
   
    

}