import TimelineView from '@/components/TimelineView'

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Election Timeline
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Track important dates and milestones in the election process.
      </p>
      <TimelineView />
    </div>
  )
}
