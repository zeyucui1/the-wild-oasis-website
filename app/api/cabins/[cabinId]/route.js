import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service'

export async function GET(req, { params }) {
  const { cabinId } = params

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ])

    return new Response(JSON.stringify({ cabin, bookedDates }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
