import { AchievementCard } from "@/components/achievement-cards"
import { Button } from "@/components/ui/button"
import { Achievement2 } from "@/components/ui/SVGs"
import { useNavigate, useLocation } from "react-router-dom"
import { formatTime } from "@/lib/time"

const SessionEnd = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const sessionDuration = location.state?.sessionDuration || 0

  return (
    <div className="relative z-10 max-w-2xl w-full h-full justify-center items-center flex flex-col">
      <div className="w-[21.25rem] mx-auto space-y-4">
        <AchievementCard
          className="border border-[#F5F5F5]"
          title={<span>Great Job!</span>}
          subtitle={
            <span>
              You worked for <strong className="font-bold">{formatTime(sessionDuration)}</strong>
            </span>
          }
          icon={<Achievement2 />}
        />
        <div className=" mb-6 bottom-0 text-center flex w-full items-center justify-center flex-col">
          <Button
            className="py-3 bg-[#0EA5E9] w-full font-semibold  hover:border-gray-400"
            onClick={() => {
              navigate("/session-settings")
            }}
          >
            Start New Session
          </Button>
          <Button className="py-3 bg-[#FAFAFA] w-full font-semibold text-[#A3A3A3]">Share</Button>
        </div>
      </div>

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

export default SessionEnd

