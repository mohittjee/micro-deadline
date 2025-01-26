import { useState, useEffect, useRef, useId } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AudioLines, Maximize2, Mic, Minimize2, PauseIcon, PlayIcon, Square, AudioWaveformIcon as WaveformIcon } from "lucide-react"
import { useTimer } from "@/hooks/useTimer"
import { formatTime } from "@/lib/time"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress"
import { createPortal } from "react-dom"

interface Task {
    id: number
    name: string
    duration: number // in milliseconds
    isPlaying: boolean
    startTime?: number
}

interface PiPWindowProps {
    activeTask: Task | null | undefined;
    progress: number;
    isRecording: boolean;
    micOn: boolean;
    onClose: () => void;
    onTogglePlay: () => void;
    onStop: () => void;
}

const PiPWindow: React.FC<PiPWindowProps> = ({
    activeTask,
    progress,
    isRecording,
    micOn,
    onClose,
    onTogglePlay,
    onStop
}) => {
    return (
        <div
            className="fixed bottom-5 right-5 w-80 h-30 bg-white shadow-lg rounded-lg p-2 z-50 flex flex-col"
        >
            {isRecording ? (
                <div className="flex flex-col gap-1 bg-[#22C55EE5] shadow-inset-hard rounded-lg flex-grow">
                    <div className="text-white text-sm font-semibold flex justify-between items-center py-2 px-2">
                        {"AI Volume"}
                    </div>
                    <div className="w-full flex flex-wrap justify-between items-center p-1 gap-1">
                        <div className="h-10 bg-white/20 rounded-lg flex-1">
                            <Progress
                                value={Math.min(progress, 100)}
                                className="h-full w-full bg-white rounded-lg transition-all duration-300"
                            />
                        </div>
                        <div className="bg-white text-[#22C55EE5] px-2.5 py-2.5 rounded-lg w-fit flex items-center">
                            <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-1 flex-grow">
                    {micOn ? (
                        <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
                            <div
                                className="w-16 h-16 rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
                                style={{
                                    backgroundImage: "url('/luna.png?height=48&width=48')",
                                }}
                            />
                            <span className="font-semibold text-sm text-white">
                                How's progress on your Task 1 going? Any challenges you'd like to take?
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold flex justify-between items-center px-2">
                                {activeTask?.name || "No Active Task"}
                                <Button
                                    variant="ghost"
                                    className="text-gray-400 bg-transparent"
                                    onClick={onClose}
                                >
                                    <Maximize2 className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="w-full flex flex-wrap justify-between items-center p-1 gap-1">
                                <div className="h-10 bg-gray-100 rounded-lg flex-1">
                                    <Progress
                                        value={Math.min(progress, 100)}
                                        className="h-full w-full rounded-lg transition-all duration-300"
                                    />
                                </div>
                                <div className="bg-gray-900 text-white px-2.5 py-2.5 rounded-lg w-fit flex items-center">
                                    <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-4 gap-1 items-center h-10 mt-2">
                <Button
                    variant="ghost"
                    className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isRecording ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
                >
                    <AudioLines className="h-6 w-6 shrink-0" />
                </Button>
                <Button
                    variant="ghost"
                    className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
                >
                    <Mic className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    className="text-gray-400 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
                    disabled={!activeTask}
                    onClick={onTogglePlay}
                >
                    {activeTask?.isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                </Button>
                <Button
                    variant="ghost"
                    className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A]"
                    onClick={onStop}
                    disabled={!activeTask}
                >
                    <Square className="h-6 w-6 fill-[#EF4444]" />
                </Button>

            </div>
        </div>
    );
};



export default function SessionTimer() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [micOn, setMicOn] = useState(false)
    // const [isPiP, setIsPiP] = useState(false)
    const timer = useTimer()
    const pipWindowRef = useRef<Window | null>(null)
    const id = useId();
    const [selectedValue, setSelectedValue] = useState("on");
    const [isPiP, setIsPiP] = useState(false);
    const pipContainerRef = useRef<HTMLDivElement | null>(null);

    const togglePiP = () => {
        setIsPiP(!isPiP);
    };

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
        <div className="min-h-full w-full flex flex-col justify-center">
            <div className="w-1/3 mx-auto space-y-2 flex-grow flex flex-col justify-center">
                {/* Active Task Card */}
                <Card className="bg-white gap-1 flex flex-col p-2">

                    {isRecording ? (
                        <div className="flex flex-col gap-1 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
                            <div className="text-white text-sm font-semibold flex justify-between items-center py-2 px-2">
                                {"AI Volume"}
                            </div>
                            {/* Progress Bar */}

                            <div className="w-full flex flex-wrap justify-between items-center p-1 gap-1">
                                <div className="h-10 bg-white/20 rounded-lg flex-1">
                                    <Progress value={Math.min(progress, 100)} className="h-full w-full bg-white rounded-lg transition-all duration-300" />
                                </div>

                                <div className="bg-white text-[#22C55EE5] px-2.5 py-2.5 rounded-lg w-fit flex items-center">
                                    <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {micOn ? (
                                <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
                                    <div
                                        className="w-16 h-16 rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
                                        style={{
                                            backgroundImage: "url('/luna.png?height=48&width=48')",
                                        }}
                                    />
                                    <span className="font-semibold text-sm text-white">How’s progress on your Task 1 going? Any challenges you’d like to take?</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-semibold flex justify-between items-center px-2">
                                        {activeTask?.name || "No Active Task"}
                                        <Button variant="ghost" className="text-gray-400 bg-transparent" onClick={togglePiP}>
                                            {isPiP ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
                                        </Button>
                                    </div>
                                    {/* Progress Bar */}

                                    <div className="w-full flex flex-wrap justify-between items-center p-1 gap-1">
                                        <div className="h-10 bg-gray-100 rounded-lg flex-1">
                                            <Progress
                                                value={Math.min(progress, 100)}
                                                className="h-full w-full  rounded-lg transition-all duration-300"
                                            />
                                        </div>

                                        <div className="bg-gray-900 text-white px-2.5 py-2.5 rounded-lg w-fit flex items-center">
                                            <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </>

                    )}








                    {/* buttons */}
                    {isRecording ? (
                        <div className="grid grid-cols-4 gap-1 items-center h-10">
                            <Button
                                variant="ghost"
                                className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isRecording ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
                                onClick={() => setIsRecording(!isRecording)}
                            >
                                <AudioLines className="h-6 w-6 shrink-0" />
                            </Button>
                            <div className="col-span-3 inline-flex h-9 rounded-lg bg-input/50 p-0.5 w-full">
                                <RadioGroup
                                    value={selectedValue}
                                    onValueChange={setSelectedValue}
                                    className="group relative inline-grid grid-cols-[1fr_1fr] w-full text-white items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-[#0EA5E9] after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
                                    data-state={selectedValue}
                                >
                                    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-muted-foreground/70">
                                        On
                                        <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
                                    </label>
                                    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=off]:text-muted-foreground/70">
                                        Off
                                        <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
                                    </label>
                                </RadioGroup>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-1 items-center h-10">
                            <Button
                                variant="ghost"
                                className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isRecording ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
                                onClick={() => setIsRecording(!isRecording)}
                            >
                                <AudioLines className="h-6 w-6 shrink-0" />
                            </Button>
                            <Button
                                variant="ghost"
                                className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
                                onClick={() => setMicOn(!micOn)}

                            >
                                <Mic className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-gray-400 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
                                disabled={!activeTask}
                                onClick={() => activeTaskId && handleTaskSelect(activeTaskId)}
                            >
                                {activeTask?.isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A] "
                                onClick={handleStop}
                                disabled={!activeTask}
                            >
                                <Square className="h-6 w-6 fill-[#EF4444]" />
                            </Button>
                        </div>
                    )}

                </Card>

                {isPiP && createPortal(
                    <PiPWindow
                        activeTask={activeTask}
                        progress={progress}
                        isRecording={isRecording}
                        micOn={micOn}
                        onClose={() => setIsPiP(false)}
                        onTogglePlay={() => activeTaskId && handleTaskSelect(activeTaskId)}
                        onStop={handleStop}
                    />,
                    document.body
                )}

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