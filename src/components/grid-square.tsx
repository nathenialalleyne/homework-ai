import React from 'react'
import { useEffect, useState } from 'react'

export function GridSquare() {

    return (
        <div className='h-16 w-16 transparent shrink-0'>
            <div className='w-[calc(100%-1px)] h-[calc(100%-1px)] bg-dark-100' />
        </div>
    )
}

export default function SquareArray() {
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
        const screenWidth = window.innerWidth;
        const squareSize = 48;
        return Math.ceil(screenWidth / squareSize);
    }

    return (
        <div className='flex'>
            {Array(fitSquare).fill(0).map((_, i) => {
                return <GridSquare key={i} />
            })}
        </div>
    )
}