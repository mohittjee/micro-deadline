import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useId } from "react"
import { Slider } from "@/components/ui/slider"
import { useNavigate } from "react-router-dom"
import useAppStore from "@/store/useAppStore"

interface Avatar {
  name: string
  description: string
  badges: string[]
  themeGradient: string
  badgeColor: string
}

interface AvatarCollection {
  [key: string]: Avatar
}

const avatarData: AvatarCollection = {
  miko: {
    name: "Miko",
    description:
      "Meet Miko, she's basically your hype-person. She can't help but do digital backflips every time you accomplish something, and trust me her enthusiasm is hilariously contagious!",
    badges: ["Sweet", "Cheerful"],
    themeGradient: "bg-miko",
    badgeColor: "bg-[#EC4899]",
  },
  kai: {
    name: "Kai",
    description:
      "Kai was a chill music DJ AI, curating lo-fi playlists for stressed-out users. He's bringing his relaxed vibe to help you stay focused without pressure.",
    badges: ["Chill", "Encouraging"],
    themeGradient: "bg-kai",
    badgeColor: "bg-[#F59E0B]",
  },
  daniel: {
    name: "Daniel",
    description:
      "Daniel was built as an elite project manager AI, designed to keep teams on track. His no-nonsense approach is now tailored to helping you hit your goals.",
    badges: ["Chill", "Encouraging"],
    themeGradient: "bg-daniel",
    badgeColor: "bg-[#3B82F6]",
  },
  akira: {
    name: "Akira",
    description:
      "Akira was the voice of a popular anime game, inspiring players to rise to the challenge. Her commanding presence is now here to push you to greatness with a dash of elegance.",
    badges: ["Confident", "Commanding"],
    themeGradient: "bg-akira",
    badgeColor: "bg-[#EF4444]",
  },
  luna: {
    name: "Luna",
    description:
      "Luna used to be a virtual assistant for meditation and wellness, honing her ability to bring calm and focus to anyone in need. Now, she's here to guide you with her serene and supportive nature.",
    badges: ["Calm", "Supportive"],
    themeGradient: "bg-luna",
    badgeColor: "bg-[#34D399]",
  },
  blaze: {
    name: "Blaze",
    description:
      "Blaze was once a coach for a virtual fitness app, hyping users up to smash their goals. Her passion for motivation led her to join as your AI, ready to energize and inspire.",
    badges: ["Energetic", "Motivational"],
    themeGradient: "bg-blaze",
    badgeColor: "bg-[#0EA5E9]",
  },
}

