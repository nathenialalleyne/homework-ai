import React, { useState } from 'react'
import LandingFollow from './mousefollow'

export default function LandingGrid() {
    const [pos, setPos] = useState<any>({ x: 0, y: 0 })

    return (
        <div className='w-full h-full grid z-10' >
            <LandingFollow />
        </div>
    )
}
8