'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'
import { getBookings } from './data-service'

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}
// detele reservation
export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('Unauthorized: booking does not belong to this guest')
  }

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  if (error) throw new Error('Booking could not be deleted')
  revalidatePath('/account/reservations')
}
// update guest profile in nextjs Server component
export async function updateGuest(formData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get('nationality').split('%')
  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/
  if (!nationalIDRegex.test(nationalID)) {
    throw new Error(
      'Invalid nationalID: must be 6 to 12 alphanumeric characters'
    )
  }
  const updateData = { nationalID, nationality, countryFlag }
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single()

  if (error) throw new Error('Guest could not be updated')
  revalidatePath('/account/profile') // revalidate profile page
}
