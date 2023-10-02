import React, { useState, useEffect } from 'react'


export default function GridSquare() {

    return (
        <div className='h-24 w-24 transparent shrink-0'>
            <div className='w-[calc(100%-1px)] h-[calc(100%-1px)] bg-stone-800' />

        </div>
    )
}

export function SquareArray() {
    const [fitSquare, setFitSquare] = useState<number>(typeof window !== 'undefined' ? calculateFitSquare() : 20)

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
        const squareSize = 96;
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