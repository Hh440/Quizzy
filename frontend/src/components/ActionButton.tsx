import { ArrowRight } from "lucide-react"
import { Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ActionButton= ()=>{

    const navigate = useNavigate()
    return(
        <div className="flex flex-col md:flex-row gap-4 mt-8">
      <button
       className="group flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
       onClick={()=>{navigate('/user')}}
       >
        <span>Take a Quiz</span>
        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <button 
      className="group flex items-center justify-center bg-transparent border border-gray-400 hover:border-white text-gray-200 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
      onClick={()=>{navigate('/admin')}}
      >
        <Settings size={20} className="mr-2" />
        <span>Admin Dashboard</span>
      </button>
    </div>
    )
}