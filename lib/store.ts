"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Exercise {
  name: string
  duration: number
  instructions: string
  met: number
  difficulty: string
  targetMuscles: string[]
  gif?: string
}

interface WorkoutHistory {
  date: string
  exercises: Exercise[]
  caloriesBurned: number
  duration: number
}

interface StoreState {
  trainingGoal: string | null
  workoutPlan: Exercise[]
  completedDays: string[]
  totalCaloriesBurned: number
  currentLevel: string
  userWeight: number | null
  musicEnabled: boolean
  notificationsEnabled: boolean
  workoutHistory: WorkoutHistory[]

  setTrainingGoal: (goal: string) => void
  generateWorkoutPlan: (goal: string) => void
  completeWorkout: () => void
  addCaloriesBurned: (calories: number) => void
  setUserWeight: (weight: number) => void
  setMusicEnabled: (enabled: boolean) => void
  setNotificationsEnabled: (enabled: boolean) => void
}

const workoutPlans = {
  "weight-loss": [
    {
      name: "Jumping Jacks",
      duration: 45,
      instructions: "Jump with feet apart while raising arms overhead",
      met: 8,
      difficulty: "Beginner",
      targetMuscles: ["Full Body", "Cardiovascular"],
    },
    {
      name: "High Knees",
      duration: 30,
      instructions: "Run in place bringing knees up to chest level",
      met: 8,
      difficulty: "Beginner",
      targetMuscles: ["Legs", "Core", "Cardiovascular"],
    },
    {
      name: "Burpees",
      duration: 30,
      instructions: "Squat, jump back to plank, push-up, jump forward, jump up",
      met: 10,
      difficulty: "Advanced",
      targetMuscles: ["Full Body", "Cardiovascular"],
    },
    {
      name: "Mountain Climbers",
      duration: 45,
      instructions: "In plank position, alternate bringing knees to chest",
      met: 8,
      difficulty: "Intermediate",
      targetMuscles: ["Core", "Arms", "Cardiovascular"],
    },
  ],
  "muscle-building": [
    {
      name: "Push-ups",
      duration: 60,
      instructions: "Lower chest to ground, push back up maintaining straight line",
      met: 6,
      difficulty: "Intermediate",
      targetMuscles: ["Chest", "Arms", "Core"],
    },
    {
      name: "Squats",
      duration: 60,
      instructions: "Lower hips back and down, keep chest up, push through heels",
      met: 5,
      difficulty: "Beginner",
      targetMuscles: ["Legs", "Glutes", "Core"],
    },
    {
      name: "Lunges",
      duration: 60,
      instructions: "Step forward, lower back knee toward ground, push back up",
      met: 6,
      difficulty: "Intermediate",
      targetMuscles: ["Legs", "Glutes", "Core"],
    },
    {
      name: "Plank",
      duration: 45,
      instructions: "Hold straight line from head to heels, engage core",
      met: 4,
      difficulty: "Intermediate",
      targetMuscles: ["Core", "Arms", "Back"],
    },
  ],
  flexibility: [
    {
      name: "Forward Fold",
      duration: 60,
      instructions: "Hinge at hips, reach toward toes, keep legs straight",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Hamstrings", "Back", "Calves"],
    },
    {
      name: "Cat-Cow Stretch",
      duration: 45,
      instructions: "Alternate between arching and rounding spine on hands and knees",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Spine", "Core", "Back"],
    },
    {
      name: "Hip Circles",
      duration: 30,
      instructions: "Stand and rotate hips in large circles",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Hips", "Core", "Lower Back"],
    },
    {
      name: "Shoulder Rolls",
      duration: 30,
      instructions: "Roll shoulders backward in slow, controlled circles",
      met: 2,
      difficulty: "Beginner",
      targetMuscles: ["Shoulders", "Upper Back", "Neck"],
    },
  ],
  "light-exercise": [
    {
      name: "Arm Circles",
      duration: 30,
      instructions: "Extend arms out, make small circles forward then backward",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Shoulders", "Arms"],
    },
    {
      name: "Marching in Place",
      duration: 60,
      instructions: "Lift knees alternately while standing in place",
      met: 4,
      difficulty: "Beginner",
      targetMuscles: ["Legs", "Core", "Cardiovascular"],
    },
    {
      name: "Wall Push-ups",
      duration: 45,
      instructions: "Stand arm length from wall, push against wall and back",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Chest", "Arms", "Core"],
    },
    {
      name: "Seated Twists",
      duration: 45,
      instructions: "Sit and rotate torso left and right with control",
      met: 3,
      difficulty: "Beginner",
      targetMuscles: ["Core", "Back", "Obliques"],
    },
  ],
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      trainingGoal: null,
      workoutPlan: [],
      completedDays: [],
      totalCaloriesBurned: 0,
      currentLevel: "Beginner",
      userWeight: 70,
      musicEnabled: false,
      notificationsEnabled: true,
      workoutHistory: [],

      setTrainingGoal: (goal) => set({ trainingGoal: goal }),

      generateWorkoutPlan: (goal) => {
        const plan = workoutPlans[goal as keyof typeof workoutPlans] || []
        set({ workoutPlan: plan })
      },

      completeWorkout: () => {
        const today = new Date().toISOString().split("T")[0]
        const { completedDays, workoutPlan } = get()

        if (!completedDays.includes(today)) {
          const newCompletedDays = [...completedDays, today]
          const newHistory: WorkoutHistory = {
            date: today,
            exercises: workoutPlan,
            caloriesBurned: 0,
            duration: workoutPlan.reduce((acc, ex) => acc + ex.duration, 0),
          }

          let newLevel = "Beginner"
          if (newCompletedDays.length >= 20) newLevel = "Expert"
          else if (newCompletedDays.length >= 10) newLevel = "Intermediate"
          else if (newCompletedDays.length >= 5) newLevel = "Advanced Beginner"

          set({
            completedDays: newCompletedDays,
            currentLevel: newLevel,
            workoutHistory: [...get().workoutHistory, newHistory],
          })
        }
      },

      addCaloriesBurned: (calories) => {
        set({ totalCaloriesBurned: get().totalCaloriesBurned + calories })
      },

      setUserWeight: (weight) => set({ userWeight: weight }),
      setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: "sweatly-storage",
    },
  ),
)
