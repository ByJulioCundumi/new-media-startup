import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import HomePage from './pages/home-page/HomePage'
import DashboardCVs from './pages/dashboard-cvs/DashboardCvs'
import LoggedSection from './pages/logged-section/LoggedSection'
import TemplatesPage from './pages/templates-page/TemplatesPage'
import JobPage from './pages/job-page/JobPage'
import AccountPage from './pages/account-page/AccountPage'
import CreateCv from './pages/create-cv/CreateCv'
import RemoteInfoBubble from './components/remote-info-bubble/RemoteInfoBubble'

function App() {

  return (
    <>
    <BrowserRouter>
      <section className="app">
        <RemoteInfoBubble/>

        {/* Rutas */}
        <Routes>
          <Route path='/' element={<HomePage/>}>

          </Route>

          <Route path='/app' element={<LoggedSection/>}>
            <Route path='' element={<DashboardCVs/>} />
            <Route path='create' element={<CreateCv/>} />
            <Route path='templates' element={<TemplatesPage/>} />
            <Route path='job' element={<JobPage/>} />

            <Route path='account' element={<AccountPage/>} />
          </Route>
        </Routes>
      </section>
    </BrowserRouter>
    </>
  )
}

export default App
