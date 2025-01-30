import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Achievement2, FireBadge, Timer } from "./ui/SVGs"

// Base Achievement Card Component
interface AchievementCardProps {
    title: string
    subtitle?: string
    icon: React.ReactNode
    children?: React.ReactNode
    className?: string
}

function AchievementCard({ title, subtitle, icon, children, className }: AchievementCardProps) {
    return (
        <Card className={cn("w-full max-w-md overflow-hidden p-2 flex flex-col gap-2", className)}>
            {/* <CardHeader className="text-center space-y-1 ">
               
            </CardHeader> */}
            <div className=" rounded-lg  backdrop-blur-3xl shadow-inset-hard-2 bg-gradient-blue-white">
                <span className="text-lg py-4 font-medium text-gray-700 flex flex-col text-center items-center">
                    {title} <br />
                    {subtitle && <>{subtitle}</>}
                </span>
                <div className="flex justify-center">{icon}</div>
            </div>
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
            title="Great Job!"
            subtitle={`You worked for ${workTime}`}
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
                    <Progress value={(basePoints / maxPoints) * 100} className="h-8 bg-gray-100 rounded-lg" />
                    <Progress
                        value={((basePoints + bonusPoints) / maxPoints) * 100}
                        className="h-8 absolute top-0 left-0 bg-amber-400 rounded-none rounded-r-lg"
                        style={{
                            width: `${(bonusPoints / maxPoints) * 100}%`,
                            marginLeft: `${(basePoints / maxPoints) * 100}%`,
                        }}
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0EA5E9] text-white rounded-lg w-12 h-8 flex items-center justify-center text-sm font-semi-bold">
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
            title={`${days} day streak!`}
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
            title={`${totalTime} total time spent`}
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
                <Progress value={currentProgress} className="h-8 rounded-lg" />
            </div>
        </AchievementCard>
    )
}

// Demo Component
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

