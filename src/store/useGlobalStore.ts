import { create } from 'zustand'

type State = {
  detailsId: string
  setDetailsId: (id: string) => void
}

export const useGlobalStore = create<State>()((set) => ({
  detailsId: 'bitcoin',
  setDetailsId: (id) => set((state) => ({ ...state, detailsId: id })),
}))
