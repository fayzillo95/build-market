import { HomeMiniTwoTone, Loupe, Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';

function SearchSection({ isDark }) {

    return (
        <div className='container flex justify-between mx-auto mt-7'>
            <div className='w-3/5 flex'>
                <TextField
                    fullWidth
                    label="Enter address"
                    placeholder="Enter an address, neighborhood, city, or ZIP code"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MapsHomeWorkTwoToneIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <Button sx={{ backgroundColor: isDark ? "black" : "whitesmoke", display: "flex", gap: 1 }}><img src="./car-key 1.png" alt="" /> Status</Button>
            <Button sx={{ backgroundColor: isDark ? "black" : "whitesmoke", display: "flex", gap: 1 }}><img src="./price_1.png" alt="" /> Price</Button>
            <Button sx={{ backgroundColor: isDark ? "black" : "whitesmoke", display: "flex", gap: 1 }}><img src="./setting-lines.png" alt="" />Advanced</Button>
            <Button sx={{ backgroundColor: isDark ? "black" : "whitesmoke", display: "flex", gap: 1 }}><Search></Search> Search</Button>
        </div>
    )
}

export default SearchSection