import './globals.css'
import { raleway } from './fonts'
import { Suspense } from 'react'

export const metadata = {
  title: 'Hawkes Asset Management',
  description: 'Asset Management Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ raleway.className}>
        <Suspense>
        {children}

        </Suspense>
        </body>    
    </html>
  )
}
