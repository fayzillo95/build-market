import React from 'react'
import { useDarck } from '../store/DarkModeStore'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Button } from '@mui/material'

function Header() {
    const { isDark, setIsDark } = useDarck()

    return (
        <header className={`${isDark ? "bg-gray-800" : "bg-slate-500"}`}>
            <div className="container flex mx-auto justify-between py-5 items-center">
                <h1>Home</h1>
                <div className='w-max'>
                    <Button  onClick={() => setIsDark(!isDark)}>{isDark ? <LightMode /> : <DarkMode></DarkMode>}</Button>
                </div>
            </div>
        </header>
    )
}

export default Header