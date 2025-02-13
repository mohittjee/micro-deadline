import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/time"
import { useNavigate } from "react-router-dom"
import useAppStore from "@/store/useAppStore"

const SessionSettings = () => {
  const { timerValue, aiCheckinValue, aiCheckIn, setTimerValue, setAiCheckinValue, setAiCheckIn, timerOn, setTimerOn } =
    useAppStore()
  const navigate = useNavigate()

  return (
    <div className="relative z-10 max-w-2xl w-full h-full justify-center items-center flex flex-col">
      <div className="w-[27.5rem] bg-background border border-[#F5F5F5] p-2 rounded-xl space-y-4">
        <Card className="bg-[#22C55E]/90 shadow-inset-strong p-4 mb-2 flex items-center gap-2 mx-auto backdrop-blur-light">
          <div
            className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft-glow transition duration-300"
            style={{
              backgroundImage: "url('/Luna.png?height=48&width=48')",
            }}
          />

          <p className="font-semibold justified text-left text-sm/[18px] tracking-[-0.02em] text-white">
            Hi there! I'm Audrey, your personal productivity buddy. I'm here to keep you focused, motivated, and on
            track. Ready to get started?
          </p>
        </Card>

        <div>
          <p className="mb-1.5 block font-semibold text-xs text-left">What are we working on today?</p>
          <Input
            className="border-none bg-[#F8F8F8] h-10 overflow-auto rounded-md text-sm font-semibold tracking-[-0.04em] placeholder:font-semibold placeholder:text-sm"
            placeholder="Write a short description"
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

        <div className="flex gap-1 justify-center w-full h-10">
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
  )
}

export default SessionSettings

