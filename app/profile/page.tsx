"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { userWeight, setUserWeight } = useStore()
  const [tempWeight, setTempWeight] = useState(userWeight?.toString() || "70")

  const handleWeightSave = () => {
    const weight = Number.parseFloat(tempWeight)
    if (weight > 0 && weight < 500) {
      setUserWeight(weight)
      toast({
        title: "Weight Updated",
        description: `Your weight has been set to ${weight}kg`,
      })
    } else {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight between 1-500kg",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Update your personal information</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your weight for accurate calorie calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="weight"
                    type="number"
                    value={tempWeight}
                    onChange={(e) => setTempWeight(e.target.value)}
                    placeholder="Enter your weight"
                    min="1"
                    max="500"
                    className="flex-1"
                  />
                  <Button onClick={handleWeightSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current weight: {userWeight || 70}kg</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleString()}</p>
        </motion.div>
      </div>
    </div>
  )
}
