import { useState } from 'react'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='text-2xl'>Hola, Mundo!</h1>
      <Dashboard/>
    </div>
  )
}

export default App
