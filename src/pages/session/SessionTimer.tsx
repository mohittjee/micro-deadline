// import { useState, useEffect, useRef, useId, useCallback } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { AudioLines, Maximize2, Mic, Minimize2, PauseIcon, PlayIcon, Square } from "lucide-react"
// import { useTimer } from "@/hooks/useTimer"
// import { formatTime } from "@/lib/time"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Progress } from "@/components/ui/progress"
// import { createPortal } from "react-dom"
// import { createRoot } from "react-dom/client"
// import { Slider } from "@/components/ui/slider"
// import { Mic1, PlayPause } from "@/components/ui/SVGs"

// interface Task {
//     id: number
//     name: string
//     duration: number // in milliseconds
//     isPlaying: boolean
//     startTime?: number
// }

// interface PiPWindowProps {
//     activeTask: Task | null | undefined
//     progress: number
//     isAIVolume: boolean
//     micOn: boolean
//     onClose: () => void
//     onTogglePlay: () => void
//     onStop: () => void
//     onToggleRecording: () => void
//     onToggleMic: () => void
//     selectedValue: string
//     onValueChange: (value: string) => void
//     id: string
// }

// const PiPWindow: React.FC<PiPWindowProps> = ({
//     activeTask,
//     progress,
//     isAIVolume,
//     micOn,
//     onClose,
//     onTogglePlay,
//     onStop,
//     onToggleRecording,
//     onToggleMic,
//     selectedValue,
//     onValueChange,
//     id,
// }) => {
//     const [value, setValue] = useState([25])

//     return (
//         <div className="p-2">
//             {isAIVolume ? (
//                 <div className="flex flex-col bg-[#22C55EE5] shadow-inset-hard rounded-lg p-1">
//                     <div className="h-10 text-white text-sm font-semibold flex justify-between items-center px-2">
//                         {"AI Volume"}
//                     </div>
//                     <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
//                         <div className="h-full bg-white/20 rounded-lg flex-1">
//                             {/* <Progress
//                                         value={Math.min(progress, 100)}
//                                         className="h-full w-full bg-white rounded-lg transition-all duration-300"
//                                     /> */}
//                             <Slider
//                                 className="h-10 p-1 rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-gray-400 [&>:last-child>span]:ring-offset-0"
//                                 value={value}
//                                 onValueChange={setValue}
//                                 aria-label="Slider with output"
//                                 trackClassName="h-full rounded-md bg-transparent"
//                                 rangeClassName="bg-white"
//                             />
//                             {/* <output className="bg-[#0EA5E9] flex justify-center items-center rounded-md font-semibold px-3 py-2 h-10 text-sm text-white w-[52px] tabular-nums">{value[0]}</output> */}

//                         </div>
//                         <div className="bg-white text-[#22C55EE5] justify-center w-[52px] py-2.5 rounded-lg flex items-center">
//                             <span className="text-sm font-semibold">{value[0]}</span>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     {micOn ? (
//                         <div className="flex flex-col gap-2">
//                             <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
//                                 {activeTask?.name || "Start New Session"}
//                                 <Button variant="ghost" className="h-full text-gray-400 bg-transparent" onClick={onClose}>
//                                     <Maximize2 className="h-5 w-5" />
//                                 </Button>
//                             </div>

//                             <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
//                                 <div
//                                     className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
//                                     style={{
//                                         backgroundImage: "url('/Luna.png')",
//                                     }}
//                                 />
//                                 <p className="font-semibold text-sm/[18px] tracking-[-0.02em] text-white">
//                                     Hey there! You’re doing an amazing job sticking to your session. Remember, every little bit of effort you put in adds up to something bigger.
//                                 </p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex flex-col gap-2">
//                             <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
//                                 {activeTask?.name || "Start New Session"}
//                                 <Button variant="ghost" className="text-gray-400 bg-transparent" onClick={onClose}>
//                                     <Maximize2 className="h-5 w-5" />
//                                 </Button>
//                             </div>
//                             <div className="w-full flex flex-wrap justify-between items-center gap-1">
//                                 <div className="h-10 bg-gray-100 rounded-lg flex-1">
//                                     {/* <Progress
//                                                 value={Math.min(progress, 100)}
//                                                 className="h-full w-full  rounded-lg transition-all duration-300"
//                                             /> */}
//                                     <Slider
//                                         className="h-10 py-1 px-1.5 bg-[#F8F8F8] rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-[#E5E5E5] [&>:last-child>span]:ring-offset-0"
//                                         value={value}
//                                         onValueChange={setValue}
//                                         trackClassName="h-full rounded-md bg-[#F8F8F8]"
//                                         rangeClassName="bg-[#E5E5E5]"
//                                     />
//                                 </div>
//                                 <div className="bg-[#F8F8F8] text-[#A3A3A3] w-[74px] px-2.5 py-2.5 rounded-lg flex items-center">
//                                     <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
//                                     {/* <output className="bg-[#0EA5E9] flex justify-center items-center rounded-md font-semibold px-3 py-2 h-10 text-sm text-white w-[52px] tabular-nums">{value[0]}</output> */}

