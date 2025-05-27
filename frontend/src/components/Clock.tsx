import { useEffect, useRef, useState } from "react"


export const Clock=({duration=30})=>{

    const [timeLeft,setTimeLeft]= useState(duration)
    const timerRef=useRef<number|null>(null)


    useEffect(()=>{

        if(timeLeft<0) return;


        timerRef.current= setInterval(()=>{
            setTimeLeft((prev)=>prev-1)
        },1000)

        return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };


    },[timeLeft])


    useEffect(()=>{

        if (timeLeft < 0 && timerRef.current !== null) {
      clearInterval(timerRef.current);
  }

    },[timeLeft])

    return(
        <div className="flex flex-col items-center justify-center  min-h-screen">
      <div className="relative w-40 h-20">
        <svg height="120" width="120">
          <circle
            stroke="#333"
            fill="transparent"
            strokeWidth="6"
            r="48"
            cx="60"
            cy="60"
          />
          <circle
            stroke="#00FFAA"
            fill="transparent"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 48}
            strokeDashoffset={(2 * Math.PI * 48 * timeLeft) / duration}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
            r="48"
            cx="60"
            cy="60"
          />
        </svg>
        <div className="absolute inset-0 flex mr-9 mt-9 items-center justify-center text-white text-2xl font-semibold">
          {timeLeft >= 0 ? `${timeLeft}s` : "Time's Up!"}
        </div>
      </div>
    </div>
    )


}