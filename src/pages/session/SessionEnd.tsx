import AchievementCards from '@/components/achievement-cards'
import { Button } from '@/components/ui/button'

const SessionEnd = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-[350px] mx-auto space-y-6 flex-grow">
                <AchievementCards />
                <footer className=" mb-6 bottom-0 text-center flex w-full items-center justify-center flex-col">
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
