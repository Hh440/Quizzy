import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { CurrentQuestion } from "./CurrentQuestion"
import { LeaderBoard } from "./leaderboard/LeaderBoard"



export const User=()=>{

    const [name,setName]= useState("")
    const [submitted,setSubmitted]=useState(false)

    if(!submitted){
        return (
            <div>
               Name -  <input type="text" placeholder="name" onChange={(e)=>{
                setName(e.target.value)
               }}/>

               <button onClick={()=>{
                setSubmitted(true)
               }}>Submit</button>
            </div>
        )
    }

  return <UserLoggedin name={name}/>
}

export const UserLoggedin= ({name}:{name:any})=>{

    const searchParamas= new URLSearchParams(document.location.search)
    const roomId= searchParamas.get("roomId")
    const [socket,setSocket]= useState<null|Socket>(null)
    const [currentState,setCurrentState]= useState("not_started")
    const [currentQuestion,setCurrentQuestion]=useState(null)
    const [leaderboard,setLeaderBoard]= useState([])
    const [userId,setUserId]= useState("")


    useEffect(()=>{
        const socket= io("http://localhost:3000")
        setSocket(socket)

        socket.on("connect",()=>{

            console.log(socket.id)

            socket.emit("join",{
                roomId,
                name
                
            })

        })

        socket.on("init",({userId,state})=>{
            
            setUserId(userId)

            if(state.leaderboard){
                setLeaderBoard(state.leaderboard)
            }

            if(state.problem){
                setCurrentQuestion(state.problem)
            }

            setCurrentState(state.type)
            

        })

        socket.on("leaderboard",(data)=>{
            
            setCurrentState("leaderboard")
            setLeaderBoard(data.leaderboard)
        })

        socket.on("problem",(data)=>{
            setCurrentState("question")
           setCurrentQuestion(data.problem)
        })

    },[])

    if(currentState==="not_Started"){
        <div>
            The quiz hasn't started yet
        </div>
    }

    if(currentState==="question"){
        return <CurrentQuestion question={currentQuestion}/>
    }

    if(currentState==="leaderboard"){
        return <LeaderBoard leaderboard={leaderboard.map((x:any)=>({
            points:x.points,
            username:x.name,
            image:x.image


        }))}/>
    }
    return <div>
        <br/>
        Quiz has ended
        {currentState}
    </div>
}