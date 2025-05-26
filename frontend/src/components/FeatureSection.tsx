import { FeatureCard } from "./FeatureCard";

import {Clock,Users,Activity,Award,Zap,BarChart} from "lucide-react"

export const FeatureSection= ()=>{

    const features = [
    {
      icon: Clock,
      title: 'Real-Time Quizzing',
      description: 'Engage participants in real-time with live quiz sessions and immediate feedback.'
    },
    {
      icon: Users,
      title: 'Multiplayer Support',
      description: 'Host quizzes for multiple participants simultaneously with live leaderboards.'
    },
    {
      icon: Activity,
      title: 'Live Analytics',
      description: 'Track performance and engagement metrics as participants take the quiz.'
    },
    {
      icon: Award,
      title: 'Instant Results',
      description: 'Provide immediate scoring and detailed explanations for each question.'
    },
    {
      icon: Zap,
      title: 'Quick Setup',
      description: 'Create and deploy quizzes in minutes with our intuitive interface.'
    },
    {
      icon: BarChart,
      title: 'Detailed Reports',
      description: 'Generate comprehensive performance reports for individuals and groups.'
    }
  ];
    return(

        <section id="features" className="mt-12 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Powerful Features</h2>
      <p className="text-gray-300 mb-8 max-w-2xl">Our quiz platform comes packed with everything you need to create engaging, interactive quiz experiences.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>

    )
}