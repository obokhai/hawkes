import './globals.css'
import { raleway } from './fonts'

export const metadata = {
  title: 'Hawkes Asset Management',
  description: 'Asset Management Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ raleway.className}>
        {children}
        </body>    
    </html>
  )
}
