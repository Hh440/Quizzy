import { useState } from "react";
import type { Socket } from "socket.io-client";


export const CreateProblem = ({socket,roomId}:{socket:Socket;roomId:string})=>{
    const [title,setTitle]=useState("")
    const [description,setDescription]= useState("")
    const [answer,setAnswer]= useState(0)
    const [options,setOptions]=useState([{
        id:0,
        title:""
    },{
        id:1,
        title:""
    },{
        id:2,
        title:""
    },{
        id:3,
        title:""
    }])
    return(
        <div >
            <div className="flex flex-col items-center justify-center py-30 space-y-2">

                <h2 className="text-2xl font-bold">Create Problem</h2>
        

            <input type="text" placeholder="title" onChange={(e)=>{
                setTitle(e.target.value)
                
            }} className="w-64 h-10 px-3  text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"/>

            <br/>

            <input type="text" placeholder="Description"onChange={(e)=>{
                setDescription(e.target.value)
            }}  className="w-64 h-10 px-3  text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"/>

            <br/>

            {[0,1,2,3].map(optionId=> <div className="space-x-5 space-y-5">

                <input type="radio" checked={optionId===answer} onChange={()=>{
                    setAnswer(optionId)
                }}/>

                
                <input type="text" placeholder={`option ${optionId}`} className="w-64 h-10 px-3  text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black" onChange={(e)=>{
                setOptions(options=>options.map(x=>{
                    if(x.id===optionId){
                        return{
                            ...x,
                            title:e.target.value
                        }
                    }
                    return x;
                }))
            }}/>

            </div>
            
            )}


            <button    onClick={()=>{
                socket.emit("createProblem",{
                    roomId,
                    problem:{
                        title,
                        description,
                        options,
                        answer
                    }
                })
                
                
                
                }} className="text-white w-30  h-12 bg-emerald-700 rounded-md "> Add Problem</button>


              

            </div>

            


           

        </div>
    )

}