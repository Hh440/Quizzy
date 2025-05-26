import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { LeaderBoard } from "./leaderboard/LeaderBoard"
import { Quiz } from "./Quiz"



export const User=()=>{

    const [name,setName]= useState("")
    const [submitted,setSubmitted]=useState(false)
    const [code ,setCode]= useState("")

    if(!submitted){
        return (
            <div>
                 <div className=" bg-gradient-to-r from-black  to-[#16325B] flex items-center justify-center h-screen">
                <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-2 text-white">
                        Enter the code to join
                    </h1>
                    <p className="text-white">It’s on the screen in front of you</p>
                </div>
                <div className="mb-8">
                    <input
                        className="text-center w-64 p-2 border-2 text-white  border-white rounded-lg shadow-sm focus:outline-none focus:border-white"
                        placeholder="1234 5678"
                        style={{ fontSize: "1rem" }}
                        type="text"
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                    />
                    <br /> <br />
                    <input
                        className="text-center text-white w-64 p-2 border-2 border-white rounded-lg shadow-sm focus:outline-none focus:border-white"
                        placeholder="Your name"
                        style={{ fontSize: "1rem" }}
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <button
                    className="bg-gray-500 text-white w-64 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
                    style={{ fontSize: "1rem" }}
                    onClick={() => {
                        setSubmitted(true);
                    }}
                >
                    Join
                </button>
                </div>
            </div>
            </div>
        )
    }

  return <UserLoggedin code={code} name={name}/>
}

export const UserLoggedin= ({name,code}:{name:any,code:any})=>{

    //const searchParamas= new URLSearchParams(document.location.search)
    const roomId= code
    const [socket,setSocket]= useState<null|Socket>(null)
    const [currentState,setCurrentState]= useState("not_started")
    const [currentQuestion,setCurrentQuestion]=useState<any>(null)
    const [leaderboardData,setLeaderBoardData]= useState([])
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
                setLeaderBoardData(state.leaderboard)
            }

            if(state.problem){
                setCurrentQuestion(state.problem)
            }

            setCurrentState(state.type)
            

        })

        socket.on("leaderboard",(data)=>{
            
            setCurrentState("leaderboard")
            setLeaderBoardData(data.leaderboard)
        })

        socket.on("problem",(data)=>{
            setCurrentState("question")
           setCurrentQuestion(data.problem)
        })

    },[])

    if(currentState==="not_started"){
        return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-xl text-gray-600">The quiz hasn't started yet</p>
        </div>
    );
    }

    if (currentState === "question") {
        return <Quiz roomId={roomId} userId={userId} problemId={currentQuestion.id} quizData={{
            title: currentQuestion.description,
            options: currentQuestion.options
        }} socket={socket} />
    }

    if(currentState==="leaderboard"){
        return (
    <LeaderBoard
        leaderboardData={(leaderboardData || []).map((x: any) => ({
            points: x.points,
            username: x.name,
            profilePicture: x.image
        }))}
    />
);
    }
    return <div>
        <br/>
        Quiz has ended
        {currentState}
    </div>
}