//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* buttons */}
//             {isAIVolume ? (
//                 <div className="grid grid-cols-5 gap-1 items-center h-10">
//                     <Button
//                         variant="ghost"
//                         className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-[#A3A3A3]"}`}
//                         onClick={onToggleRecording}
//                     >
//                         <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />
//                     </Button>
//                     <div className="col-span-4 inline-flex h-9 rounded-lg bg-input/50 p-0.5 w-full">
//                         <RadioGroup
//                             value={selectedValue}
//                             onValueChange={onValueChange}
//                             className="group relative inline-grid grid-cols-[1fr_1fr] w-full text-white items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-[#0EA5E9] after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
//                             data-state={selectedValue}
//                         >
//                             <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-muted-foreground/70">
//                                 On
//                                 <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
//                             </label>
//                             <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=off]:text-muted-foreground/70">
//                                 Off
//                                 <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
//                             </label>
//                         </RadioGroup>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-5 gap-1 items-center h-10">
//                     <Button
//                         variant="ghost"
//                         className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                         onClick={onToggleRecording}
//                     >
//                         <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                         onClick={onToggleMic}
//                     >
//                         <Mic1 />
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#0EA5E9] bg-[#0EA5E91A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                     // onClick={() => setMicOn(!micOn)}
//                     >
//                         Timer
//                     </Button>

//                     <Button
//                         variant="ghost"
//                         className="text-gray-400 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
//                         disabled={!activeTask}
//                         onClick={onTogglePlay}
//                     >
//                         {activeTask?.isPlaying ? <PlayPause /> : <PlayPause />}
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A] "
//                         onClick={onStop}
//                         disabled={!activeTask}
//                     >
//                         <Square className="h-5 w-5 fill-[#EF4444]" />
//                     </Button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default function SessionTimer() {
//     const [tasks, setTasks] = useState<Task[]>([])
//     const [activeTaskId, setActiveTaskId] = useState<number | null>(null)
//     const [isAIVolume, setIsAIVolume] = useState(false)
//     const [micOn, setMicOn] = useState(false)
//     const timer = useTimer()
//     const id = useId()
//     const [selectedValue, setSelectedValue] = useState("on")
//     const [pipActive, setPipActive] = useState(false)
//     const canvasRef = useRef<HTMLCanvasElement>(null)
//     const videoRef = useRef<HTMLVideoElement>(null)
//     const [value, setValue] = useState([25])




//     // Handle active task timer
//     useEffect(() => {
//         if (activeTaskId !== null && timer.isRunning) {
//             const intervalId = setInterval(() => {
//                 setTasks((prevTasks) =>
//                     prevTasks.map((task) => (task.id === activeTaskId ? { ...task, duration: task.duration + 10 } : task)),
//                 )
//             }, 10)

//             return () => clearInterval(intervalId)
//         }
//     }, [activeTaskId, timer.isRunning])

//     const handleNewTask = () => {
//         const newTask: Task = {
//             id: Date.now(),
//             name: `Task ${tasks.length + 1}`,
//             duration: 0,
//             isPlaying: false,
//         }
//         setTasks((prev) => [...prev, newTask])
//     }

//     const handleTaskSelect = (taskId: number) => {
//         if (activeTaskId === taskId) {
//             timer.toggle()
//             setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, isPlaying: !task.isPlaying } : task)))
//         } else {
//             // Stop current task if any
//             if (activeTaskId !== null) {
//                 setTasks((prev) => prev.map((task) => (task.id === activeTaskId ? { ...task, isPlaying: false } : task)))
//                 timer.pause()
//             }

//             // Start new task
//             setActiveTaskId(taskId)
//             timer.start()
//             setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, isPlaying: true } : task)))
//         }
//     }

