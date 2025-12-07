import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import HomePage from './pages/home-page/HomePage'
import DashboardCVs from './pages/dashboard-cvs/DashboardCvs'
import TemplatesPage from './pages/templates-page/TemplatesPage'
import JobPage from './pages/job-page/JobPage'
import AccountPage from './pages/account-page/AccountPage'
import CreateCv from './pages/create-cv/CreateCv'
import RemoteInfoBubble from './components/remote-info-bubble/RemoteInfoBubble'
import SubscriptionsPage from './pages/subscriptions-page/SubscriptionsPage'
import AppPages from './pages/app-pages/AppPages'
import { useSelector } from 'react-redux'
import type { IState } from './interfaces/IState'
import HomePageNavbar from './pages/home-page/home-page-navbar/HomePageNavbar'
import PricingPage from './pages/pricing-page/PricingPage'
import Footer from './components/footer/Footer'

function App() {
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)

  return (
    <>
    <BrowserRouter>
      <section className="app">
        {sidebarOption !== "create" && <Navbar/>}

        {/* popups globales */}
        <RemoteInfoBubble/>

        {/* paginas */}
        <Outlet/>

        {/* Rutas */}
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='cvs' element={<DashboardCVs/>} />
            <Route path='create' element={<CreateCv/>} />
            <Route path='templates' element={<TemplatesPage/>} />
            <Route path='pricing' element={<PricingPage/>} />
            <Route path='affiliate' element={<JobPage/>} />
            <Route path='account' element={<AccountPage/>} />
        </Routes>
      </section>
    </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App
