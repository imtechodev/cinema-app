import { TICKET_TYPES } from '../data'
import styles from './OrderSummary.module.css'

export default function OrderSummary({ selectedSeats, onRemove, onBook }) {
  const total = selectedSeats.reduce((s, seat) => s + TICKET_TYPES[seat.ticketType].price, 0)
  const count = selectedSeats.length

  const plural = (n) => {
    if (n === 1) return 'место'
    if (n >= 2 && n <= 4) return 'места'
    return 'мест'
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.topTitle}>Ваши билеты</div>
        <div className={styles.topSub}>Дюна: Часть Вторая · 19:30 · Зал 3</div>
      </div>

      <div className={styles.body}>
        <div className={styles.seatsList}>
          {selectedSeats.length === 0
            ? <div className={styles.empty}>Нажмите на свободное место</div>
            : selectedSeats.map(s => (
              <div className={styles.seatItem} key={s.id}>
                <div className={styles.seatLeft}>
                  <span className={`${styles.badge} ${styles[s.ticketType]}`}>
                    {TICKET_TYPES[s.ticketType].label}
                  </span>
                  <span className={styles.seatPos}>Ряд {s.row}, место {s.seat}</span>
                </div>
                <div className={styles.seatRight}>
                  <span className={styles.seatPrice}>{TICKET_TYPES[s.ticketType].price} ₽</span>
                  <button className={styles.removeBtn} onClick={() => onRemove(s.id)}>✕</button>
                </div>
              </div>
            ))
          }
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Итого</span>
          <span className={styles.totalAmount}>{total.toLocaleString('ru-RU')} ₽</span>
        </div>

        <button
          className={styles.bookBtn}
          disabled={count === 0}
          onClick={onBook}
        >
          {count === 0
            ? 'Выберите места'
            : `Забронировать ${count} ${plural(count)}`}
        </button>
      </div>
    </div>
  )
}
