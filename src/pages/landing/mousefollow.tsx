import React, { useEffect, useState } from 'react'

export default function LandingFollow() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const followMouse = async (e: any) => {
        const x = e.clientX
        const y = e.clientY

        setPos({ x, y })
    }

    useEffect(() => {
        window.addEventListener('mousemove', followMouse)
        return () => {
            window.removeEventListener('mousemove', followMouse)
        }
    }, [])

    return (
        <div className='w-32 h-32 bg-white rounded-full -z-10' style={{ position: 'fixed', right: pos.x, bottom: pos.y }} />
    )
}
