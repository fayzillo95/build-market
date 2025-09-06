import React from 'react'
import { useDarck } from '../store/DarkModeStore'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Button, List, ListItem } from '@mui/material'
import logo_png from "../assets/Vector.png"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { accessTokenStore, authStore, refreshTokenStore } from '../store/IsAuth.store'
import { userStorage } from '../store/User.store'

function Header() {

    const navigate = useNavigate()
    const currentPath = window.location.pathname
    const { isDark, setIsDark } = useDarck()
    const { isAuth, setIsAuth } = authStore();
    const { setaccessToken } = accessTokenStore();
    const { setrefreshToken } = refreshTokenStore();
    // const {user} = userStorage()    

    const logoutHandle = () => {
        setaccessToken(null); 
        setrefreshToken(null); 
        setIsAuth(false);
        navigate("/sign")
    }

    return (
        <header className={`${isDark ? "bg-gray-800" : "bg-slate-500"}`}>
            <div className="container flex mx-auto justify-between py-5 items-center">
                <h1 className='flex gap-x-2 items-center'>
                    <img src={logo_png} alt="" />
                    Home
                </h1>

                <List sx={{ display: "flex" }} >
                    <ListItem>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/properties">
                            Properties
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/contact">
                            Contact
                        </NavLink>
                    </ListItem>
                </List>

                <div className='w-max flex justify-between gap-x-6 items-center'>
                    <Button onClick={() => setIsDark(!isDark)}>{isDark ? <LightMode /> : <DarkMode></DarkMode>}</Button>
                    {
                        currentPath !== "/sign" ? isAuth ? <Button onClick={() => logoutHandle()}>Log Out</Button> : <Link to="/sign">Sign</Link> : null
                    }
                    {/* {
                        user ? (
                            <div className='flex space-x-2'>
                                <img src={user.avatar} className='block size-5 rounded-full' alt="" />
                                <h3>{user.fullName}</h3>
                            </div>
                        ) :""
                    } */}
                </div>
            </div>
        </header>
    )
}

export default Header