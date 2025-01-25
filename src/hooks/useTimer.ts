import { useState, useEffect, useCallback } from "react"

export function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      setStartTime(Date.now() - time)
    }
  }, [isRunning, time])

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false)
      setStartTime(null)
    }
  }, [isRunning])

  const stop = useCallback(() => {
    setIsRunning(false)
    setTime(0)
    setStartTime(null)
  }, [])

  const toggle = useCallback(() => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }, [isRunning, start, pause])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRunning && startTime !== null) {
      intervalId = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, startTime])

  return {
    time,
    isRunning,
    start,
    pause,
    stop,
    toggle,
  }
}

