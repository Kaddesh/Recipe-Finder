import React from 'react'

const Hero = () => {
return (
    <section 
        className="flex flex-col items-center justify-center w-screen py-12 relative shadow-lg object-cover bg-cover px-6 lg:px-0" 
        style={{ backgroundImage: "url('./recipe4.jpg')", height: "100vh" }}
    >
        <div 
            className="absolute inset-0 bg-orange-800 opacity-50"
            style={{ zIndex: 0 }}
        ></div>
        <div className="relative z-0 flex flex-col items-center justify-center  space-y-6">
            <h1 className="text-5xl lg:text-6xl text-wrap font-extraboldbold font-quicksand text-center text-white">Discover Delicious Recipes</h1>
            <p className='text-xl font-bold max-w-xl text-slate-300 text-center font-inter'>Cook with ease, watch videos that guide you to create mouth watering meal all at no cost. The goal is for you to create memories with your family</p>
            <p className="text-gray-300 mt-2 text-center font-inter">Ready? Scroll down, Find, Cook, and Enjoy meals from around the World.</p>
        </div>
    </section>
)
}

export default Hero
