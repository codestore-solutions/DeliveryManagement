
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, LandingPage, NotFound, } from './pages'
function App() {

  return (
    <Routes>
       <Route path='/' element={<LandingPage/>} />
       <Route path='/dashboard/*' element={<Dashboard/>} />
       <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
