import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BlurBadge, CheckBadge, FireBadge, LevelBlurBadge, SingleLineBadge, TripleLineBadge } from "@/components/ui/SVGs"
import { MessageCircle } from "lucide-react"

export default function Page() {
    return (
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                {/* Floating decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* CheckBadge */}
                    <div className="absolute top-[20%] left-[15%] animate-float-slow" style={{ transform: 'rotate(-7.45deg)' }}>
                        <CheckBadge style={{ width: '64px', height: '64px' }} />
                    </div>
        
                    {/* BlurBadge */}
                    <div className="absolute top-[10%] right-[20%] animate-float" style={{ transform: 'rotate(13.53deg)', opacity: 0.5 }}>
                        <BlurBadge style={{ width: '64px', height: '64px' }} />
                    </div>
        
                    {/* TripleLineBadge */}
                    <div className="absolute bottom-[5%] left-[20%] animate-float-slow" style={{ transform: 'rotate(10.57deg)', opacity: 0.9 }}>
                        <TripleLineBadge style={{ width: '64px', height: '64px' }} />
                    </div>
        
                    {/* LevelBlurBadge */}
                    <div className="absolute bottom-[30%] left-[10%] animate-float-slow" style={{ transform: 'rotate(-15deg)', opacity: 0.5 }}>
                        <LevelBlurBadge style={{ width: '64px', height: '64px' }} />
                    </div>
        
                    {/* FireBadge */}
                    <div className="absolute bottom-[20%] right-[25%] animate-float" style={{ transform: 'rotate(-6.43deg)' }}>
                        <FireBadge style={{ width: '64px', height: '64px' }} />
                    </div>
        
                    {/* SingleLineBadge */}
                    <div className="absolute top-[40%] right-[15%] animate-float-slow" style={{ transform: 'rotate(-14.46deg)', opacity: 0.9 }}>
                        <SingleLineBadge style={{ width: '64px', height: '64px' }} />
                    </div>
                </div>

            {/* Main content */}
            <div className="relative z-10 max-w-2xl w-full h-full justify-between flex flex-col">
                <main className="relative text-center px-4 flex flex-col items-center justify-center flex-1">
                    <h2 className="text-[40px]/[48px] font-bold text-center text-gray-900 mb-3">
                        Level Up Your <span className="block">Productivity Game</span>
                    </h2>

                    <p className="text-[#00000080] mb-16 px-10 text-base/[22px] font-medium">
                        Stay focused, track your time, and achieve your<br /> goals with the power of AI on your side.
                    </p>

                    {/* Chat card */}
                    <div className="w-[424px] bg-background border border-[#F5F5F5] p-2 rounded-xl">
                        <Card className="bg-[#22C55EE5] shadow-inset-heavy p-4 mb-2 flex items-center gap-2 mx-auto backdrop-blur-light">
                            {/* <div className="flex items-center gap-2"> */}
                                <div
                                    className="aspect-square h-[60px] rounded-sm flex-shrink-0 bg-cover bg-center shadow-inset-soft hover:shadow-inset-glow transition duration-300"
                                    style={{
                                        backgroundImage: "url('/luna.png?height=48&width=48')",
                                    }}
                                />

                                <p className="font-semibold justified text-left text-sm/[18px] tracking-[-0.02em] text-white">
                                    Hi there! I'm Audrey, your personal productivity buddy. I'm here to keep you focused, motivated, and
                                    on track. Ready to get started?
                                </p>
                            {/* </div> */}
                        </Card>
                        {/* Action buttons */}
                        <div className="flex gap-1 justify-center w-full h-10">
                            <Button className="w-full h-full bg-[#0EA5E9] font-semibold text-sm/4 tracking-[-0.01em] ">
                                Setup new Session
                            </Button>
                            <Button variant="outline" className="w-full h-full bg-[#FAFAFA] border-none font-semibold text-sm/4 tracking-[-0.01em] text-[#A3A3A3]">
                                Start Session now
                            </Button>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="absolute mb-6 bottom-0 w-full text-center">
                    <Button variant="ghost" className="w-[150px] bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400">
                        About
                    </Button>
                </footer>
            </div>
        </div>
    )
}

