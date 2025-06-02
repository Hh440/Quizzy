import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { LeaderBoard } from "./leaderboard/LeaderBoard"
import { Quiz } from "./Quiz"
import { Users, ArrowRight, Brain, Lightbulb, Target, Clock, Trophy, Shield } from 'lucide-react';



export const User=()=>{

    const [name,setName]= useState("")
    const [submitted,setSubmitted]=useState(false)
    const [code ,setCode]= useState("")

    if(!submitted){
        return (
           <div className="min-h-screen bg-gradient-to-r from-black to-[#16325B] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
              Join Interactive Quiz Room
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience real-time quizzing with instant feedback and compete with participants worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Users className="mr-2" size={24} />
                  Enter Room Details
                </h2>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span className="text-sm text-gray-300">Live Quizzing</span>
                </div>
              </div>
              
              <form  className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Room ID</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter room ID"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 group"
                  onClick={() => {
                        setSubmitted(true);
                    }}
                  >
                    Join Quiz Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Real-time Results</span>
                  </div>
                  <div className="flex items-center">
                    <Shield size={16} className="mr-1" />
                    <span>Secure Room</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy size={16} className="mr-1" />
                    <span>Live Rankings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Brain className="text-blue-400" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Test Your Knowledge</h3>
                    <p className="text-sm text-gray-400">Join 10,000+ daily participants</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Challenge yourself with expertly crafted questions and compete in real-time with participants worldwide.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Lightbulb className="text-blue-400" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Learn Interactively</h3>
                    <p className="text-sm text-gray-400">Instant feedback & explanations</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Get immediate feedback on your answers with detailed explanations and track your progress in real-time.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/15 border border-white/5">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Target className="text-blue-400" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Compete & Excel</h3>
                    <p className="text-sm text-gray-400">Live leaderboards & rankings</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Watch your rank update in real-time as you answer questions. Compete for the top spot on global leaderboards.
                </p>
              </div>
            </div>
          </div>
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
        const socket= io("https://quizzy-vxmc.onrender.com")
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


    console.log("current Question",currentQuestion)

    if(currentState==="not_started"){
        return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-xl text-gray-600">The quiz hasn't started yet</p>
        </div>
    );
    }

    if (currentState === "question") {
        return <Quiz roomId={roomId} userId={userId} time={currentQuestion.time} problemId={currentQuestion.id} quizData={{
            title: currentQuestion.description,
            options: currentQuestion.options,
            
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
    return <div className="flex justify-center items-center bg-gradient-to-r from-black  to-[#16325B]">
        <br/>
        Quiz has ended
        {currentState}
    </div>
}
