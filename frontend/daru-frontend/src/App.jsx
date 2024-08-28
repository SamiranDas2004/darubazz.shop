import { useState } from 'react'


import Navbar from './components/navbar/Navbar'

import { Route, Routes } from 'react-router-dom'
import CustomRoutes from './components/routes/Routes'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar/>

    <Routes>

     <Route path='/*' element={<CustomRoutes/>}/>

     
    </Routes>
    
    </>
  )
}

export default App