import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
 <StrictMode>
  <BrowserRouter>
  <AppContextProvider>
    <App/>
  </AppContextProvider>
 </BrowserRouter>
 </StrictMode>
)
