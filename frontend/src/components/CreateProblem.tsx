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
        <div>

            <h2>Create Problem</h2>
        

            <input type="text" placeholder="title" onChange={(e)=>{
                setTitle(e.target.value)
            }}/>

            <br/>

            <input type="text" placeholder="Description"onChange={(e)=>{
                setDescription(e.target.value)
            }}/>

            <br/>

            {[0,1,2,3].map(optionId=> <div>

                <input type="radio" checked={optionId===answer} onChange={()=>{
                    setAnswer(optionId)
                }}/>

                option {optionId}
                <input type="text" onChange={(e)=>{
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
                
                
                
                }}> Add Problem</button>


              


           

        </div>
    )

}