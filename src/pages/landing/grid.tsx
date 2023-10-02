import React, { useEffect, useState } from 'react'
import LandingFollow from './mousefollow'
import { SquareArray } from './grid-square'

export default function LandingGrid() {
    const [pos, setPos] = useState<any>({ x: 0, y: 0 })
    const [fitSquare, setFitSquare] = useState<number>(12)

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
        <div className='w-full h-full absolute z-20' >
            <LandingFollow />
            <div className='flex flex-col w-screen h-screen'>
                {Array(fitSquare).fill(0).map((_, i) => {
                    return <SquareArray key={i} />
                })}
            </div>

        </div>
    )
}
