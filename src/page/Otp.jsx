import React, { useRef, useState } from 'react'
import { accessTokenStore, authStore, refreshTokenStore } from '../store/IsAuth.store'
import { userStorage } from '../store/User.store'
import { Container, FormGroup, Input } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Otp({ email, url }) {
    const { setaccessToken } = accessTokenStore()
    const { setrefreshToken } = refreshTokenStore()
    const { setUser } = userStorage()
    const { setIsAuth } = authStore()

    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputs = useRef([])

    const navigate = useNavigate()

    const handleSubmit = async () => {
        console.log(code)
        axios.post(url, {
            email,
            code: Number(code.join(""))
        }).then(response => {
            setaccessToken(response.data.accessToken)
            setrefreshToken(response.data.refreshToken)
            setUser(response.data.user)
            setIsAuth(true)
            console.log(response.data.user)
            navigate("/")
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e, index) => {
        const value = e.target.value
        // faqat raqamlarni qabul qilamiz va bitta raqamga cheklaymiz
        if (!/^\d?$/.test(value)) return

        setCode(prev => {
            const newCode = [...prev]
            newCode[index] = value
            return newCode
        })

        // keyingi inputga focus
        if (value && index < code.length - 1) {
            console.log(value && index < code.length - 1)
            inputs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // oldingi inputga qaytish
            inputs.current[index - 1].focus()
        }
    }

    return (
        <div className='w-full h-full'>
            <Container sx={{width : 200,height : 200, border : "solid 2px #fff"}}>
                <FormGroup row style={{ gap: "8px" }}>
                    {code.map((cod, index) => (
                        <Input
                            key={index}
                            value={cod}
                            sx={{ width: 25 }}
                            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                            onChange={e => handleChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            inputRef={el => inputs.current[index] = el}
                        />
                    ))}
                </FormGroup>
                <button onClick={handleSubmit} disabled={code.some(c => !c)}>
                    Submit
                </button>
            </Container>
        </div>
    )
}

export default Otp
