import React from 'react'
import hero_png from "../../assets/hero_img.png"
import { Button } from '@mui/material'

function Hero() {
    return (
        <section id='hero' className="w-full h-[800px] mt-5 flex justify-center items-center" style={{
            backgroundImage: `url(${hero_png})`,
            backgroundPosition: "center",
            backgroundSize :"cover",
            backgroundRepeat: "no-repeat",
            border: "1px solid red",
        }}>
            <div className="container mx-auto my-auto h-max border-2 flex flex-col items-center justify-between ">
                <h1 className='text-white text-8xl shadow-lg'>Skyper Pool Partment</h1>
                <p>112 Glenwood Ave Hyde Park, Boston, MA</p>
                <div>

                </div>
                <Button>Read more</Button>
            </div>
        </section>
    )
}

export default Hero