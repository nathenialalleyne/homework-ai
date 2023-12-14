import React from 'react'
import { twMerge } from 'tailwind-merge'
import useMousePosition from '@/hooks/use-mouse-position'

type Props = {
    children: React.ReactNode,
    containerClassName?: string,
    spanClassName?: string,
    text: string
}

let debounceResize: ReturnType<typeof setTimeout>;

export default function tooltip({ children, text, containerClassName, spanClassName }: Props) {
    const [show, setShow] = React.useState(false)
    const [fade, setFade] = React.useState(true) // Set initial fade state to true
    const mousePos = useMousePosition()
    const timeoutId = React.useRef<typeof debounceResize | null>(null);

    return (
        <div className={twMerge(`relative ${containerClassName}`)} onMouseEnter={() => {
            setShow(true)
            setFade(false)
            if (timeoutId.current) clearTimeout(timeoutId.current);
        }} onMouseLeave={() => {
            setFade(true)
            // eslint-disable-next-line
            timeoutId.current = setTimeout(() => {
                setShow(false)
                setFade(true) // Set fade state to true when hiding the tooltip
            }, 200)
        }}>
            {children}
            <span className={twMerge(`absolute bg-gradient-to-tr from-primary to-secondary text-white p-2 rounded-md text-xs whitespace-nowrap transition-opacity duration-200 inset-x-0 ${spanClassName}`)}
                style={{ visibility: show ? 'visible' : 'hidden', opacity: fade ? 0 : 1 }}>
                {text}
            </span>
        </div>
    )
}