//     const handleStop = () => {
//         if (activeTaskId !== null) {
//             setTasks((prev) => prev.map((task) => (task.id === activeTaskId ? { ...task, isPlaying: false } : task)))
//             setActiveTaskId(null)
//             timer.stop()
//         }
//     }

//     const activeTask = activeTaskId !== null ? tasks.find((task) => task.id === activeTaskId) : null

//     const progress = activeTask
//         ? (activeTask.duration / (30 * 60 * 1000)) * 100 // 30 minutes as total
//         : 0

//     const togglePiP = useCallback(async () => {
//         if (pipActive) {
//             if (document.pictureInPictureElement) {
//                 await document.exitPictureInPicture()
//             }
//             setPipActive(false)
//         } else {
//             if ("documentPictureInPicture" in window) {
//                 try {
//                     const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
//                         width: 424,
//                         height: 200,
//                     })

//                     // Copy styles to PiP window
//                     const styles = Array.from(document.styleSheets).map((styleSheet) => {
//                         try {
//                             return Array.from(styleSheet.cssRules)
//                                 .map((rule) => rule.cssText)
//                                 .join("")
//                         } catch (e) {
//                             const link = document.createElement("link")
//                             link.rel = "stylesheet"
//                             link.type = styleSheet.type
//                             link.media = styleSheet.media
//                             link.href = styleSheet.href
//                             return link
//                         }
//                     })

//                     styles.forEach((style) => {
//                         if (typeof style === "string") {
//                             const styleElement = pipWindow.document.createElement("style")
//                             styleElement.textContent = style
//                             pipWindow.document.head.appendChild(styleElement)
//                         } else if (style instanceof HTMLLinkElement) {
//                             pipWindow.document.head.appendChild(style.cloneNode())
//                         }
//                     })

//                     // Create a root element for React
//                     const root = pipWindow.document.createElement("div")
//                     pipWindow.document.body.appendChild(root)

//                     // Render the PiP content
//                     const pipRoot = createRoot(root)
//                     pipRoot.render(
//                         <PiPWindow
//                             activeTask={activeTask}
//                             progress={progress}
//                             isAIVolume={isAIVolume}
//                             micOn={micOn}
//                             onClose={() => {
//                                 pipWindow.close()
//                                 setPipActive(false)
//                             }}
//                             onTogglePlay={() => activeTaskId && handleTaskSelect(activeTaskId)}
//                             onStop={handleStop}
//                             onToggleRecording={() => setIsAIVolume(!isAIVolume)}
//                             onToggleMic={() => setMicOn(!micOn)}
//                             selectedValue={selectedValue}
//                             onValueChange={setSelectedValue}
//                             id={id}
//                         />,
//                     )

//                     pipWindow.addEventListener("pagehide", () => {
//                         pipRoot.unmount()
//                         setPipActive(false)
//                     })

//                     setPipActive(true)
//                 } catch (error) {
//                     console.error("Failed to enter Picture-in-Picture mode:", error)
//                 }
//             } else if (document.pictureInPictureEnabled && videoRef.current) {
//                 try {
//                     await videoRef.current.requestPictureInPicture()
//                     setPipActive(true)
//                 } catch (error) {
//                     console.error("Failed to enter Picture-in-Picture mode:", error)
//                 }
//             }
//         }
//     }, [
//         pipActive,
//         activeTask,
//         progress,
//         isAIVolume,
//         micOn,
//         activeTaskId,
//         handleTaskSelect,
//         handleStop,
//         selectedValue,
//         id,
//     ])

//     return (
//         <div className="relative min-h-full w-full flex flex-col justify-center">
//             <div className="relative w-[424px] mx-auto space-y-1 flex-grow flex flex-col justify-center">
//                 {/* Active Task Card */}
//                 <Card className="bg-white gap-2 flex flex-col p-2">
//                     {isAIVolume ? (
//                         <div className="flex flex-col bg-[#22C55EE5] shadow-inset-hard rounded-lg p-1">
//                             <div className="h-10 text-white text-sm font-semibold flex justify-between items-center px-2">
//                                 {"AI Volume"}
//                             </div>
//                             <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
//                                 <div className="h-full bg-white/20 rounded-lg flex-1">
//                                     {/* <Progress
//                                         value={Math.min(progress, 100)}
//                                         className="h-full w-full bg-white rounded-lg transition-all duration-300"
//                                     /> */}
//                                     <Slider
//                                         className="h-10 p-1 rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-gray-400 [&>:last-child>span]:ring-offset-0"
//                                         value={value}
//                                         onValueChange={setValue}
//                                         aria-label="Slider with output"
//                                         trackClassName="h-full rounded-md bg-transparent"
//                                         rangeClassName="bg-white"
//                                     />
//                                     {/* <output className="bg-[#0EA5E9] flex justify-center items-center rounded-md font-semibold px-3 py-2 h-10 text-sm text-white w-[52px] tabular-nums">{value[0]}</output> */}

