"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Dumbbell, Zap, Heart } from "lucide-react"
import { useStore } from "@/lib/store"

const goals = [
  {
    id: "weight-loss",
    title: "Weight Loss",
    description: "Burn calories and lose weight with cardio-focused workouts",
    icon: Zap,
    color: "bg-red-500",
  },
  {
    id: "muscle-building",
    title: "Muscle Building",
    description: "Build strength and muscle mass with resistance training",
    icon: Dumbbell,
    color: "bg-blue-500",
  },
  {
    id: "flexibility",
    title: "Flexibility",
    description: "Improve flexibility and mobility with stretching routines",
    icon: Heart,
    color: "bg-green-500",
  },
  {
    id: "light-exercise",
    title: "Light Exercise",
    description: "Gentle workouts for beginners and recovery days",
    icon: Target,
    color: "bg-purple-500",
  },
]

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const { setTrainingGoal, generateWorkoutPlan } = useStore()
  const router = useRouter()

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId)
    setTrainingGoal(goalId)
    generateWorkoutPlan(goalId)

    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Sweatly</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose your fitness goal and start your journey today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    selectedGoal === goal.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                  }`}
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${goal.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                      {goal.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {selectedGoal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-lg text-green-600 dark:text-green-400 font-semibold">
              Great choice! Generating your personalized workout plan...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
