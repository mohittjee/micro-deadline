import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Avatar {
  name: string
  description: string
  badges: string[]
  themeGradient: string
  badgeColor: string
}

interface AppState {
  timerValue: number
  aiCheckinValue: number
  aiCheckIn: boolean
  isAIVolume: boolean
  micOn: boolean
  timerOn: boolean
  isPause: boolean
  selectedValue: string
  activeTaskId: number | null
  tasks: Task[]
  userName: string
  userOccupation: string
  userStudy: string
  selectedAvatar: string
  additionalNotes: string
  aiVolume: number
  workStudyDescription: string
  timerClick: boolean
  setTimerValue: (value: number) => void
  setAiCheckinValue: (value: number) => void
  setAiCheckIn: (value: boolean) => void
  setIsAIVolume: (value: boolean) => void
  setMicOn: (value: boolean) => void
  setTimerOn: (value: boolean) => void
  setIsPause: (value: boolean) => void
  setSelectedValue: (value: string) => void
  setActiveTaskId: (id: number | null) => void
  addTask: (task: Task) => void
  updateTask: (id: number, updates: Partial<Task>) => void
  removeTask: (id: number) => void
  setUserName: (name: string) => void
  setUserOccupation: (occupation: string) => void
  setUserStudy: (study: string) => void
  setSelectedAvatar: (avatar: string) => void
  setAdditionalNotes: (notes: string) => void
  setAiVolume: (volume: number) => void
  setWorkStudyDescription: (description: string) => void
  setTimerClick: (value: boolean) => void
}

interface Task {
  id: number
  name: string
  duration: number
  isPlaying: boolean
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      timerValue: 25,
      aiCheckinValue: 20,
      aiCheckIn: false,
      isAIVolume: false,
      micOn: false,
      timerOn: false,
      isPause: false,
      selectedValue: "on",
      activeTaskId: null,
      tasks: [],
      userName: "",
      userOccupation: "study",
      userStudy: "",
      selectedAvatar: "miko",
      additionalNotes: "",
      aiVolume: 25,
      workStudyDescription: "",
      timerClick: false,
      setTimerValue: (value) => set({ timerValue: value }),
      setAiCheckinValue: (value) => set({ aiCheckinValue: value }),
      setAiCheckIn: (value) => set({ aiCheckIn: value }),
      setIsAIVolume: (value) => set({ isAIVolume: value }),
      setMicOn: (value) => set({ micOn: value }),
      setTimerOn: (value) => set({ timerOn: value }),
      setIsPause: (value) => set({ isPause: value }),
      setSelectedValue: (value) => set({ selectedValue: value }),
      setActiveTaskId: (id) => set({ activeTaskId: id }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setUserName: (name) => set({ userName: name }),
      setUserOccupation: (occupation) => set({ userOccupation: occupation }),
      setUserStudy: (study) => set({ userStudy: study }),
      setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
      setAdditionalNotes: (notes) => set({ additionalNotes: notes }),
      setAiVolume: (volume) => set({ aiVolume: volume }),
      setWorkStudyDescription: (description) => set({ workStudyDescription: description }),
      setTimerClick: (value) => set({ timerClick: value }),
    }),
    {
      name: "app-storage",
    },
  ),
)

export default useAppStore

