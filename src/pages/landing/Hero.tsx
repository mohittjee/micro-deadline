import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BlurBadge, CheckBadge, FireBadge, LevelBlurBadge, SingleLineBadge, TripleLineBadge } from "@/components/ui/SVGs"
import { MessageCircle } from "lucide-react"

export default function Page() {
    return (
        <div className="w-full h-full  relative overflow-hidden flex items-center justify-center">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] animate-float-slow">
                    <CheckBadge />
                </div>
                <div className="absolute top-[10%] right-[20%] animate-float">
                    <BlurBadge />
                </div>
                <div className="absolute bottom-[5%] left-[20%] animate-float-slow">
                    <TripleLineBadge />

                </div>
                <div className="absolute bottom-[30%] left-[10%] animate-float-slow">
                    <LevelBlurBadge />
                </div>
                <div className="absolute bottom-[20%] right-[25%] animate-float">
                    <FireBadge />
                </div>
                <div className="absolute top-[40%] right-[15%] animate-float-slow">
                    <SingleLineBadge />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-2xl w-full h-full justify-between flex flex-col">
                <main className="relative text-center px-4 flex flex-col items-center justify-center flex-1">
                    <h2 className="text-[40px]/[48px] font-bold text-center text-gray-900 mb-6">
                        Level Up Your <span className="block">Productivity Game</span>
                    </h2>

                    <p className="text-[#00000080] mb-12 px-10 text-base/[22px] font-medium">
                        Stay focused, track your time, and achieve your<br /> goals with the power of AI on your side.
                    </p>

                    {/* Chat card */}
                    <div className="w-4/6 bg-background border border-[#F5F5F5] p-2 shadow-lg rounded-xl">
                        <Card className="bg-[#22C55EE5] shadow-inset-heavy p-4 mb-2 mx-auto backdrop-blur-light">
                            <div className="flex gap-4 items-center">
                                <div
                                    className="w-12 h-12 rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
                                    style={{
                                        backgroundImage: "url('/luna.png?height=48&width=48')",
                                    }}
                                />

                                <div className="text-left text-white">
                                    <p className=" font-semibold text-sm">
                                        Hi there! I'm Audrey, your personal productivity buddy. I'm here to keep you focused, motivated, and
                                        on track. Ready to get started?
                                    </p>
                                </div>
                            </div>
                        </Card>
                        {/* Action buttons */}
                        <div className="flex gap-1 justify-center w-full">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600  ">
                                Setup new Session
                            </Button>
                            <Button variant="outline" className="w-full bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400">
                                Start Session now
                            </Button>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="absolute mb-6 bottom-0 w-full text-center">
                    <Button variant="ghost" className="bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400">
                        About
                    </Button>
                </footer>
            </div>
        </div>
    )
}

