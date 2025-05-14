import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/admin/admin';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';
import LoginPage from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/register/register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import VerifyEmail from './pages/verifyEmail/verifyEmail';

function App() {
  
  return (
    <GoogleOAuthProvider clientId="1075471480289-v8hast14hs3qh63b4ohi14t4ro861cva.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position='top-right'/>
          <Routes path="/*">
            <Route path='/testing' element={<Testing />}></Route> 
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/verify-email' element={<VerifyEmail />}/>
            <Route path='/admin/*' element={<AdminPage />}/>
            <Route path='/*' element={<HomePage />}/>
          </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
