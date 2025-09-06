import React, { useCallback, useEffect } from 'react'
import SearchSection from '../utils/home-utils/Search'
import { useDarck } from '../store/DarkModeStore'
import Hero from '../utils/home-utils/Hero'
import { ApiStore } from '../store/ApiAuth.store'
import { accessTokenStore, authStore } from '../store/IsAuth.store'
import { userStorage } from '../store/User.store'

function Home() {

  const { isDark } = useDarck()
  const { api, setHeader } = ApiStore()
  const { isAuth } = authStore()
  // const {user,setUser} = userStorage()
  // const { accessToken, getAccessToken } = accessTokenStore()

  // useEffect(() => {
  //   setHeader({
  //     "Authorization": `Bearer ${getAccessToken()}`
  //   })
  //   api.get("users/get-my").then(data => {
  //     console.log(data)
  //     setUser(data.data)
  //   }).catch(err => console.log(err))
  // }, [])

  return (
    <main className='w-full'>
      <SearchSection isDark={isDark} />
      <Hero />
    </main>
  )
}

export default Home