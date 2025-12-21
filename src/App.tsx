import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home-page/HomePage'
import DashboardCVs from './pages/dashboard-cvs/DashboardCvs'
import TemplatesPage from './pages/templates-page/TemplatesPage'
import JobPage from './pages/job-page/JobPage'
import AccountPage from './pages/account-page/AccountPage'
import CreateCv from './pages/create-cv/CreateCv'
import RemoteInfoBubble from './components/remote-info-bubble/RemoteInfoBubble'
import { useDispatch, useSelector } from 'react-redux'
import type { IState } from './interfaces/IState'
import PricingPage from './pages/pricing-page/PricingPage'
import Footer from './components/footer/Footer'
import TemplatesPopup from './components/templates-popup/TemplatesPopup'
import { useEffect, useState } from 'react'
import { checkSession, logout } from './api/auth'
import { clearUser, setUser } from './reducers/userSlice'
import CreateNewCvPopup from './components/create-new-cv-popup/CreateNewCvPopup'
import { addFavoriteTemplateApi } from './api/user'
import AdminPage from './pages/admin-page/AdminPage'
import { TbPencilPlus } from 'react-icons/tb'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true); // Controla el loading full-screen
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  const user = useSelector((state:IState)=>state.user)
  const {isOpen} = useSelector((state:IState)=>state.cvCreation)
  const { templatesPopupOpen } = useSelector(
    (state: IState) => state.toolbarOption
  );

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await checkSession();
        if (res.user && res.user.logged) {
          dispatch(setUser(res.user)); // guarda usuario en Redux
          
          // Después de login exitoso
          const localFavs = JSON.parse(localStorage.getItem("localFavorites") || "[]");
          if (localFavs.length > 0) {
            for (const id of localFavs) {
              await addFavoriteTemplateApi(id);
          }
            localStorage.removeItem("localFavorites");
          };
        } else if (res.user && res.user.email !== "" && res.user.logged === false) {
          await logout()
          dispatch(clearUser()); // limpia si no hay sesión
        } else {
          dispatch(clearUser()); // limpia si no hay sesión
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error al verificar sesión:", err);
        setIsLoading(false)
        dispatch(clearUser());
      }
    };
    
    verifySession();
  }, [dispatch]);

  if (isLoading) {
  return (
    <div className="app__loading-overlay">
      <div className="app__loading-container">
        <h2 className="app__loading-title"><TbPencilPlus /> CvRemoto</h2>
        <div className="app__loading-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

  return (
    <>
    <BrowserRouter>
      <section className="app">
        {sidebarOption !== "create" && <Navbar/>}

        {/* popups globales */}
        <RemoteInfoBubble/>
        {templatesPopupOpen && <TemplatesPopup/>}
        {isOpen && <CreateNewCvPopup/>}

        {/* paginas */}
        <Outlet/>

        {/* Rutas */}
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='cvs' element={<DashboardCVs/>} />
            <Route path="create/:cvId?" element={<CreateCv />} />
            <Route path='templates' element={<TemplatesPage/>} />
            <Route path='pricing' element={<PricingPage/>} />
            <Route path='affiliate' element={<JobPage/>} />
            <Route path='account' element={<AccountPage/>} />
            <Route path='admin' element={<AdminPage/>} />
        </Routes>
      </section>
    </BrowserRouter>
    </>
  )
}

export default App
