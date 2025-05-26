import {FileText,Play,Users,CheckCircle} from "lucide-react"

export const HowItWorks= ()=>{

     const steps = [
    {
      icon: FileText,
      title: 'Create Quiz',
      description: 'Design your quiz with various question types, time limits, and scoring options.'
    },
    {
      icon: Users,
      title: 'Invite Participants',
      description: 'Share a unique link or code with participants to join your quiz session.'
    },
    {
      icon: Play,
      title: 'Start Session',
      description: 'Launch the quiz and watch as participants answer questions in real-time.'
    },
    {
      icon: CheckCircle,
      title: 'Review Results',
      description: 'Analyze performance data and share results with participants instantly.'
    }
  ];

    return(
        <section id="how-it-works" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">How It Works</h2>
      <p className="text-gray-300 mb-8 max-w-2xl">Get started with QuizMaster in just a few simple steps.</p>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-1 bg-blue-600/30 transform md:-translate-x-1/2"></div>
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center z-10 md:justify-center md:w-full">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white">
                    <Icon size={24} />
                  </div>
                  <div className="md:hidden ml-4 flex-grow">
                    <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                    <p className="text-gray-300 mt-1">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2 md:text-right md:pr-12">
                  {index % 2 === 0 && (
                    <>
                      <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                      <p className="text-gray-300 mt-1">{step.description}</p>
                    </>
                  )}
                </div>
                <div className="hidden md:block md:w-1/2 md:text-left md:pl-12">
                  {index % 2 === 1 && (
                    <>
                      <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                      <p className="text-gray-300 mt-1">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    )
}