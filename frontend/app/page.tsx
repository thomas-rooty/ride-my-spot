import styles from './page.module.css'
import ImageUploader from '@/app/components/uploader/ImageUploader'

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Get started by editing</p>
      <ImageUploader />
    </main>
  )
}
