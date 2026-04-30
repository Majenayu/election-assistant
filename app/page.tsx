import Hero from '@/components/Hero'
import VoiceChatbot from '@/components/VoiceChatbot'
import DataVisualization from '@/components/DataVisualization'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ask Me Anything About Elections
          </h2>
          <VoiceChatbot />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Election Data & Insights
          </h2>
          <DataVisualization />
        </div>
      </section>
    </div>
  )
}
