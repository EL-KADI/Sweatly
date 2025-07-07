"use client"

import { motion } from "framer-motion"
import { Clock, Target, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Exercise {
  name: string
  duration: number
  instructions: string
  difficulty?: string
  targetMuscles?: string[]
  gif?: string
}

interface ExerciseCardProps {
  exercise: Exercise
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{exercise.name}</CardTitle>
            {exercise.difficulty && <Badge variant="outline">{exercise.difficulty}</Badge>}
          </div>
          <CardDescription className="flex items-center text-lg">
            <Clock className="w-5 h-5 mr-2" />
            {exercise.duration} seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <Info className="w-5 h-5 mr-2" />
              Instructions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{exercise.instructions}</p>
          </div>

          {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
            <div>
              <h3 className="flex items-center text-lg font-semibold mb-2">
                <Target className="w-5 h-5 mr-2" />
                Target Muscles
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.targetMuscles.map((muscle) => (
                  <Badge key={muscle} variant="secondary">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
