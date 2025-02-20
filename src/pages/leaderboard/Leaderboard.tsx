import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Achievement2 } from "@/components/ui/SVGs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronUp } from "lucide-react"

interface LeaderboardEntry {
    rank: number
    level: number
    name: string
    streak: number
    totalTime: string
    badgeColor: string
    isCurrentUser?: boolean
}

const leaderboardData: LeaderboardEntry[] = [
    {
        rank: 420,
        level: 69,
        name: "You",
        streak: 32,
        totalTime: "24:58:14",
        badgeColor: "emerald-500",
        isCurrentUser: true,
    },
    {
        rank: 1,
        level: 128,
        name: "Calisto Noe",
        streak: 188,
        totalTime: "24:58:14",
        badgeColor: "red-700",
    },
    {
        rank: 2,
        level: 128,
        name: "Yash Timoteo",
        streak: 188,
        totalTime: "24:58:14",
        badgeColor: "red-800",
    },
    {
        rank: 3,
        level: 128,
        name: "Lea Colton",
        streak: 188,
        totalTime: "24:58:14",
        badgeColor: "emerald-700",
    },
    ...Array(8)
        .fill(null)
        .map((_, index) => ({
            rank: index + 4,
            level: 128,
            name: "Ilu Payne",
            streak: 188,
            totalTime: "24:58:14",
            badgeColor: "purple-700",
        })),
]

function Badge({ color }: { color: string }) {
    return (
        <div
            className={`relative w-9 h-9 bg-${color}/20 flex items-center pt-1 justify-center`}
        >
            <Achievement2 />
        </div>
    )
}

export default function Leaderboard() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Card className=" w-[55vw] p-2 my-16 h-[70vh] shadow-none border-[#F5F5F5] ">
                <div className="relative overflow-y-scroll h-full invisible-scrollbar">
                    <Table className="">
                        <TableHeader className="sticky top-0 bg-white z-50 ">
                            <TableRow className="border-none ">
                                <TableHead className="w-16 text-center">Rank</TableHead>
                                <TableHead className="w-24 text-left">Level</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-24 text-center">Streak</TableHead>
                                <TableHead className="w-32 text-center">Total Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {leaderboardData.map((entry, index) => (
                                <TableRow
                                    key={index}
                                    className={`${entry.isCurrentUser ? "font-medium text-sm" : "font-semibold text-sm"}
                        ${entry.isCurrentUser
                                            ? ""
                                            : index === 1
                                                ? "bg-[#FEFCE8]"
                                                : index === 2
                                                    ? "bg-[#FAFAFA]"
                                                    : index === 3
                                                        ? "bg-[#FFF7ED]"
                                                        : ""
                                        }
                        rounded-xl border-none`}
                                >
                                    <TableCell className={`font-medium text-center 
                                        ${index === 0 ? "pb-4" : "pb-0"}`}>{entry.rank}</TableCell>
                                    <TableCell>
                                        <div className={`flex items-center gap-2 text-center 
                                        ${index === 0 ? "pb-4" : "pb-0"}`}
                                        >
                                            <Badge color={entry.badgeColor} />
                                            {entry.level}
                                        </div>
                                    </TableCell>
                                    <TableCell className={`text-left 
                                    ${index === 0 ? "pb-4" : "pb-0"}`}
                                    >{entry.name}</TableCell>
                                    <TableCell className={`text-center
                                    ${index === 0 ? "pb-4" : "pb-0"}`}>{entry.streak}</TableCell>
                                    <TableCell className={`text-center
                                    ${index === 0 ? "pb-4" : "pb-0"}`}
                                    >{entry.totalTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="sticky -bottom-1 w-full bg-gradient-to-t from-white via-white/40 to-transparent h-20 -mt-20 pointer-events-none" />
                </div>
            </Card>

            <footer className="absolute mb-6 bottom-0 text-center flex w-full items-center justify-center flex-col">
                <div className="flex gap-1 w-full items-center justify-center">
                    <Button
                        variant="ghost"
                        className="py-3 w-[150px] bg-[#0EA5E9] text-sm font-semibold text-[#FFFFFF] hover:border-gray-400"
                    >
                        Leaderboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="py-3 w-[150px] bg-[#F8F8F8] text-sm font-semibold text-[#999999] hover:border-gray-400"
                    >
                        Session History
                    </Button>
                    <Button
                        variant="ghost"
                        className="py-3 w-[150px] bg-[#F8F8F8] text-sm font-semibold text-[#999999] hover:border-gray-400"
                    >
                        Profile
                    </Button>
                </div>
            </footer>
        </div>
    )
}

