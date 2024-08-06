import { useState } from 'react'

import './App.css'
import PaymentPage from './pages/PaymentPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <PaymentPage/>
    </>
  )
}

export default App
