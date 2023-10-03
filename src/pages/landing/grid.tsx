import React, { useEffect, useState } from 'react'
import LandingFollow from './mousefollow'
import { SquareArray } from './grid-square'
import LandingHeading from './heading'

export default function LandingGrid() {
    const [fitSquare, setFitSquare] = useState<number>(typeof window !== 'undefined' ? calculateFitSquare() : 12)

    useEffect(() => {

        function handleResize() {
            setFitSquare(calculateFitSquare());
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fitSquare])

    function calculateFitSquare() {
        const screenHeight = window.innerHeight;
        const squareSize = 96;
        return Math.ceil(screenHeight / squareSize);
    }

    return (
        <div className='w-full h-full relative z-20 absolute' >
            <LandingFollow />
            <div suppressHydrationWarning className='flex flex-col w-screen h-screen'>
                {Array(fitSquare).fill(0).map((_, i) => {
                    return <SquareArray key={i} />
                })}
            </div>
        </div>
    )
}
