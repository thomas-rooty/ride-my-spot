import { create } from 'zustand'

interface UploaderStore {
  imagePreview: string | null
  imageFile: File | null
  setImagePreview: (preview: string) => void
  setImageFile: (file: File) => void
}

export const useUploaderStore = create<UploaderStore>()((set) => ({
  imagePreview: null,
  imageFile: null,
  setImagePreview: (preview) => set({ imagePreview: preview }),
  setImageFile: (file) => set({ imageFile: file }),
}))
