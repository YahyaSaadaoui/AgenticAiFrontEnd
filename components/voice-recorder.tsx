"use client"
import { Button } from "@/components/ui/button"
import { Mic, Square } from "lucide-react"
import { useRef } from "react"
import { motion } from "framer-motion"

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
}

export function VoiceRecorder({ onRecordingComplete, isRecording, setIsRecording }: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" })
        onRecordingComplete(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={isRecording ? stopRecording : startRecording}
      className={`h-8 w-8 p-0 ${isRecording ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-white"}`}
    >
      {isRecording ? (
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
          <Square className="h-4 w-4 fill-current" />
        </motion.div>
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  )
}
