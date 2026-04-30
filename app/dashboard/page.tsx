import DataVisualization from '@/components/DataVisualization'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Election Dashboard
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Comprehensive view of election data, statistics, and trends.
      </p>
      <DataVisualization />
    </div>
  )
}
