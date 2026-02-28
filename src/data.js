export const TICKET_TYPES = {
  standard: { key: 'standard', label: 'Стандарт', price: 350, color: '#3b82f6', emoji: '🎟️' },
  vip:      { key: 'vip',      label: 'VIP',       price: 750, color: '#a855f7', emoji: '👑' },
  child:    { key: 'child',    label: 'Детский',   price: 200, color: '#22c55e', emoji: '🧒' },
}

export const ROWS = ['A','B','C','D','E','F','G','H','J','K']

export function generateHall() {
  const hall = {}
  ROWS.forEach(row => {
    const isVip = row === 'A' || row === 'B'
    const count = isVip ? 8 : 10
    hall[row] = Array.from({ length: count }, (_, i) => ({
      id: `${row}${i + 1}`,
      row,
      seat: i + 1,
      type: isVip ? 'vip' : 'standard',
      taken: Math.random() < 0.27,
    }))
  })
  return hall
}

export const HALL = generateHall()
