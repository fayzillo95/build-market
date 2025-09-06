import { useEffect, useState } from "react";
import { TextField, Button, IconButton, InputAdornment, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userLoginStore } from "../../store/SignStorage";
import validator from "validator"
import axios from "axios"
import { accessTokenStore, authStore, refreshTokenStore } from "../../store/IsAuth.store";
import { userStorage } from "../../store/User.store";
import { useNavigate } from "react-router-dom";
import { isLoadingStore } from "../../store/LoadingStore";
import BasicAlerts from "../modals/Allert";

const validateEmail = (email) => {
    if (!email || email.length === 0) {
        return 'Email is required';
    }
    if (!validator.isEmail(email, { ignore_max_length: true })) {
        return 'Invalid email format';
    }
    return null; // No error
};

export default function SignAccaunt() {
    const { loginData, setLoginData } = userLoginStore();
    const [showPassword, setShowPassword] = useState(false);
    const { setaccessToken } = accessTokenStore()
    const { setrefreshToken } = refreshTokenStore()
    const { setUser, user } = userStorage()
    const { isAuth, setIsAuth } = authStore()
    const { setIsLoadingModal } = isLoadingStore()
    const navigate = useNavigate()
    const [allertModal, setAllertModal] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    useEffect(() => {
        if (!allertModal) return;
        const timer = setTimeout(() => setAllertModal(null), 2000);
        return () => clearTimeout(timer);
    }, [allertModal]);


    function handleSign(e) {
        e.preventDefault()
        const isEmail = validateEmail(loginData.email)
        if (isEmail) {
            alert(isEmail)
        } else {
            setIsLoadingModal(true)
            axios.post("http://localhost:15975/api/auth/login", { ...loginData }).then(response => {
                console.log(response.data)
                setaccessToken(response.data.accessToken)
                setrefreshToken(response.data.refreshToken)
                setUser(response.data.user)
                setIsAuth(true)
                setLoginData({
                    email: "",
                    password: ""
                })
                navigate("/")
            }).catch(err => {
                setAllertModal({
                    target: "error", message: err.response.data.message
                })
            }).finally(() => {
                setIsLoadingModal(false)
            })
        }
    }


    return (
        <Box component="form" onSubmit={(e) => handleSign(e)} noValidate sx={{ alignItems: "center" }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ email: e.target.value.trim() })}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={loginData.password}
                onChange={(e) => setLoginData({ password: e.target.value.trim() })}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                className="!w-1/3"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginRight: "0" }}
            >
                Sign
            </Button>
            {
                allertModal ?
                    <BasicAlerts target={allertModal.target} message={allertModal.message} isAllert={!!allertModal} /> : ""
            }
        </Box>

    );
}
