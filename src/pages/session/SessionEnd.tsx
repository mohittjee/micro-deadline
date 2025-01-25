import AchievementCards from '@/components/achievement-cards'
import { Button } from '@/components/ui/button'

const SessionEnd = () => {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <div className="w-1/3 mx-auto space-y-4 flex-grow">
                <AchievementCards />
            </div>
            <footer className="mt-4 mb-6 text-center flex w-full items-center justify-center flex-col">
                <Button
                    className="py-3 bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                >
                    Close
                </Button>
                <Button
                    className="py-3 bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
                >
                    Share
                </Button>
            </footer>
        </div>
    )
}

export default SessionEnd
