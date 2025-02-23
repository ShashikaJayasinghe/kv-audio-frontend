import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/admin/admin';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';

function App() {
  
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path='/testing' element={<Testing />}></Route>
        <Route path='/admin/*' element={<AdminPage />}/>
        <Route path='/*' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
