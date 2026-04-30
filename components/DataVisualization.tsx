'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const voterTurnoutData = [
  { year: '2008', turnout: 62 },
  { year: '2012', turnout: 58 },
  { year: '2016', turnout: 60 },
  { year: '2020', turnout: 67 },
  { year: '2024', turnout: 65 },
]

const demographicData = [
  { name: '18-29', value: 20 },
  { name: '30-44', value: 25 },
  { name: '45-64', value: 35 },
  { name: '65+', value: 20 },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']

export default function DataVisualization() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Voter Turnout Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Voter Turnout by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={voterTurnoutData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="turnout" fill="#3b82f6" name="Turnout %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Demographics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Voter Demographics by Age</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={demographicData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {demographicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
