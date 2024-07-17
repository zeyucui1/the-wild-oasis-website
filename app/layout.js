import Header from '@/app/_components/Header'
import '@/app/_styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import { ReservationProvider } from './_components/ReservationContext'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome to The Wild Oasis',
  },
  description:
    'The Wild Oasis is a luxury resort in the heart of the wilderness. Book your stay today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 antialiased text-primary-100 min-h-screen ${josefin.className} flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full ">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
