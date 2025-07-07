"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calendar, Flame, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"

export function StatsOverview() {
  const { completedDays, totalCaloriesBurned, workoutHistory, currentLevel } = useStore()

  const weeklyGoal = 7
  const weeklyProgress = (completedDays.length / weeklyGoal) * 100
  const averageWorkoutTime =
    workoutHistory.length > 0
      ? Math.round(workoutHistory.reduce((acc, workout) => acc + (workout.duration || 30), 0) / workoutHistory.length)
      : 0

  const stats = [
    {
      title: "Weekly Goal",
      value: `${completedDays.length}/${weeklyGoal}`,
      progress: weeklyProgress,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Total Calories",
      value: totalCaloriesBurned.toString(),
      subtitle: "burned this week",
      icon: Flame,
      color: "text-orange-600",
    },
    {
      title: "Average Time",
      value: `${averageWorkoutTime}min`,
      subtitle: "per workout",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Current Level",
      value: currentLevel,
      subtitle: "keep pushing!",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Your fitness overview at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</span>
                      <span className="text-lg font-bold">{stat.value}</span>
                    </div>
                    {stat.subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>}
                    {stat.progress !== undefined && <Progress value={stat.progress} className="mt-2" />}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
