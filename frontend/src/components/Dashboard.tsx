import { DashboardHeader } from "./DashboardHeader";
import { ActionButton } from "./ActionButton";
import { FeatureSection } from "./FeatureSection";
import { HowItWorks } from "./HowItWorks";

export const Dashboard = ()=>{
     return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#16325B] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <DashboardHeader/>
        
        <main className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
              Real-Time Interactive Quizzes
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create engaging quiz experiences with real-time feedback, detailed analytics, and interactive elements.
            </p>
            
            <div className="flex justify-center">
              <ActionButton />
            </div>
          </div>
          
          <FeatureSection />
          <HowItWorks />
        </main>
        
        <footer className="py-8 border-t border-white/10 mt-12 text-center text-gray-400">
          <p>© 2025 QuizMaster. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}