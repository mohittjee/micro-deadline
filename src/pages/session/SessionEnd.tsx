import AchievementCards from '@/components/achievement-cards'
import { Button } from '@/components/ui/button'

const SessionEnd = () => {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="w-1/3 mx-auto space-y-4 flex-grow">
                <AchievementCards />
                <footer className="text-center flex flex-col w-full items-center justify-center ">
                    <Button
                        className="py-3 bg-black w-full font-semibold  hover:border-gray-400"
                    >
                        Close
                    </Button>
                    <Button
                        className="py-3 bg-[#FAFAFA] hover:bg-white w-full font-semibold text-[#A3A3A3] hover:border-gray-400"
                    >
                        Share
                    </Button>
                </footer>
            </div>

        </div>
    )
}

export default SessionEnd
