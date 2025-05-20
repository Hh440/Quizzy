import type { Socket } from "socket.io-client"


export const QuizControls= ({socket,roomId}:{socket:Socket,roomId:string})=>{
    return(
        <div>
            QuizControls
            <button onClick={()=>{\

            socket.emit

            }}></button>

        </div>
    )
}