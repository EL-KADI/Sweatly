"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useStore } from "@/lib/store"

const playlists = {
  calm: [
    { name: "Peaceful Meditation", duration: 180 },
    { name: "Gentle Stretching", duration: 240 },
    { name: "Relaxing Flow", duration: 200 },
  ],
  upbeat: [
    { name: "High Energy Workout", duration: 210 },
    { name: "Cardio Blast", duration: 190 },
    { name: "Power Training", duration: 220 },
  ],
}

export function MusicPlayer() {
  const { musicEnabled } = useStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState([70])
  const [currentTime, setCurrentTime] = useState(0)
  const [playlist, setPlaylist] = useState<"calm" | "upbeat">("upbeat")
  const audioRef = useRef<HTMLAudioElement>(null)

  const tracks = playlists[playlist]
  const currentSong = tracks[currentTrack]

  useEffect(() => {
    if (!musicEnabled) {
      setIsPlaying(false)
    }
  }, [musicEnabled])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    audio.addEventListener("timeupdate", updateTime)

    return () => audio.removeEventListener("timeupdate", updateTime)
  }, [])

  const togglePlayPause = () => {
    if (!musicEnabled) return
    setIsPlaying(!isPlaying)
  }

  const togglePlaylist = () => {
    setPlaylist(playlist === "calm" ? "upbeat" : "calm")
    setCurrentTrack(0)
    setCurrentTime(0)
  }

  if (!musicEnabled) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <Card className="w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Music className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{currentSong.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{playlist} playlist</p>
              </div>
              <Button variant="outline" size="sm" onClick={togglePlaylist} className="text-xs bg-transparent">
                {playlist === "calm" ? "🎵" : "⚡"}
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={togglePlayPause} className="w-10 h-10 p-0 bg-transparent">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <div className="flex-1">
                <Slider value={[currentTime]} max={currentSong.duration} step={1} className="w-full" />
              </div>

              <div className="flex items-center space-x-2">
                {volume[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-16" />
              </div>
            </div>
          </CardContent>
        </Card>

        <audio ref={audioRef} />
      </motion.div>
    </AnimatePresence>
  )
}
