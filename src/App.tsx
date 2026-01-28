import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import DashboardCVs from './pages/dashboard-cvs/DashboardCvs'
import TemplatesPage from './pages/templates-page/TemplatesPage'
import AccountPage from './pages/account-page/AccountPage'
import CreateCv from './pages/create-cv/CreateCv'
import { useDispatch, useSelector } from 'react-redux'
import type { IState } from './interfaces/IState'
import PricingPage from './pages/pricing-page/PricingPage'
import TemplatesPopup from './components/templates-popup/TemplatesPopup'
import { useEffect, useState } from 'react'
import { checkSession, logout } from './api/auth'
import { clearUser, setUser } from './reducers/userSlice'
import CreateNewCvPopup from './components/create-new-cv-popup/CreateNewCvPopup'
import { addFavoriteTemplateApi } from './api/user'
import AdminPage from './pages/admin-page/AdminPage'
import Auth from './components/auth/Auth'
import OnlineCv from './pages/online-cv/OnlineCv'
import MobileNav from './components/mobile-nav/MobileNav'
import { PiReadCvLogo } from 'react-icons/pi'
import AffiliatePage from './pages/affililate-page/AffiliatePage'
import AuthGuard from './util/AuthGuard'
import AdminGuard from './util/AdminGuard'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home-page/HomePage'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true); // Controla el loading full-screen
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)
  const authModal = useSelector((state:IState)=>state.authModal)
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
        <h2 className="app__loading-title"><PiReadCvLogo /> CvRemoto</h2>
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
        {authModal.isOpen && <Auth/>}
        {templatesPopupOpen && <TemplatesPopup/>}
        {isOpen && <CreateNewCvPopup/>}
        <MobileNav/>

        <Toaster
        position="top-right"     // puedes cambiar a bottom-right, top-center, etc.
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#fcfcfc',
            color: '#ffa137',
          },
        }}
      />

        {/* paginas */}
        <Outlet/>

        {/* Rutas */}
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="cv/:publicId?" element={<OnlineCv />} />
            <Route path='cvs' element={<DashboardCVs/>} />
            <Route path="create/:cvId?" element={<CreateCv />} />
            <Route path='pricing' element={<PricingPage/>} />
            <Route path='affiliates' element={<AffiliatePage/>} />
            <Route path='account' element={
              <AuthGuard>
                <AccountPage />
              </AuthGuard>} />
            <Route path='admin' element={
              <AdminGuard>
                <AdminPage />
              </AdminGuard>} />
        </Routes>
      </section>
    </BrowserRouter>
    </>
  )
}

export default App
