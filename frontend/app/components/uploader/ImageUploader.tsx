'use client'
import styles from './ImageUploader.module.css'
import { ChangeEvent } from 'react'
import { useUploaderStore } from '@/stores/uploader.store'

const ImageUploader = () => {
  const { setImagePreview, setImageFile } = useUploaderStore()
  const { imagePreview } = useUploaderStore()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setImageFile(file)
    }
  }

  return (
    <div className={styles.uploader}>
      <input type="file" accept="image/*" onChange={handleImageChange} className={styles.inputFile} />
      {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className={styles.imgPreview} />}
    </div>
  )
}

export default ImageUploader
