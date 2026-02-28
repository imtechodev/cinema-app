import Seat from './Seat'
import styles from './Hall.module.css'
import { ROWS, HALL } from '../data'

export default function Hall({ selectedSeats, onToggle, ticketPrice }) {
  return (
    <div className={styles.container}>
      <div className={styles.screenWrap}>
        <div className={styles.screen} />
        <span className={styles.screenLabel}>Экран</span>
      </div>

      <div className={styles.hall}>
        {ROWS.map(rowId => {
          const seats = HALL[rowId]
          const half = Math.ceil(seats.length / 2)
          const left = seats.slice(0, half)
          const right = seats.slice(half)
          return (
            <div className={styles.row} key={rowId}>
              <span className={styles.rowLabel}>{rowId}</span>
              <div className={styles.seatsGroup}>
                {left.map(s => (
                  <Seat
                    key={s.id}
                    data={s}
                    selected={!!selectedSeats.find(ss => ss.id === s.id)}
                    onToggle={onToggle}
                    ticketPrice={ticketPrice}
                  />
                ))}
              </div>
              <div className={styles.gap} />
              <div className={styles.seatsGroup}>
                {right.map(s => (
                  <Seat
                    key={s.id}
                    data={s}
                    selected={!!selectedSeats.find(ss => ss.id === s.id)}
                    onToggle={onToggle}
                    ticketPrice={ticketPrice}
                  />
                ))}
              </div>
              <span className={styles.rowLabel}>{rowId}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{background:'linear-gradient(135deg,#1d4ed8,#3b82f6)'}} />
          Стандарт
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{background:'linear-gradient(135deg,#7c3aed,#a855f7)'}} />
          VIP (ряды A–B)
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{background:'linear-gradient(135deg,#b45309,#e8b84b)'}} />
          Выбрано
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dot} style={{background:'#1e1e2e'}} />
          Занято
        </div>
      </div>
    </div>
  )
}
