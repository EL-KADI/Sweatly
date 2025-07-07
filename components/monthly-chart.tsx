"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export function MonthlyChart() {
  const { workoutHistory } = useStore()

  const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const currentYear = new Date().getFullYear()
    const monthlyData = months.map((month, index) => {
      const workoutsInMonth = workoutHistory.filter((workout) => {
        const workoutDate = new Date(workout.date)
        return workoutDate.getMonth() === index && workoutDate.getFullYear() === currentYear
      }).length

      return {
        month,
        workouts: workoutsInMonth,
        calories: workoutsInMonth * 250,
      }
    })

    return monthlyData
  }

  const data = generateMonthlyData()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>Your workout activity throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === "workouts" ? "Workouts" : "Calories"]} />
                <Bar dataKey="workouts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
