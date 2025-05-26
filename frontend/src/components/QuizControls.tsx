import type { Socket } from "socket.io-client"


export const QuizControls= ({socket,roomId}:{socket:Socket,roomId:string})=>{
    return(
        <div>
            <div className="flex flex-col space-y-5">

            <h2 className="text-3xl font-bold text-white">Quiz Controls</h2>


            <button onClick={()=>{

            socket.emit("next",{
                roomId,

            })

            }}

            className="mt-4 h-12 w-64 py-2 bg-[#686D76] text-white font-semibold rounded-md hover:bg-cyan-700 transition"
            
            
            >Next Problem</button>
            </div>


        </div>
    )
}