//                                 </div>
//                                 <div className="bg-white text-[#22C55EE5] justify-center w-[52px] py-2.5 rounded-lg flex items-center">
//                                     <span className="text-sm font-semibold">{value[0]}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             {micOn ? (
//                                 <div className="flex flex-col gap-2">
//                                     <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
//                                         {activeTask?.name || "Start New Session"}
//                                         <Button variant="ghost" className="h-full text-gray-400 bg-transparent" onClick={togglePiP}>
//                                             {pipActive ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
//                                         </Button>
//                                     </div>

//                                     <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
//                                         <div
//                                             className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
//                                             style={{
//                                                 backgroundImage: "url('/Luna.png')",
//                                             }}
//                                         />
//                                         <p className="font-semibold text-sm/[18px] tracking-[-0.02em] text-white">
//                                             Hey there! You’re doing an amazing job sticking to your session. Remember, every little bit of effort you put in adds up to something bigger.
//                                         </p>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col gap-2">
//                                     <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
//                                         {activeTask?.name || "Start New Session"}
//                                         <Button variant="ghost" className="h-full text-gray-400 bg-transparent" onClick={togglePiP}>
//                                             {pipActive ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
//                                         </Button>
//                                     </div>
//                                     <div className="w-full flex flex-wrap justify-between items-center gap-1">
//                                         <div className="h-10 bg-gray-100 rounded-lg flex-1">
//                                             {/* <Progress
//                                                 value={Math.min(progress, 100)}
//                                                 className="h-full w-full  rounded-lg transition-all duration-300"
//                                             /> */}
//                                             <Slider
//                                                 className="h-full py-1 px-1.5 bg-[#F8F8F8] rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-[#E5E5E5] [&>:last-child>span]:ring-offset-0"
//                                                 value={value}
//                                                 onValueChange={setValue}
//                                                 trackClassName="h-full rounded-md bg-[#F8F8F8]"
//                                                 rangeClassName="bg-[#E5E5E5]"
//                                             />
//                                         </div>
//                                         <div className="bg-[#F8F8F8] text-[#A3A3A3] w-[74px] px-2.5 py-2.5 rounded-lg flex items-center">
//                                             <span className="text-sm font-semibold">{formatTime(activeTask?.duration || 0)}</span>
//                                             {/* <output className="bg-[#0EA5E9] flex justify-center items-center rounded-md font-semibold px-3 py-2 h-10 text-sm text-white w-[52px] tabular-nums">{value[0]}</output> */}

//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     )}

//                     {/* buttons */}
//                     {isAIVolume ? (
//                         <div className="grid grid-cols-5 gap-1 items-center h-10">
//                             <Button
//                                 variant="ghost"
//                                 className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-[#A3A3A3]"}`}
//                                 onClick={() => setIsAIVolume(!isAIVolume)}
//                             >
//                                 {/* <AudioLines className={`h-6 w-6 ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A]" : "text-gray-400"}`} /> */}
//                                 <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />
//                             </Button>
//                             <div className="col-span-4 inline-flex h-9 rounded-lg bg-input/50 p-0.5 w-full">
//                                 <RadioGroup
//                                     value={selectedValue}
//                                     onValueChange={setSelectedValue}
//                                     className="group relative inline-grid grid-cols-[1fr_1fr] w-full text-white items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-[#0EA5E9] after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
//                                     data-state={selectedValue}
//                                 >
//                                     <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-muted-foreground/70">
//                                         On
//                                         <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
//                                     </label>
//                                     <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=off]:text-muted-foreground/70">
//                                         Off
//                                         <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
//                                     </label>
//                                 </RadioGroup>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-5 gap-1 items-center h-10">
//                             <Button
//                                 variant="ghost"
//                                 className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                                 onClick={() => setIsAIVolume(!isAIVolume)}
//                             >
//                                 {/* <AudioLines className="h-6 w-6 shrink-0" /> */}
//                                 <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />

