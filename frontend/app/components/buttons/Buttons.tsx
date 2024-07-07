import styles from './Buttons.module.css'

export const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button className={styles.primaryButton} onClick={onClick}>
      {children}
    </button>
  )
}
