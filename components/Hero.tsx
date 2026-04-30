import Link from 'next/link'
import { Vote, MessageCircle, Calendar, BarChart } from 'lucide-react'

export default function Hero() {
  const features = [
    { icon: MessageCircle, title: 'AI Chatbot', description: 'Get instant answers' },
    { icon: Vote, title: 'Take Quiz', description: 'Test your knowledge' },
    { icon: Calendar, title: 'Timeline', description: 'Track milestones' },
    { icon: BarChart, title: 'Data Insights', description: 'Visualize trends' },
  ]

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Guide to Democracy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Learn about elections, voting, and make informed decisions
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-primary-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
