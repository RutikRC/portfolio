import { useState } from 'react'
import Universe from './component/Universe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Universe/>
    </>
  )
}

export default App
