import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { NotificationSystem } from "@/components/notification-system"
import { MusicPlayer } from "@/components/music-player"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sweatly",
  description: "Achieve your fitness goals with personalized workout plans, progress tracking, and motivation.",
  keywords: "fitness, workout, exercise, health, training, calories, progress tracking",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="sweatly-theme">
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <NotificationSystem />
          <MusicPlayer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
