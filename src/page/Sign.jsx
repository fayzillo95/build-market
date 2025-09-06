import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import CreateAccaunt from '../utils/sign-utils/CreateAccaunt';
import SignAccaunt from '../utils/sign-utils/SignAccaunt';
import { userRegisterStore } from '../store/SignStorage';

function Sign() {

    const [isRegister, setIsRegister] = useState(true)
    const { registerData, setRegisterData } = userRegisterStore()

    return (
        <div className='border-2'>
            <Container maxWidth="sm" sx={{ transition: "all", transitionDuration: "1s" }}>
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', minHeight: 522 }}>
                    <Typography component="h1" variant="h5">
                        {
                            isRegister ? "Sign Accaunt" : "Create Accaunt"
                        }
                    </Typography>
                    {isRegister ? <SignAccaunt /> : <CreateAccaunt />}
                    <Typography sx={{ textAlign: "center", "&:hover": { color: "red" }, cursor: "pointer" }}>
                        <Button onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? "I am not already accaunt" : "I am already registered "}
                        </Button>
                    </Typography>
                </Box>

            </Container>
        </div>
    )
}

export default Sign