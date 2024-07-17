'use client'
import { createContext, useContext, useState } from 'react'

const ReservationContext = createContext()

const ReservationProvider = ({ children }) => {
  const inialState = { from: undefined, to: undefined }
  const [range, setRange] = useState(inialState)
  const resetRange = () => setRange(inialState)
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  )
}
const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }
  return context
}
export { ReservationProvider, useReservation }
