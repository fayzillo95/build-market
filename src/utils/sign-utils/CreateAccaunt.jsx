import { useState } from "react";
import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { emailStore, userRegisterStore } from "../../store/SignStorage";
import { useDarck } from "../../store/DarkModeStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccaunt() {
    const { registerData, setRegisterData } = userRegisterStore();
    const { isDark, setIsDark } = useDarck()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const { email, setEmail } = emailStore()

    function handleRegister(e) {
        e.preventDefault();
        const { repeat_password, ...data } = registerData
        axios.post("http://localhost:15975/api/auth/register", { ...data }).then((response) => {
            setEmail(registerData.email)
            console.log(response.data)
            setRegisterData({
                fullName: "",
                email: "",
                password: "",
                repeat_password: ""
            })
            navigate("/otp")
        }).catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleRegister} className={`${isDark ? "bg-violet-950" : "bg-slate-400"}`}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ fullName: e.target.value })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ email: e.target.value })}
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
                value={registerData.password}
                onChange={(e) => setRegisterData({ password: e.target.value })}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                value={registerData.repeat_password}
                onChange={(e) =>
                    setRegisterData({ repeat_password: e.target.value })
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                edge="end"
                            >
                                {showConfirmPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
        </form>
    );
}
