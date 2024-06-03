import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/navbar/Navbar'
import Home from './components/homePage/Home'
import Category from './components/Category/Category'
import Overview from './components/Overview/Overview'
import { Route, Routes } from 'react-router-dom'
import CustomRoutes from './components/routes/CustomRoutes'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar/>

    <Routes>

     <Route path='/*' element={<CustomRoutes/>}/>

     
    </Routes>
    {/* <Home/>
    <Category/>
    <Overview/> */}
    </>
  )
}

export default App
