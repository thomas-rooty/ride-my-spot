'use client'
import styles from './ImageUploader.module.css'
import { ChangeEvent } from 'react'
import { useUploaderStore } from '@/stores/uploader.store'
import { PrimaryButton } from '@/app/components/buttons/Buttons'
import { isThisAGoodSpot } from '@/app/services/commons'

const ImageUploader = () => {
  const { setImagePreview, setImageFile } = useUploaderStore()
  const { imagePreview, imageFile } = useUploaderStore()

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

  const handleAnalysis = async () => {
    if (imageFile) {
      const formData = new FormData()
      formData.append('image', imageFile)

      try {
        const response = await isThisAGoodSpot(formData)
        console.log(response)
      } catch (error) {
        console.error('Error during analysis:', error)
      }
    }
  }

  return (
    <div className={styles.uploader}>
      <div className={styles.guesser}>
        <PrimaryButton onClick={handleAnalysis}>Analyze</PrimaryButton>
      </div>
      <div className={styles.inputContainer}>
        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.inputFile} />
        {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className={styles.imgPreview} />}
      </div>
    </div>
  )
}

export default ImageUploader
