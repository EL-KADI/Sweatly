"use client"

import { motion } from "framer-motion"
import { Award, Star, Trophy, Target, Zap, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

const badges = [
  {
    id: "beginner",
    name: "Fit Starter",
    description: "Complete your first workout",
    icon: Target,
    requirement: 1,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    id: "consistent",
    name: "Consistency King",
    description: "Complete 5 workouts",
    icon: Star,
    requirement: 5,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    id: "dedicated",
    name: "Dedicated Athlete",
    description: "Complete 10 workouts",
    icon: Award,
    requirement: 10,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    id: "champion",
    name: "Fitness Champion",
    description: "Complete 20 workouts",
    icon: Trophy,
    requirement: 20,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    id: "legend",
    name: "Fitness Legend",
    description: "Complete 50 workouts",
    icon: Crown,
    requirement: 50,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  {
    id: "calorie-burner",
    name: "Calorie Crusher",
    description: "Burn 1000+ calories",
    icon: Zap,
    requirement: 1000,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
]

export function ProgressBadges() {
  const { workoutHistory, totalCaloriesBurned } = useStore()

  const totalWorkouts = workoutHistory.length

  const isBadgeEarned = (badge: any) => {
    if (badge.id === "calorie-burner") {
      return totalCaloriesBurned >= badge.requirement
    }
    return totalWorkouts >= badge.requirement
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Card>
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
          <CardDescription>Unlock badges as you progress on your fitness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon
              const earned = isBadgeEarned(badge)

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    earned
                      ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${earned ? "bg-yellow-200 dark:bg-yellow-800" : "bg-gray-200 dark:bg-gray-700"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${earned ? "text-yellow-800 dark:text-yellow-200" : "text-gray-500"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{badge.name}</h3>
                        {earned && <Badge className={badge.color}>Earned</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                    </div>
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
