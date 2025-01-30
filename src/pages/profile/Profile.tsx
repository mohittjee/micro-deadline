// const Profile = () => {
//   return (
//     <div className="min-h-screen w-full flex flex-col">
//             <div className="w-1/3 mx-auto space-y-4 flex-grow">
//             ojoi
//             </div>
//             </div>
//   )
// }

// export default Profile

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Achievement2, FireBadge } from "@/components/ui/SVGs"
import { cn } from "@/lib/utils"

export default function Profile() {
    const streakDays = ["M", "T", "W", "T", "F", "S", "S"]
    const activeStreak = [0, 1, 2, 3]
    const currentDay = 3

    const achievements = [
        { color: "purple", icon: "🔥", year: "2025", label: "7 Days" },
        { color: "green", icon: "🔥", year: "2025", label: "30 Days" },
        { color: "brown", icon: "🔥", year: "2025", label: "50 Days" },
        { color: "purple", icon: "⌛", year: "2025", label: "2 Hours" },
        { color: "green", icon: "⌛", year: "2025", label: "10 Hours" },
        { color: "purple", icon: "✓", year: "2025", label: "5 Tasks" },
    ]

    return (
        <div className="h-full relative bg-transparent flex items-center flex-col gap-16 justify-center w-full">
            <Card className="w-[350px] relative max-w-md p-2 font-semibold">
                <div className="flex flex-col items-center py-4 gap-1">
                    <Achievement2 />
                    <h2 className="text-lg/5 font-semibold tracking-[-0.01em] text-[#262626]">Dennis</h2>
                </div>

                {/* XP Progress */}
                <div className="space-y-1.5 mt-2 mb-6 ">
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>XP</span>
                        <span>2720 / 5000</span>
                    </div>
                    <div className="flex items-center gap-1 h-10">
                        <Progress value={54.4} className="flex-1 h-full rounded-lg" />
                        <span className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg font-bold">69</span>
                    </div>
                </div>

                {/* Streak Calendar */}
                <div className="space-y-1.5 mb-6">
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>Streak</span>
                        <span>50 Days</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 h-10">
                        {streakDays.map((day, index) => (
                            <div
                                key={day}
                                className={cn(
                                    "aspect-square flex items-center justify-center rounded-lg text-sm font-medium",
                                    activeStreak.includes(index)
                                        ? index === currentDay
                                            ? "bg-yellow-400 text-white"
                                            : "bg-[#0EA5E9] text-white"
                                        : "bg-gray-100 text-gray-400",
                                )}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Achievements</span>
                        <span>6</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="flex flex-col items-center pt-2 bg-[#F8F8F8] rounded-xl">
                                {/* <div
                                    className={cn("w-16 h-16 rounded-full flex items-center justify-center text-2xl", {
                                        "bg-purple-900": achievement.color === "purple",
                                        "bg-emerald-800": achievement.color === "green",
                                        "bg-amber-900": achievement.color === "brown",
                                    })}
                                >
                                    <span className="text-white">{achievement.icon}</span>
                                </div> */}
                                <FireBadge />

                                <div className="flex flex-col gap-2 py-3">
                                    <Badge className="bg-white text-gray-500 text-xs shadow-none">{achievement.year}</Badge>
                                    <span className="text-gray-500 text-sm">{achievement.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            <footer className="absolute mb-6 bottom-0  text-center flex w-full items-center justify-center flex-col">
                <div className="flex gap-2 w-full items-center justify-center">
                    <Button
                        variant="ghost"
                        className="py-3 w-[150px] bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Leaderboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="py-3 w-[150px] bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Session History
                    </Button>

                    <Button
                        className="py-3 w-[150px] bg-[#0EA5E9] hover:bg-[#0EA5E9] font-semibold text-white hover:border-gray-400"
                    >
                        Profile
                    </Button>
                </div>
            </footer>
        </div>
    )
}