const AvatarOnboarding = () => {
  const id = useId()
  const navigate = useNavigate()
  const {
    userName,
    userOccupation,
    userStudy,
    selectedAvatar,
    additionalNotes,
    aiVolume,
    setUserName,
    setUserOccupation,
    setUserStudy,
    setSelectedAvatar,
    setAdditionalNotes,
    setAiVolume,
  } = useAppStore()

  const currentAvatar = avatarData[selectedAvatar]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <Card className="relative w-[888px] grid grid-cols-2 p-2 shadow-none">
        <div className="flex flex-col gap-6 p-12 text-[#262626]">
          <div>
            <p className="mb-1.5 block font-semibold text-xs">What should Voice AI call you?</p>
            <Input
              type="name"
              placeholder="Your Name"
              className="placeholder:text-sm text-sm placeholder:font-medium font-medium placeholder:text-[#999999] placeholder:tracking-[-0.01em]"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1.5 block font-semibold text-xs">Do you work or study?</p>
            <div className="inline-flex h-10 rounded-lg bg-input/50 p-0.5 w-full">
              <RadioGroup
                value={userOccupation}
                onValueChange={setUserOccupation}
                className="group relative inline-grid grid-cols-[1fr_1fr] w-full text-white items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-[#0EA5E9] after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=work]:after:translate-x-0 data-[state=study]:after:translate-x-full"
                data-state={userOccupation}
              >
                <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=study]:text-muted-foreground/70">
                  Work
                  <RadioGroupItem id={`${id}-1`} value="work" className="sr-only" />
                </label>
                <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=work]:text-muted-foreground/70">
                  Study
                  <RadioGroupItem id={`${id}-2`} value="study" className="sr-only" />
                </label>
              </RadioGroup>
            </div>
          </div>
          <div>
            <p className="mb-1.5 block font-semibold text-xs">What are you studying?</p>
            <Input
              id="studying"
              placeholder="Psychology at Princeton, Class of 24"
              className="placeholder:text-sm text-sm placeholder:font-medium font-medium placeholder:text-[#999999] placeholder:tracking-[-0.01em]"
              value={userStudy}
              onChange={(e) => setUserStudy(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1.5 block font-semibold text-xs">AI Voice</p>
            <Select value={selectedAvatar} onValueChange={setSelectedAvatar}>
              <SelectTrigger className="w-full h-10 shadow-none border text-sm font-medium placeholder:tracking-[-0.01em]">
                <SelectValue placeholder="Select AI Avatar" />
              </SelectTrigger>
              <SelectContent className="text-sm font-medium placeholder:tracking-[-0.01em]">
                {Object.keys(avatarData).map((key) => (
                  <SelectItem key={key} value={key}>
                    {avatarData[key].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-1.5 block font-semibold text-xs">Additional notes to AI</p>
            <Input
              id="additional-notes"
              placeholder="Suggest additional behaviours, habits,..."
              className="placeholder:text-sm text-sm placeholder:font-medium font-medium placeholder:text-[#999999] placeholder:tracking-[-0.01em]"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1.5 block font-semibold text-xs">AI Volume</p>
            <div className="flex items-center space-x-1">
              <Slider
                className="h-10 py-1 px-1.5 bg-[#F8F8F8] rounded-md [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-[#0EA5E9] [&>:last-child>span]:ring-offset-0"
                value={[aiVolume]}
                onValueChange={(value) => setAiVolume(value[0])}
                aria-label="Slider with output"
                trackClassName="h-full rounded-md bg-[#F8F8F8]"
                rangeClassName="bg-[#0EA5E9]"
              />
              <output className="bg-[#0EA5E9] flex justify-center items-center rounded-md font-semibold px-3 py-2 h-10 text-sm text-white w-[52px] tabular-nums">
                {aiVolume}
              </output>
            </div>
          </div>
        </div>

        <Card
          className={`w-full  ${currentAvatar.themeGradient} backdrop-blur-64 border-none rounded-lg shadow-inset-hard`}
        >
          <div className="bg-white/10 backdrop-blur-3xl shadow-inset-glow-64 px-14 pt-12 flex flex-col items-center gap-6 rounded-lg border-none">
            <div
              className="w-full aspect-square rounded-lg flex-shrink-0 bg-cover bg-center shadow-inset-avatar bg-gradient-avatar"
              style={{
                backgroundImage: `url('/${currentAvatar.name}.png')`,
              }}
            />

            <div className="w-full flex flex-col gap-6 pb-[2.375rem] items-center text-[#262626]">
              <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-xl/5">{currentAvatar.name}</span>
                <p className="text-[#999999] font-medium text-sm text-center px-2">{currentAvatar.description}</p>
              </div>
              <div className="flex justify-end space-x-1">
                {currentAvatar.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`${currentAvatar.badgeColor} text-xs font-bold text-white rounded-xl shadow-inset-badge border-none px-2 py-1`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Card>

      <footer className="absolute mb-6 bottom-0 text-center flex gap-6 w-full items-center justify-center flex-col">
        <div className="flex gap-2 w-full items-center justify-center">
          <Button
            variant="ghost"
            className="w-[171px] py-3 text-sm bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400"
            onClick={() => navigate("/session-settings")}
          >
            Skip
          </Button>
          <Button
            className="bg-[#FAFAFA] py-3 w-[171px] text-sm shadow-none bg-foreground font-semibold hover:border-gray-400"
            onClick={() => navigate("/session-settings")}
          >
            Continue
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default AvatarOnboarding









// export const NewSession = () => {
//   const id = useId();
//   const [selectedValue, setSelectedValue] = useState("on");
//   return (
//     <div className='relative w-full h-full flex flex-col items-center justify-center'>
//       <Card className="relative w-[888px] grid grid-cols-2 p-2 shadow-none">
//         <div className="flex flex-col gap-6 p-12 text-[#262626]">
//           <div>
//             <p className="mb-1.5 block font-semibold text-xs">
//               What are we working on today?
//             </p>
//             <Textarea className='border-none bg-[#F8F8F8] h-24 overflow-auto rounded-md resize-none' placeholder='Write a short description' />
//           </div>
//           <div>
//             <p className="mb-1.5 block font-semibold text-xs">
//               Set Timer
//             </p>
//             <div className="flex items-center justify-center rounded-lg space-x-1 h-10 bg-[#F8F8F8]">
//               <span className='text-[#999999] font-semibold text-sm'>00:30:00</span>

//               {/* <Progress className='h-8 bg-[#F8F8F8] rounded-md' value={33} />
//               <Button className='bg-[#0EA5E9] border-none outline-none hover:border-none hover:outline-none'>30:00</Button> */}
//             </div>
//           </div>
//           <div>
//             <p className="mb-1.5 block font-semibold text-xs">
//               AI Check In
//             </p>
//             <div className="inline-flex h-9 rounded-lg bg-input/50 p-0.5 w-full">
//               <RadioGroup
//                 value={selectedValue}
//                 onValueChange={setSelectedValue}
//                 className="group relative inline-grid grid-cols-[1fr_1fr] w-full text-white items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-[#0EA5E9] after:shadow-sm after:shadow-black/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
//                 data-state={selectedValue}
//               >
//                 <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-muted-foreground/70">
//                   On
//                   <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
//                 </label>
//                 <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=off]:text-muted-foreground/70">
//                   Off
//                   <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
//                 </label>
//               </RadioGroup>
//             </div>
//           </div>
//           <div>
//             <p className="mb-1.5 block font-semibold text-xs">
//               Check In every
//             </p>
//             <div className="flex rounded-lg items-center justify-center space-x-1 h-10 bg-[#F8F8F8]">
//               <span className='text-[#999999] font-semibold text-sm'>00:30:00</span>
//               {/* <Progress className='h-8 bg-[#F8F8F8] rounded-md' value={33} />
//               <Button className='bg-[#0EA5E9] border-none outline-none hover:border-none hover:outline-none'>15:00</Button> */}
//             </div>
//           </div>
//         </div>

//         <Card className="w-full px-14 pt-12 gap-6 bg-miko backdrop-blur-64 border-none rounded-lg shadow-inset-hard flex flex-col items-center">
//           <div
//             className="w-full aspect-square rounded-lg flex-shrink-0 bg-cover bg-center shadow-inset-avatar bg-gradient-avatar"
//             style={{
//               backgroundImage: "url('/Miko.png')",
//             }}
//           />

//           <div className='w-full flex flex-col gap-6 items-center text-[#262626]'>
//             <div className='flex flex-col items-center gap-2'>
//               <span className='font-semibold text-xl/5'>Miko</span>
//               <p className='text-[#999999] font-medium text-sm text-center px-2'>Meet Miko, she's basically your hype-person. She can't help but do digital backflips every time you accomplish something, and trust me her enthusiasm is hilariously contagious!</p>
//             </div>
//             <div className="flex justify-end pb-[42px] space-x-1">
//               <Badge variant="outline" className='bg-[#EC4899] text-xs font-bold text-white rounded-xl shadow-inset-badge border-none'>
//                 Sweet
//               </Badge>
//               <Badge variant="outline" className='bg-[#EC4899] text-xs font-bold text-white rounded-xl shadow-inset-badge border-none'>
//                 Cheerful
//               </Badge>
//             </div>
//           </div>
//         </Card>
//       </Card>

//       <footer className="absolute mb-6 bottom-0 text-center flex gap-6 w-full items-center justify-center flex-col">
//         <div className='flex'>
//           <Dot className='' />
//           <Dot />
//         </div>
//         <div className='flex gap-2 w-full items-center justify-center'>
//           <Button variant="ghost" className="w-[171px] py-3 text-sm  bg-[#FAFAFA] font-semibold text-[#A3A3A3] hover:border-gray-400">
//             Skip
//           </Button>
//           <Button className="bg-[#FAFAFA] py-3 w-[171px] text-sm shadow-none bg-foreground font-semibold hover:border-gray-400">
//             Continue
//           </Button>
//         </div>
//       </footer>
//     </div>
//   );
// };