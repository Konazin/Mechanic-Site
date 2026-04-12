import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Scheduling from './pages/Scheduling'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/services"    element={<Services />} />
            <Route path="/about"       element={<About />} />
            <Route path="/scheduling"  element={<Scheduling />} />
            <Route path="/login"       element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
