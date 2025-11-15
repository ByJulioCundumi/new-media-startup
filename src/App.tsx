import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import HomePage from './pages/home-page/HomePage'

function App() {

  return (
    <>
    <BrowserRouter>
      <section className="app">

        {/* Rutas */}
        <Routes>
          <Route path='/' element={<HomePage/>}>

          </Route>
        </Routes>
      </section>
    </BrowserRouter>
    </>
  )
}

export default App
