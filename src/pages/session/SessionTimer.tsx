import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AudioLines, Maximize2, Mic, Minimize2, PauseIcon, PlayIcon, Square, AudioWaveformIcon as WaveformIcon } from "lucide-react"
import { useTimer } from "@/hooks/useTimer"
import { formatTime } from "@/lib/time"

interface Task {
    id: number
    name: string
    duration: number // in milliseconds
    isPlaying: boolean
    startTime?: number
}


export default function SessionTimer() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [isPiP, setIsPiP] = useState(false)
    const timer = useTimer()
    const pipWindowRef = useRef<Window | null>(null)

    const togglePiP = () => {
        if (isPiP) {
            pipWindowRef.current?.close()
            setIsPiP(false)
            return
        }

        const pipWindow = window.open(
            '',
            'Task Timer PiP',
            'width=320,height=240,resizable=no,scrollbars=no,status=no'
        )

        if (pipWindow) {
            pipWindowRef.current = pipWindow
            setIsPiP(true)

            pipWindow.document.write(`
                <html>
                    <head>
                        <style>
                            body { 
                                font-family: sans-serif; 
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                                margin: 0;
                                background-color: white;
                            }
                            .task-name { 
                                font-size: 18px; 
                                margin-bottom: 10px; 
                            }
                            .timer { 
                                font-size: 24px; 
                                font-weight: bold; 
                            }
                            .controls {
                                margin-top: 10px;
                                display: flex;
                                gap: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="task-name"></div>
                        <div class="timer"></div>
                        <div class="controls">
                            <button id="cancelBtn">Close PiP</button>
                            <button id="mainBtn">Go to Main</button>
                        </div>
                    </body>
                </html>
            `)

            const updateContent = () => {
                if (!pipWindow.closed) {
                    const taskNameEl = pipWindow.document.querySelector('.task-name')
                    const timerEl = pipWindow.document.querySelector('.timer')

                    if (taskNameEl && timerEl) {
                        taskNameEl.textContent = activeTask?.name || "No active task"
                        timerEl.textContent = formatTime(activeTask?.duration || 0)
                    }
                }
            }

            const intervalId = setInterval(updateContent, 1000)

            const cancelBtn = pipWindow.document.getElementById('cancelBtn')
            const mainBtn = pipWindow.document.getElementById('mainBtn')

            cancelBtn?.addEventListener('click', () => {
                clearInterval(intervalId)
                pipWindow.close()
                setIsPiP(false)
            })

            mainBtn?.addEventListener('click', () => {
                window.focus()
                pipWindow.close()
                setIsPiP(false)
            })

            pipWindow.addEventListener('beforeunload', () => {
                clearInterval(intervalId)
                setIsPiP(false)
            })
        }
    }

    // Handle active task timer
    useEffect(() => {
        if (activeTaskId !== null && timer.isRunning) {
            const intervalId = setInterval(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task.id === activeTaskId ? { ...task, duration: task.duration + 10 } : task)),
                )
            }, 10)

            return () => clearInterval(intervalId)
        }
    }, [activeTaskId, timer.isRunning])

    const handleNewTask = () => {
        const newTask: Task = {
            id: Date.now(),
            name: `Task ${tasks.length + 1}`,
            duration: 0,
            isPlaying: false,
        }
        setTasks((prev) => [...prev, newTask])
    }

    const handleTaskSelect = (taskId: number) => {
        if (activeTaskId === taskId) {
            timer.toggle()
            setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, isPlaying: !task.isPlaying } : task)))
        } else {
            // Stop current task if any
            if (activeTaskId !== null) {
                setTasks((prev) => prev.map((task) => (task.id === activeTaskId ? { ...task, isPlaying: false } : task)))
                timer.pause()
            }

            // Start new task
            setActiveTaskId(taskId)
            timer.start()
            setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, isPlaying: true } : task)))
        }
    }

    const handleStop = () => {
        if (activeTaskId !== null) {
            setTasks((prev) => prev.map((task) => (task.id === activeTaskId ? { ...task, isPlaying: false } : task)))
            setActiveTaskId(null)
            timer.stop()
        }
    }

    const activeTask = activeTaskId !== null ? tasks.find((task) => task.id === activeTaskId) : null

    const progress = activeTask
        ? (activeTask.duration / (30 * 60 * 1000)) * 100 // 30 minutes as total
        : 0

    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="w-1/3 mx-auto space-y-4 flex-grow">
                {/* Active Task Card */}
                <Card className="bg-white">
                    {isRecording ? (
                        <div>hiiiiii</div>
                    ) : (
                        <CardHeader className="pb-2 ">
                            <CardTitle className="text-sm font-semibold flex justify-between">
                                {activeTask?.name || "No active task"}
                                <Button variant="ghost" size="icon" className="text-gray-400 bg-transparent" onClick={togglePiP}>
                                    {isPiP ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
                                </Button>
                            </CardTitle>
                        </CardHeader>
                    )}
                    <CardContent className="space-y-1 flex flex-col">
                        {/* Progress Bar */}
                        {isRecording ? (
                            <div>hiiiiii</div>
                        ) : (
                            <div className="w-full flex flex-wrap justify-between items-center p-1 gap-1">
                                <div className="h-10 bg-gray-100 rounded-lg flex-1">
                                    <div
                                        className="h-full w-full bg-[#0EA5E9] rounded-lg transition-all duration-300"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>
                                <div className="bg-gray-900 text-white px-2.5 py-2 rounded-lg w-fit">
                                    <span className="font-mono text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="grid grid-cols-4 gap-1 items-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isRecording ? "text-blue-500" : "text-gray-400"}`}
                                    onClick={() => setIsRecording(!isRecording)}
                                >
                                    <AudioLines className="h-6 w-6 shrink-0" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isRecording ? "text-blue-500" : "text-gray-400"}`}
                                >
                                    <Mic className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
                                    disabled={!activeTask}
                                    onClick={() => activeTaskId && handleTaskSelect(activeTaskId)}
                                >
                                    {activeTask?.isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                                </Button>
                                <div className="bg-red-50 py-2 px-7 rounded-lg flex justify-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
                                        onClick={handleStop}
                                        disabled={!activeTask}
                                    >
                                        <Square className="h-6 w-6 fill-[#EF4444]" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Tasks List Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">Today</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-1 bg-gray-50 rounded-lg">
                                <span className="text-gray-500 font-semibold text-sm py-3 px-3">{task.name}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-gray-500 py-2 bg-white px-2.5 rounded-lg">{formatTime(task.duration)}</span>
                                    <Button
                                        variant="ghost"
                                        className="text-gray-400 bg-white py-2 px-7"
                                        onClick={() => handleTaskSelect(task.id)}
                                    >
                                        {task.isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full bg-[#0EA5E9] hover:bg-sky-400 text-white py-6 mt-3" onClick={handleNewTask}>
                            New Task
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <footer className="mt-4 mb-6 text-center flex w-full items-center justify-center flex-col">
                <div className="flex gap-2 w-full items-center justify-center">
                    <Button
                        variant="ghost"
                        className="py-3 px-14 bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Leaderboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="py-3 px-14 bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Session History
                    </Button>
                    <Button
                        variant="ghost"
                        className="py-3 px-14 bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Profile
                    </Button>
                </div>
            </footer>
        </div>
    )
}

