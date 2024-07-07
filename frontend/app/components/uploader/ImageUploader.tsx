'use client'
import styles from './ImageUploader.module.css'
import { ChangeEvent, useState } from 'react'
import { useUploaderStore } from '@/stores/uploader.store'
import { PrimaryButton } from '@/app/components/buttons/Buttons'
import { isThisAGoodSpot } from '@/app/services/commons'
import { extractJsonFromString } from '@/app/utils/functions'

const ImageUploader = () => {
  const { setImagePreview, setImageFile } = useUploaderStore()
  const { imagePreview, imageFile } = useUploaderStore()
  const [loading, setLoading] = useState<boolean>(false)
  const [analysis, setAnalysis] = useState<string>('')
  const [jsonString, setJsonString] = useState<string>('')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Reset analysis
    setAnalysis('')
    setJsonString('')
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

      setLoading(true)
      setAnalysis('')
      setJsonString('')

      try {
        const res = await isThisAGoodSpot(formData)
        setAnalysis(res)
        const json = extractJsonFromString(res)
        if (json) {
          setJsonString(JSON.stringify(json, null, 2))
        }
      } catch (error) {
        console.error('Error during analysis:', error)
        setAnalysis('Analysis failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.uploader}>
      <div className={styles.guesser}>
        <PrimaryButton onClick={handleAnalysis}>Analyze</PrimaryButton>
        {loading && <p className={styles.loading}>Riding the spot for you...</p>}
        {analysis && <p className={styles.analysis}>{analysis}</p>}
        {jsonString && <pre className={styles.json}>{jsonString}</pre>}
      </div>
      <div className={styles.inputContainer}>
        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.inputFile} />
        {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className={styles.imgPreview} />}
      </div>
    </div>
  )
}

export default ImageUploader
