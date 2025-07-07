"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { ExerciseCard } from "@/components/exercise-card"
import { CalorieEstimator } from "@/components/calorie-estimator"

export default function WorkoutPage() {
  const { workoutPlan, completeWorkout, addCaloriesBurned, userWeight } = useStore()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const router = useRouter()

  const currentExercise = workoutPlan[currentExerciseIndex]
  const totalExercises = workoutPlan.length
  const progressPercentage = (completedExercises.length / totalExercises) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleExerciseComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const handleExerciseComplete = () => {
    setIsActive(false)
    setCompletedExercises([...completedExercises, currentExerciseIndex])

    const calories = calculateCalories(currentExercise)
    addCaloriesBurned(calories)

    if (currentExerciseIndex < totalExercises - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
        setTimeLeft(workoutPlan[currentExerciseIndex + 1]?.duration || 30)
      }, 1000)
    } else {
      completeWorkout()
      router.push("/dashboard")
    }
  }

  const calculateCalories = (exercise: any) => {
    const met = exercise.met || 6
    const weight = userWeight || 70
    const timeInHours = (exercise.duration || 30) / 3600
    return Math.round(met * weight * timeInHours)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const skipExercise = () => {
    setIsActive(false)
    setCurrentExerciseIndex(currentExerciseIndex + 1)
    setTimeLeft(workoutPlan[currentExerciseIndex + 1]?.duration || 30)
  }

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>No Workout Plan</CardTitle>
            <CardDescription>Please select a training goal first</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Select Goal</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Workout</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Exercise {currentExerciseIndex + 1} of {totalExercises}
            </div>
          </div>
          <Progress value={progressPercentage} className="mb-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExerciseIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ExerciseCard exercise={currentExercise} />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-6xl font-bold text-blue-600">{timeLeft}</CardTitle>
                  <CardDescription>seconds remaining</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center space-x-4">
                  <Button onClick={toggleTimer} size="lg" className="bg-blue-600 hover:bg-blue-700">
                    {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button
                    onClick={skipExercise}
                    variant="outline"
                    size="lg"
                    disabled={currentExerciseIndex >= totalExercises - 1}
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Skip
                  </Button>
                  <Button
                    onClick={handleExerciseComplete}
                    variant="outline"
                    size="lg"
                    className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CalorieEstimator exercise={currentExercise} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {workoutPlan.map((exercise, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded ${
                          completedExercises.includes(index)
                            ? "bg-green-100 dark:bg-green-900"
                            : index === currentExerciseIndex
                              ? "bg-blue-100 dark:bg-blue-900"
                              : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <span className="text-sm">{exercise.name}</span>
                        {completedExercises.includes(index) && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
