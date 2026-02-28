import styles from './SuccessModal.module.css'

export default function SuccessModal({ seats, total, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <span className={styles.icon}>🎬</span>
        <h2 className={styles.title}>Бронь оформлена!</h2>
        <p className={styles.sub}>
          {seats.length} {seats.length === 1 ? 'билет' : 'билета'} успешно забронировано.<br />
          Приятного просмотра!
        </p>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Мест</span>
            <strong>{seats.length}</strong>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Сумма</span>
            <strong className={styles.price}>{total.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>Закрыть</button>
      </div>
    </div>
  )
}
