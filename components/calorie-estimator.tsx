"use client"

import { motion } from "framer-motion"
import { Flame, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"

interface Exercise {
  name: string
  duration: number
  met?: number
}

interface CalorieEstimatorProps {
  exercise: Exercise
}

export function CalorieEstimator({ exercise }: CalorieEstimatorProps) {
  const { userWeight } = useStore()

  const calculateCalories = () => {
    const met = exercise.met || 6
    const weight = userWeight || 70
    const timeInHours = exercise.duration / 3600
    return Math.round(met * weight * timeInHours)
  }

  const estimatedCalories = calculateCalories()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-orange-500" />
            Calorie Estimation
          </CardTitle>
          <CardDescription>Estimated calories burned for this exercise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">~{estimatedCalories}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">calories burned</p>

            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center justify-center">
                <Calculator className="w-3 h-3 mr-1" />
                Based on {userWeight || 70}kg body weight
              </div>
              <p>MET value: {exercise.met || 6}</p>
              <p>Duration: {exercise.duration}s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
