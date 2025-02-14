import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/time"
import { useNavigate } from "react-router-dom"
import useAppStore from "@/store/useAppStore"
import { BlurBadge, CheckBadge, FireBadge, LevelBlurBadge, SingleLineBadge, TripleLineBadge } from "@/components/ui/SVGs"

export default function Page() {
    const { timerValue, aiCheckinValue, aiCheckIn, workStudyDescription, setWorkStudyDescription, setTimerValue, setAiCheckinValue, setAiCheckIn, timerOn, setTimerOn } =
        useAppStore()
    const navigate = useNavigate()

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* CheckBadge */}
                <div className="absolute top-[17%] left-[31%] animate-float-slow" style={{ transform: 'rotate(-7.45deg)' }}>
                    <CheckBadge />
                </div>

                {/* BlurBadge */}
                <div className="absolute top-[21%] right-[31%] animate-float" style={{ transform: 'rotate(13.53deg)', opacity: 0.5 }}>
                    <BlurBadge />
                </div>

                {/* TripleLineBadge */}
                <div className="absolute bottom-[14%] left-[26.5rem] animate-float-slow" style={{ transform: 'rotate(10.57deg)', opacity: 0.9 }}>
                    <TripleLineBadge />
                </div>

                {/* LevelBlurBadge */}
                <div className="absolute bottom-[38%] left-[22%] animate-float-slow" style={{ transform: 'rotate(-15deg)', opacity: 0.5 }}>
                    <LevelBlurBadge />
                </div>

                {/* FireBadge */}
                <div className="absolute bottom-[18%] right-[25%] animate-float" style={{ transform: 'rotate(-6.43deg)' }}>
                    <FireBadge />
                </div>

                {/* SingleLineBadge */}
                <div className="absolute top-[40%] right-[22%] animate-float-slow" style={{ transform: 'rotate(-14.46deg)', opacity: 0.9 }}>
                    <SingleLineBadge />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-2xl w-full h-full justify-between flex flex-col">
                <main className="relative text-center px-4 flex flex-col items-center justify-center flex-1">
                    <h2 className="text-[40px]/[48px] font-bold text-center text-gray-900 mb-3">
                        Level Up Your <span className="block">Productivity Game</span>
                    </h2>

                    <p className="text-[#00000080] mb-8 px-10 text-base/[22px] font-medium">
                        Stay focused, track your time, and achieve your
                        <br /> goals with the power of AI on your side.
                    </p>

                    {/* Instant Session card */}
                    <div className="w-[27.5rem] bg-background border border-[#F5F5F5] p-2 rounded-xl space-y-4">
                        <Card className="bg-[#22C55EE5] shadow-inset-heavy p-4 mb-2 flex items-center gap-2 mx-auto backdrop-blur-light">
                            <div
                                className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
                                style={{
                                    backgroundImage: "url('/Luna.png?height=48&width=48')",
                                }}
                            />

                            <p className="font-base justified text-left text-sm/[18px]  text-white">
                                Hi there! I'm Audrey, your personal productivity buddy. I'm here to keep you focused, motivated, and on
                                track. Ready to get started?
                            </p>
                        </Card>

                        <div>
                            <p className="mb-1.5 block font-semibold text-xs text-left">What are we working on today?</p>
                            <Input
                                className="border-none bg-[#F8F8F8] h-10 overflow-auto rounded-md text-sm font-semibold tracking-[-0.04em] placeholder:font-semibold placeholder:text-sm"
                                placeholder="Write a short description"
                                value={workStudyDescription}
                                onChange={(e) => setWorkStudyDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="mb-1.5 block font-semibold text-xs text-left">Set Timer</p>
                            <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
                                <div className=" bg-gray-100 rounded-lg flex-1 cursor-e-resize">
                                    <Slider
                                        className="h-10 py-1 px-1.5 bg-[#F8F8F8] rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-[#E5E5E5] [&>:last-child>span]:ring-offset-0"
                                        value={[timerValue]}
                                        onValueChange={(value) => setTimerValue(value[0])}
                                        trackClassName="h-full rounded-md bg-[#F8F8F8]"
                                        rangeClassName="bg-[#E5E5E5]"
                                    />
                                </div>
                                <div className="bg-[#F8F8F8] text-[#A3A3A3] w-[74px] px-2.5 py-2.5 rounded-lg flex items-center">
                                    <span className="text-sm font-semibold">{formatTime(timerValue * 60 * 1000)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="mb-1.5 block font-semibold text-xs text-left">AI Check-In</p>
                            <div className="w-full h-10 flex flex-wrap justify-between items-center gap-1">
                                <Button
                                    className={`w-20 ${aiCheckIn ? "bg-[#0EA5E9] text-white" : "bg-[#F8F8F8] text-[#A3A3A3]"} `}
                                    onClick={() => setAiCheckIn(!aiCheckIn)}
                                >
                                    {aiCheckIn ? "On" : "Off"}
                                </Button>
                                <div className="relative bg-gray-100 rounded-lg flex-1 cursor-e-resize">
                                    <Slider
                                        className="h-10 py-1 px-1.5 bg-transparent rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-[#E5E5E5] [&>:last-child>span]:ring-offset-0"
                                        value={[aiCheckinValue]}
                                        onValueChange={(value) => setAiCheckinValue(value[0])}
                                        trackClassName="h-full rounded-md bg-transparent"
                                        rangeClassName={`${aiCheckIn ? "bg-[#0EA5E9]" : "bg-[#E5E5E5]"}`}
                                    />
                                </div>
                                <div className="bg-[#F8F8F8] text-[#A3A3A3] w-[74px] px-2.5 py-2.5 rounded-lg flex items-center">
                                    <span className="text-sm font-semibold">{formatTime(aiCheckinValue * 60 * 1000)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 flex gap-1 justify-center w-full h-10">
                            <Button
                                className="w-full h-full bg-[#0EA5E9] font-semibold text-sm/4 tracking-[-0.01em]"
                                onClick={() => {
                                    setTimerOn(true)
                                    navigate("/session-timer")
                                }}
                            >
                                Start Session Now
                            </Button>
                        </div>
                    </div>

                    <div className="w-[27.5rem] flex items-center gap-2 py-4">
                        <Separator className="flex-1 bg-[#F5F5F5]" />
                        <span className="font-semibold text-xs text-[#D4D4D4]">or</span>
                        <Separator className="flex-1 bg-[#F5F5F5]" />
                    </div>

                    <div className="w-[27.5rem] h-10">
                        <Button
                            variant="outline"
                            className="w-full h-full  bg-[#0EA5E9]/10 font-semibold text-[#0EA5E9] border-none  text-sm/4 tracking-[-0.01em]"
                            onClick={() => navigate("/setup")}
                        >
                            Setup new Session
                        </Button>
                    </div>
                </main>

                {/* Footer */}
                <footer className="absolute mb-6 bottom-0 w-full text-center">
                    <Button
                        variant="ghost"
                        className="w-[150px] bg-[#FAFAFA] hover:bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:text-[#A3A3A3]"
                    >
                        About
                    </Button>
                </footer>
            </div>
        </div>
    )
}

