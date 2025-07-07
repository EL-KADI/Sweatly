"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

const motivationalMessages = [
  "Time for today's workout! 💪",
  "Don't skip cardio today! 🏃‍♂️",
  "Your muscles are waiting for you! 🔥",
  "Consistency is key - let's go! ⚡",
  "Make today count! 🎯",
  "Your future self will thank you! 🌟",
]

export function NotificationSystem() {
  const { notificationsEnabled, completedDays } = useStore()

  useEffect(() => {
    if (!notificationsEnabled) return

    const showDailyReminder = () => {
      const today = new Date().toDateString()
      const hasWorkedOutToday = completedDays.some((date) => new Date(date).toDateString() === today)

      if (!hasWorkedOutToday) {
        const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

        toast({
          title: "Workout Reminder",
          description: randomMessage,
          duration: 5000,
        })
      }
    }

    const interval = setInterval(showDailyReminder, 3600000)

    setTimeout(showDailyReminder, 5000)

    return () => clearInterval(interval)
  }, [notificationsEnabled, completedDays])

  return null
}
