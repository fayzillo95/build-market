import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sign from './page/Sign'
import { ThemeProvider } from '@emotion/react'
import { Button, CircularProgress, createTheme, CssBaseline } from '@mui/material'
import { useDarck } from './store/DarkModeStore'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Otp from './page/Otp'
import { emailStore } from './store/SignStorage'
import { isLoadingStore } from './store/LoadingStore'
import { userStorage } from './store/User.store'
import { ApiStore } from './store/ApiAuth.store'
import { accessTokenStore } from './store/IsAuth.store'

function App() {
  const {isLoadingModal} = isLoadingStore()

  const { isDark } = useDarck()
  const {email} = emailStore()
  const {user,setUser} = userStorage()
  const {api,setHeader} = ApiStore()
  const headers = { Authorization: "Bearer " + localStorage.getItem("accessToken") }
  setHeader(headers)

  useEffect(() => {
    api.get("users/get-my").then(request => {
      const user = request.response.data.user
      console.log(user)
    }).catch(err => console.log(err))
  },[])

  const them = createTheme({
    palette: {
      mode: isDark ? "dark" : "light"
    }
  })

  return (
    <ThemeProvider theme={them}>
      <CssBaseline />
      <div className={`inset-0 bg-[rgba(1,1,1,0.7)] flex items-center justify-center w-screen h-screen fixed z-50 ${isLoadingModal ? "" : "hidden"}`}>
        <CircularProgress size={150}>

        </CircularProgress>
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<main>Main</main>} />
          <Route path='/contact' element={<main>Contact</main>} />
          <Route path='/sign' element={<Sign />} />
          <Route path='/otp' element={<Otp email={email} url={"http://localhost:15975/api/auth/verify-register"}/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
