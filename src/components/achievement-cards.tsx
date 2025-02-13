import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Achievement2, FireBadge, Timer } from "./ui/SVGs"

interface AchievementCardProps {
    title: React.ReactNode // Allow JSX in title
    subtitle?: React.ReactNode // Allow JSX in subtitle
    icon: React.ReactNode
    children?: React.ReactNode
    className?: string
}

export function AchievementCard({ title, subtitle, icon, children, className }: AchievementCardProps) {
    return (
        <Card className={cn("w-full max-w-md overflow-hidden p-2 flex flex-col gap-2", className)}>
            {/* <div className="rounded-lg flex flex-col backdrop-blur-3xl shadow-inset-hard bg-gradient-blue-white"> */}
                <div className="rounded-lg flex flex-col py-4 gap-4 backdrop-blur-3xl shadow-inset-glow-64 bg-gradient-blue-white">
                    <div className="text-lg/5 tracking-[-0.01em] font-medium text-[#082F49] flex flex-col text-center items-center">
                        <div>
                            <span>{title}</span>
                            <br />
                            {subtitle && <span>{subtitle}</span>}
                        </div>
                    </div>
                    <div className="flex justify-center">{icon}</div>
                </div>
            {/* </div> */}
            {children}
        </Card>
    )
}

// Work Session Card
interface WorkSessionCardProps {
    workTime: string
    currentLevel: number
    basePoints: number
    bonusPoints: number
    maxPoints: number
}

function WorkSessionCard({ workTime, currentLevel, basePoints, bonusPoints, maxPoints }: WorkSessionCardProps) {
    return (
        <AchievementCard
            title={<span>Great Job!</span>}
            subtitle={
                <span>
                    You worked for <strong className="font-bold">{workTime}</strong>
                </span>
            }
            icon={
                <Achievement2 />
            }
        >
            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium px-2">Level</span>
                    <span className="text-sm text-gray-500">
                        {basePoints} <span className="text-amber-500">+{bonusPoints}</span> / {maxPoints}
                    </span>
                </div>
                <div className="relative ">
                    <div className="space-x-1">

                        <Progress value={(basePoints / maxPoints) * 100} className="h-10 bg-gray-100 rounded-lg" />
                        <Progress
                            value={((basePoints + bonusPoints) / maxPoints) * 100}
                            className="h-10 absolute top-0 left-0 bg-amber-400 rounded-none rounded-r-lg"
                            style={{
                                width: `${(bonusPoints / maxPoints) * 100}%`,
                                marginLeft: `${(basePoints / maxPoints) * 100}%`,
                            }}
                        />
                    </div>
                    <div className="absolute right-0 top-1/2 h-full -translate-y-1/2 bg-[#0EA5E9] text-white rounded-lg w-12 flex items-center justify-center text-sm font-semi-bold">
                        {currentLevel}
                    </div>
                </div>
            </div>
        </AchievementCard>
    )
}

// Streak Card
interface StreakCardProps {
    days: number
    weekProgress: ("active" | "current" | "inactive")[]
}

function StreakCard({ days, weekProgress }: StreakCardProps) {
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

    return (
        <AchievementCard
            title={
                <span>
                    <strong className="font-bold">{days}</strong> day streak!
                </span>
            }
            subtitle="You're on fire!"
            icon={
                <FireBadge />
            }
        >
            <div className="space-y-1.5">

                <span className="text-sm font-medium px-2">Streak</span>

                <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day, index) => (
                        <div
                            key={day}
                            className={cn(
                                " h-10 gap-1 rounded-lg flex items-center justify-center font-semibold text-sm",
                                weekProgress[index] === "active" && "bg-blue-500 text-white",
                                weekProgress[index] === "current" && "bg-amber-400 text-white",
                                weekProgress[index] === "inactive" && "bg-gray-100 text-gray-400",
                            )}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </AchievementCard>
    )
}

// Time Spent Card
interface TimeSpentCardProps {
    totalTime: string
    targetHours: number
    currentProgress: number
}

function TimeSpentCard({ totalTime, targetHours, currentProgress }: TimeSpentCardProps) {
    return (
        <AchievementCard
            // title={`${totalTime} total time spent`}
            title={
                <span>
                    <strong className="font-bold">{totalTime}</strong> total time spent
                </span>
            }
            subtitle="Way to go!"
            icon={
                <Timer />
            }
        >
            <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold px-2">Next award in</span>
                    <span className="text-sm font-semibold text-gray-500">{targetHours} hours total</span>
                </div>
                <div className="h-10 p-1 rounded-lg bg-[#F8F8F8]">
                    <Progress value={currentProgress} className="h-full rounded-lg bg-transparent" />
                </div>
            </div>
        </AchievementCard>
    )
}

export default function AchievementCards() {
    return (
        <div className="w-full mx-auto my-auto space-y-2">
            <WorkSessionCard workTime="1:30:12" currentLevel={69} basePoints={2300} bonusPoints={420} maxPoints={5000} />

            <StreakCard
                days={50}
                weekProgress={["active", "active", "active", "current", "inactive", "inactive", "inactive"]}
            />

            <TimeSpentCard totalTime="110:48:32" targetHours={120} currentProgress={92} />
        </div>
    )
}

