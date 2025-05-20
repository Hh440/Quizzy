import type { Socket } from "socket.io-client"


export const QuizControls= ({socket,roomId}:{socket:Socket,roomId:string})=>{
    return(
        <div>
            QuizControls
            <button onClick={()=>{

            socket.emit("next",{
                roomId,

            })

            }}>Next Problem</button>

        </div>
    )
}