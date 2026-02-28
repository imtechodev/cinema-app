import styles from './Seat.module.css'

export default function Seat({ data, selected, onToggle, ticketPrice }) {
  if (data.taken) {
    return <button className={`${styles.seat} ${styles.taken}`} disabled aria-label="Занято" />
  }

  const cls = [
    styles.seat,
    styles[data.type],
    selected ? styles.selected : '',
  ].join(' ')

  return (
    <div className={styles.wrapper}>
      <button
        className={cls}
        onClick={() => onToggle(data)}
        aria-label={`Ряд ${data.row}, место ${data.seat}`}
      />
      {!selected && (
        <span className={styles.tooltip}>
          {data.row}{data.seat} · {data.type === 'vip' ? 'VIP' : 'Стандарт'} · {ticketPrice} ₽
        </span>
      )}
    </div>
  )
}