//                             </Button>
//                             <Button
//                                 variant="ghost"
//                                 className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                                 onClick={() => setMicOn(!micOn)}
//                             >
//                                 <Mic1 />
//                             </Button>
//                             <Button
//                                 variant="ghost"
//                                 className={`border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${micOn ? "text-[#0EA5E9] bg-[#0EA5E91A] hover:bg-[#22C55E1A]" : "text-gray-400"}`}
//                             // onClick={() => setMicOn(!micOn)}
//                             >
//                                 Timer
//                             </Button>
//                             <Button
//                                 variant="ghost"
//                                 className="text-gray-400 border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent"
//                                 disabled={!activeTask}
//                                 onClick={() => activeTaskId && handleTaskSelect(activeTaskId)}
//                             >
//                                 {activeTask?.isPlaying ? <PlayPause /> : <PlayPause />}
//                             </Button>
//                             <Button
//                                 variant="ghost"
//                                 className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A] "
//                                 onClick={handleStop}
//                                 disabled={!activeTask}
//                             >
//                                 <Square className="h-5 w-5 fill-[#EF4444]" />
//                             </Button>
//                         </div>
//                     )}
//                 </Card>

//                 {/* Tasks List Card */}
//                 <Card className="p-2">
//                     <div className="text-sm flex items-center font-semibold px-2 mb-1 h-10">Today</div>
//                     <div className="flex flex-col gap-1">
//                         {tasks.map((task) => (
//                             <div key={task.id} className="h-12 flex items-center justify-between p-1 bg-gray-50 rounded-lg">
//                                 <span className="h-10 flex items-center text-[#999999] font-semibold text-sm">{task.name}</span>
//                                 <div className="h-10 flex items-center gap-1">
//                                     <span className="text-[#999999] py-2 bg-white px-2.5 rounded-lg">{formatTime(task.duration)}</span>
//                                     <Button
//                                         variant="ghost"
//                                         className="h-full text-[#999999] bg-white py-2 px-7"
//                                         onClick={() => handleTaskSelect(task.id)}
//                                     >
//                                         {task.isPlaying ? <PlayPause /> : <PlayPause />}
//                                     </Button>
//                                 </div>
//                             </div>
//                         ))}
//                         <Button className="w-full bg-[#0EA5E9] hover:bg-sky-400 text-white h-10 mt-4" onClick={handleNewTask}>
//                             New Task
//                         </Button>
//                     </div>
//                 </Card>
//             </div>
//             <footer className="absolute mb-6 bottom-0 text-center flex w-full items-center justify-center flex-col">
//                 <div className="flex gap-1 w-full items-center justify-center">
//                     <Button
//                         variant="ghost"
//                         className="py-3 w-[150px] bg-[#F8F8F8] text-sm font-semibold text-[#999999] hover:border-gray-400"
//                     >
//                         Leaderboard
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         className="py-3 w-[150px] bg-[#F8F8F8] text-sm font-semibold text-[#999999] hover:border-gray-400"
//                     >
//                         Session History
//                     </Button>
//                     <Button
//                         variant="ghost"
//                         className="py-3 w-[150px] bg-[#F8F8F8] text-sm font-semibold text-[#999999] hover:border-gray-400"
//                     >
//                         Profile
//                     </Button>
//                 </div>
//             </footer>
//             <canvas ref={canvasRef} width={400} height={400} style={{ display: "none" }} />
//             <video ref={videoRef} style={{ display: "none" }} />
//         </div>
//     )
// }


















import { useState, useEffect, useRef, useId, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AudioLines, Maximize2, Minimize2, Square } from "lucide-react"
import { formatTime } from "@/lib/time"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { createRoot } from "react-dom/client"
import { Slider } from "@/components/ui/slider"
import { Mic1, Mic2, PlayPause, PlayPause2 } from "@/components/ui/SVGs"
import { useNavigate } from "react-router-dom"
import useAppStore from "@/store/useAppStore"

interface PiPWindowProps {
  onClose: () => void
}

