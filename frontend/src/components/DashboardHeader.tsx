import {Brain} from 'lucide-react'

export const DashboardHeader = ()=>{

    return(
    <header className="w-full py-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain size={32} className="text-white" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">Quizzy</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-300">Live</span>
          </div>
        </div>
      </div>
    </header>
    )
}