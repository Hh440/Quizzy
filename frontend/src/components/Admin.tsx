import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";
import {motion} from "framer-motion";
import { Plus } from 'lucide-react';


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

        <div className="min-h-screen bg-gradient-to-r from-black to-[#16325B] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Quiz Admin Dashboard</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Plus className="mr-2" size={24} />
              Create New Quiz Room
            </h2>
            
            <form  className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Room Name</label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter room name"
                  required
                />
              </div>
              
              
              
              <div className="flex items-center pt-4">
                <motion.button
                  type="submit"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
                   whileTap={{scale:0.85}}
            
            onClick={()=>{

                
                socket.emit("createQuiz",{
                    roomId
                   
                })
                setQuizId(roomId)
                
                
                }}
                >
                  Create Room
                  <Plus className="ml-2" size={20} />
                </motion.button>
              </div>
            </form>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Quick Tips</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Room Id can be mixture of number and alphabets
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Consider time zones when setting time limits
              </li>
              {/* <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                You can modify room settings after creation
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )

   }

   return(

   <div  className=" min-h-screen bg-gradient-to-r from-black  to-[#16325B]">

   <div className="flex flex-col lg:flex-row gap-8 items-start justify-center px-6 py-10">
  <CreateProblem socket={socket} roomId={roomId} />
  <QuizControls socket={socket} roomId={roomId} />
</div>


       


   </div>
   )
   
   
    

}