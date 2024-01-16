import React from 'react'

type Props = {
    w?: number
    h?: number
    className?: string
}

export default function Loader({ w, h, className }: Props) {
    return (
        <div className='w-full flex items-center justify-center animate-spin'>
            <svg fill="#00FF8F" width="80px" height="80px" className={className} viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#00FF8F" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.064"></g><g id="SVGRepo_iconCarrier"> <title>spinner-one-third</title> <path d="M16 1.25c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0c7.318 0.001 13.25 5.933 13.25 13.251 0 3.659-1.483 6.972-3.881 9.37v0c-0.14 0.136-0.227 0.327-0.227 0.537 0 0.414 0.336 0.75 0.75 0.75 0.212 0 0.403-0.088 0.539-0.228l0-0c2.668-2.669 4.318-6.356 4.318-10.428 0-8.146-6.604-14.751-14.75-14.751h-0z" fill="url(#paint0_linear_18_9572)"></path> </g></svg>
            <defs>
                <linearGradient id="paint0_linear_18_9572" x1="9.09219" y1="-10.0659" x2="37.647" y2="75.6472" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00FF8F" />
                    <stop offset="1" stopColor="#00A1FF" />
                </linearGradient>
            </defs>
        </div>
    )
}