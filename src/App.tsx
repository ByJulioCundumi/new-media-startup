import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home-page/HomePage'
import DashboardCVs from './pages/dashboard-cvs/DashboardCvs'
import TemplatesPage from './pages/templates-page/TemplatesPage'
import JobPage from './pages/job-page/JobPage'
import AccountPage from './pages/account-page/AccountPage'
import CreateCv from './pages/create-cv/CreateCv'
import RemoteInfoBubble from './components/remote-info-bubble/RemoteInfoBubble'
import { useSelector } from 'react-redux'
import type { IState } from './interfaces/IState'
import PricingPage from './pages/pricing-page/PricingPage'
import Footer from './components/footer/Footer'
import TemplatesPopup from './components/templates-popup/TemplatesPopup'

function App() {
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  const { templatesPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

  return (
    <>
    <BrowserRouter>
      <section className="app">
        {sidebarOption !== "create" && <Navbar/>}

        {/* popups globales */}
        <RemoteInfoBubble/>
        {templatesPopupOpen && <TemplatesPopup/>}

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
    {sidebarOption !== "cvs" && sidebarOption !== "create" && sidebarOption !== "affiliate" && <Footer/>}
    </>
  )
}

export default App
