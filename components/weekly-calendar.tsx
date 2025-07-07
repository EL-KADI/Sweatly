"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WeeklyCalendar() {
  const { workoutPlan, completedDays, trainingGoal } = useStore()
  const router = useRouter()

  const getWorkoutForDay = (dayIndex: number) => {
    if (!workoutPlan || workoutPlan.length === 0) return null
    return workoutPlan[dayIndex % workoutPlan.length]
  }

  const isDayCompleted = (dayIndex: number) => {
    const today = new Date()
    const dayDate = new Date(today)
    dayDate.setDate(today.getDate() - today.getDay() + dayIndex + 1)
    return completedDays.some((date) => new Date(date).toDateString() === dayDate.toDateString())
  }

  const isToday = (dayIndex: number) => {
    const today = new Date()
    const currentDay = today.getDay()
    const mondayBasedDay = currentDay === 0 ? 6 : currentDay - 1
    return dayIndex === mondayBasedDay
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
        <CardDescription>Your personalized workout plan for this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {daysOfWeek.map((day, index) => {
            const workout = getWorkoutForDay(index)
            const completed = isDayCompleted(index)
            const today = isToday(index)

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  today
                    ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                    : completed
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : today ? (
                      <Play className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{day}</span>
                        {today && <Badge variant="secondary">Today</Badge>}
                      </div>
                      {workout && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {workout.name} • {workout.duration}s
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {today && !completed && (
                  <Button size="sm" onClick={() => router.push("/workout")} className="bg-blue-600 hover:bg-blue-700">
                    Start
                  </Button>
                )}
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
