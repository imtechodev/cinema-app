import { useState, useCallback } from 'react'
import { TICKET_TYPES } from './data'
import Hall from './components/Hall'
import OrderSummary from './components/OrderSummary'
import SuccessModal from './components/SuccessModal'
import styles from './App.module.css'

export default function App() {
  const [selectedType, setSelectedType] = useState('standard')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  const toggleSeat = useCallback((data) => {
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === data.id)
      if (exists) return prev.filter(s => s.id !== data.id)
      return [...prev, { ...data, ticketType: selectedType }]
    })
  }, [selectedType])

  const removeSeat = (id) => setSelectedSeats(prev => prev.filter(s => s.id !== id))

  const total = selectedSeats.reduce((s, seat) => s + TICKET_TYPES[seat.ticketType].price, 0)

  const handleBook = () => {
    setLastOrder({ seats: selectedSeats, total })
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setSelectedSeats([])
    setLastOrder(null)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>Cine<span>Book</span></div>
        <div className={styles.movieInfo}>
          <div className={styles.movieTitle}>Дюна: Часть Вторая</div>
          <div className={styles.movieMeta}>
            Сегодня · <span>19:30</span> · Зал 3 · 4DX IMAX
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          {/* Ticket type selector */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Тип билета</div>
            <div className={styles.ticketTypes}>
              {Object.values(TICKET_TYPES).map(t => (
                <button
                  key={t.key}
                  className={`${styles.ticketBtn} ${styles[t.key]} ${selectedType === t.key ? styles.active : ''}`}
                  onClick={() => setSelectedType(t.key)}
                >
                  <span className={styles.ticketEmoji}>{t.emoji}</span>
                  <span className={styles.ticketName}>{t.label}</span>
                  <span className={styles.ticketPrice}>{t.price} ₽</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hall */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Схема зала</div>
            <Hall
              selectedSeats={selectedSeats}
              onToggle={toggleSeat}
              ticketPrice={TICKET_TYPES[selectedType].price}
            />
          </div>
        </div>

        <aside className={styles.rightCol}>
          <OrderSummary
            selectedSeats={selectedSeats}
            onRemove={removeSeat}
            onBook={handleBook}
          />
        </aside>
      </div>

      {showModal && lastOrder && (
        <SuccessModal
          seats={lastOrder.seats}
          total={lastOrder.total}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
