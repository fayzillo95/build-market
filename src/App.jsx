import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sign from './page/Sign'
import { ThemeProvider } from '@emotion/react'
import { Button, createTheme, CssBaseline } from '@mui/material'
import { useDarck } from './store/DarkModeStore'
import Header from './components/Header'

function App() {

  const {isDark} = useDarck()

  const them = createTheme({
    palette: {
      mode: isDark ? "dark" : "light"
    }
  })

  return (
    <ThemeProvider theme={them}>
      <CssBaseline />
      <Header/>
      <Sign />
    </ThemeProvider>
  )
}

export default App