const PiPWindow: React.FC<PiPWindowProps> = ({ onClose }) => {
  const {
    activeTaskId,
    tasks,
    isAIVolume,
    micOn,
    timerOn,
    isPause,
    selectedValue,
    setIsAIVolume,
    setMicOn,
    setTimerOn,
    setIsPause,
    setSelectedValue,
    updateTask,
  } = useAppStore()

  const activeTask = tasks.find((task) => task.id === activeTaskId)
  const progress = activeTask
    ? (activeTask.duration / (30 * 60 * 1000)) * 100 // 30 minutes as total
    : 0

  const [value, setValue] = useState([25])

  const handleTogglePlay = () => {
    if (activeTaskId) {
      updateTask(activeTaskId, { isPlaying: !isPause })
      setIsPause(!isPause)
    }
  }

  const handleStop = () => {
    if (activeTaskId) {
      updateTask(activeTaskId, { isPlaying: false })
      setIsPause(true)
    }
    onClose()
  }

  return (
    <div className="p-2">
      {isAIVolume ? (
        <div className="flex flex-col bg-[#22C55EE5] shadow-inset-hard rounded-lg p-1">
          <div className="h-10 text-white text-sm font-semibold flex justify-between items-center px-2">AI Volume</div>
          <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
            <div className="h-full bg-white/20 rounded-lg flex-1">
              <Slider
                className="h-10 p-1 rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-gray-400 [&>:last-child>span]:ring-offset-0"
                value={value}
                onValueChange={setValue}
                trackClassName="h-full rounded-md bg-transparent"
                rangeClassName="bg-white"
              />
            </div>
            <div className="bg-white text-[#22C55EE5] justify-center w-[52px] py-2.5 rounded-lg flex items-center">
              <span className="text-sm font-semibold">{value[0]}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
            {activeTask?.name || "Start New Session"}
            <Button variant="ghost" className="h-full text-gray-400 bg-transparent" onClick={onClose}>
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
            <div
              className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft-glow transition duration-300"
              style={{
                backgroundImage: "url('/Luna.png')",
              }}
            />
            <p className="font-semibold text-sm/[18px] tracking-[-0.02em] text-white">
              Hey there! You're doing an amazing job sticking to your session. Remember, every little bit of effort you
              put in adds up to something bigger.
            </p>
          </div>

          {timerOn && (
            <div className="h-10 rounded-lg p-1 my-2 bg-[#F8F8F8]">
              <Progress
                value={Math.min(progress, 100)}
                className="h-full w-full bg-transparent rounded-md transition-all duration-300"
              />
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-5 gap-1 items-center h-10">
        <Button variant="ghost" onClick={() => setIsAIVolume(!isAIVolume)}>
          <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />
        </Button>

        {isAIVolume ? (
          <div className="col-span-4 inline-flex h-10 rounded-lg w-full">
            <RadioGroup
              value={selectedValue}
              onValueChange={setSelectedValue}
              className="grid grid-cols-2 w-full h-10 gap-1"
              data-state={selectedValue}
            >
              <label className="h-10 flex-1 flex cursor-pointer items-center justify-center rounded-lg px-4 text-center bg-[#F8F8F8] text-sm font-semibold text-[#A3A3A3] transition-colors has-[[data-state=checked]]:bg-blue-500 has-[[data-state=checked]]:text-white">
                On
                <RadioGroupItem value="on" className="sr-only h-10" />
              </label>
              <label className="h-10 flex-1 flex cursor-pointer items-center justify-center rounded-lg px-4 text-center bg-[#F8F8F8] text-sm font-semibold text-[#A3A3A3] transition-colors has-[[data-state=checked]]:bg-blue-500 has-[[data-state=checked]]:text-white">
                Off
                <RadioGroupItem value="off" className="sr-only" />
              </label>
            </RadioGroup>
          </div>
        ) : (
          <>
            <Button variant="ghost" className={`${micOn ? "bg-[#0EA5E9]/10" : ""}`} onClick={() => setMicOn(!micOn)}>
              {micOn ? <Mic2 /> : <Mic1 />}
            </Button>
            <Button
              variant="ghost"
              className={`text-sm font-semibold ${timerOn ? "text-[#0EA5E9] bg-[#0EA5E9]/10" : "text-[#A3A3A3]"}`}
              onClick={() => setTimerOn(!timerOn)}
            >
              {formatTime(activeTask?.duration || 0)}
            </Button>
            <Button variant="ghost" className={`${isPause ? "" : "bg-[#0EA5E9]/10"}`} onClick={handleTogglePlay}>
              {isPause ? <PlayPause /> : <PlayPause2 />}
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A]"
              onClick={handleStop}
              disabled={!activeTask}
            >
              <Square className="h-5 w-5 fill-[#EF4444]" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default function SessionTimer() {
  const {
    timerValue,
    aiCheckinValue,
    aiCheckIn,
    isAIVolume,
    micOn,
    timerOn,
    isPause,
    selectedValue,
    userStudy,
    aiVolume,
    setIsAIVolume,
    setMicOn,
    setTimerOn,
    setIsPause,
    setSelectedValue,
    setAiVolume,
  } = useAppStore()

  const [currentTime, setCurrentTime] = useState(timerValue * 60 * 1000)
  const navigate = useNavigate()
  const id = useId()
  const [pipActive, setPipActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [pipWindow, setPipWindow] = useState<Window | null>(null)
  const [timerClick, setTimerClick] = useState(false);

  const progress = ((timerValue * 60 * 1000 - currentTime) / (timerValue * 60 * 1000)) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerOn && !isPause) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval)
            setTimerOn(false)
            return 0
          }
          return prevTime - 10
        })
      }, 10)
    }
    return () => clearInterval(interval)
  }, [timerOn, isPause, setTimerOn])

  useEffect(() => {
    setTimerOn(true)
  }, [setTimerOn])

  const handleMicToggle = () => {
    setMicOn(!micOn)
    
  }

  const handlePlayPause = () => {
    setIsPause(!isPause)
  }

  const handleStop = () => {
    setTimerOn(false)
    setIsPause(true)
    navigate("/session-end")
  }

  const togglePiP = useCallback(async () => {
    if (pipActive) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      }
      setPipActive(false)
      setPipWindow(null)
    } else {
      if ("documentPictureInPicture" in window) {
        try {
          const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
            width: 424,
            height: 200,
          })
          setPipWindow(pipWindow)

          // Copy styles to PiP window
          const styles = Array.from(document.styleSheets).map((styleSheet) => {
            try {
              return Array.from(styleSheet.cssRules)
                .map((rule) => rule.cssText)
                .join("")
            } catch (e) {
              const link = document.createElement("link")
              link.rel = "stylesheet"
              link.type = styleSheet.type
              link.media = styleSheet.media
              link.href = styleSheet.href
              return link
            }
          })

          styles.forEach((style) => {
            if (typeof style === "string") {
              const styleElement = pipWindow.document.createElement("style")
              styleElement.textContent = style
              pipWindow.document.head.appendChild(styleElement)
            } else if (style instanceof HTMLLinkElement) {
              pipWindow.document.head.appendChild(style.cloneNode())
            }
          })

          // Create a root element for React
          const root = pipWindow.document.createElement("div")
          pipWindow.document.body.appendChild(root)

          // Render the PiP content
          const pipRoot = createRoot(root)
          pipRoot.render(
            <PiPWindow
              onClose={() => {
                pipWindow.close()
                setPipActive(false)
              }}
            />,
          )

          pipWindow.addEventListener("pagehide", () => {
            pipRoot.unmount()
            setPipActive(false)
            setPipWindow(null)
          })

          setPipActive(true)
        } catch (error) {
          console.error("Failed to enter Picture-in-Picture mode:", error)
        }
      } else if (document.pictureInPictureEnabled && videoRef.current) {
        try {
          await videoRef.current.requestPictureInPicture()
          setPipActive(true)
        } catch (error) {
          console.error("Failed to enter Picture-in-Picture mode:", error)
        }
      }
    }
  }, [pipActive])

  return (
    <div className="relative min-h-full w-full flex flex-col justify-center">
      <div className="relative w-[27.5rem] mx-auto space-y-1 flex-grow flex flex-col justify-center">
        {/* Active Task Card */}
        <Card className="bg-white gap-2 flex flex-col p-2">
          <div className="flex flex-col gap-2">
            <div className="text-sm h-10 font-semibold flex justify-between items-center px-2">
              {userStudy || "Start New Session"}
              <Button variant="ghost" className="h-full text-gray-400 bg-transparent" onClick={togglePiP}>
                {pipActive ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
              </Button>
            </div>
            {isAIVolume ? (
              <div className="flex flex-col bg-[#22C55EE5] shadow-inset-hard rounded-lg px-1 pb-1">
                <div className="h-10 text-white text-sm font-semibold flex justify-between items-center px-2">
                  {"AI Volume"}
                </div>
                <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
                  <div className="h-full bg-white/20 rounded-lg flex-1">
                    <Slider
                      className="h-10 p-1 rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-gray-400 [&>:last-child>span]:ring-offset-0"
                      value={[aiVolume]}
                      onValueChange={(value) => setAiVolume(value[0])}
                      aria-label="Slider with output"
                      trackClassName="h-full rounded-md bg-transparent"
                      rangeClassName="bg-white"
                    />
                  </div>
                  <div className="bg-white text-[#22C55EE5] justify-center w-[52px] py-2.5 rounded-lg flex items-center">
                    <span className="text-sm font-semibold">{aiVolume}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 p-3 bg-[#22C55EE5] shadow-inset-hard rounded-lg">
                  <div
                    className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft-glow transition duration-300"
                    style={{
                      backgroundImage: "url('/Luna.png')",
                    }}
                  />
                  <p className="font-semibold text-sm/[18px] tracking-[-0.02em] text-white">
                    Hey there! You're doing an amazing job sticking to your session. Remember, every little bit of
                    effort you put in adds up to something bigger.
                  </p>
                </div>

                {timerClick && (
                  <div className="h-10 rounded-lg p-1 my-2 bg-[#F8F8F8]">
                    <Progress
                      value={Math.min(progress, 100)}
                      className="h-full w-full bg-transparent rounded-md transition-all duration-300"
                    />
                  </div>
                )}

                {isPause && (
                  <div className="h-10 rounded-lg p-1 my-2 bg-[#F8F8F8]">
                    <Progress
                      value={Math.min(progress, 100)}
                      className="h-full w-full bg-transparent rounded-md transition-all duration-300"
                      indicatorClassName="bg-[#E5E5E5]"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* buttons */}
          <div className="grid grid-cols-5 gap-1 items-center h-10">
            <Button
              variant="ghost"
              className={`h-full border-none hover:outline-none hover:border-none bg-transparent hover:bg-transparent ${isAIVolume ? "text-[#22C55E] bg-[#22C55E1A] hover:bg-[#22C55E1A]" : "text-[#A3A3A3]"}`}
              onClick={() => setIsAIVolume(!isAIVolume)}
            >
              <AudioLines className={`h-6 w-6 opacity-50 ${isAIVolume ? "text-[#22C55E]" : "text-gray-400"}`} />
            </Button>
            {isAIVolume ? (
              <div className="col-span-4 inline-flex h-10 rounded-lg w-full">
                <RadioGroup
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                  className="grid grid-cols-2 w-full h-10 gap-1"
                  data-state={selectedValue}
                >
                  <label className="h-10 flex-1 flex cursor-pointer items-center justify-center rounded-lg px-4 text-center bg-[#F8F8F8] text-sm font-semibold text-[#A3A3A3] transition-colors has-[[data-state=checked]]:bg-blue-500 has-[[data-state=checked]]:text-white">
                    On
                    <RadioGroupItem id={`${id}-1`} value="on" className="sr-only h-10" />
                  </label>
                  <label className="h-10 flex-1 flex cursor-pointer items-center justify-center rounded-lg px-4 text-center bg-[#F8F8F8] text-sm font-semibold text-[#A3A3A3] transition-colors has-[[data-state=checked]]:bg-blue-500 has-[[data-state=checked]]:text-white">
                    Off
                    <RadioGroupItem id={`${id}-2`} value="off" className="sr-only" />
                  </label>
                </RadioGroup>
              </div>
            ) : (
              <>
                <Button variant="ghost" className={`${micOn ? "bg-[#0EA5E9]/10" : ""}`} onClick={handleMicToggle}>
                  {micOn ? <Mic2 /> : <Mic1 />}
                </Button>
                <Button
                  variant="ghost"
                  className={`text-sm font-semibold ${timerClick ? "text-[#0EA5E9] bg-[#0EA5E9]/10" : "text-[#A3A3A3]"}`}
                  onClick={() => {setTimerClick(!timerClick)}}
                >
                  {formatTime(currentTime)}
                </Button>
                <Button variant="ghost" className={`${isPause ? "bg-[#0EA5E9]/10" : ""}`} onClick={handlePlayPause}>
                  {isPause ? <PlayPause2 /> : <PlayPause />}
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 border-none hover:outline-none hover:border-none bg-[#EF44441A] hover:bg-[#EF44441A]"
                  onClick={handleStop}
                >
                  <Square className="h-5 w-5 fill-[#EF4444]" />
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
      <footer className="absolute mb-6 bottom-0 text-center flex w-full items-center justify-center flex-col">
        <div className="flex gap-1 w-full items-center justify-center">
          <Button
            variant="ghost"
            className="w-[150px] bg-[#FAFAFA] hover:bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:text-[#A3A3A3]"
          >
            About
          </Button>
        </div>
      </footer>
      <canvas ref={canvasRef} width={400} height={400} style={{ display: "none" }} />
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  )
}







