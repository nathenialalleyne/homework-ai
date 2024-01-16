import React from 'react'
// import Tooltip from '@mui/material/Tooltip';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from '@/shad/ui/tooltip'


type Props = {
    children: React.ReactNode
    tooltipText: string
    line?: boolean
    setSelected?: React.Dispatch<React.SetStateAction<string>>
    selectedValue?: string | null
    currentSelected?: string | null
}

export default function Card({ children, tooltipText, line, setSelected, selectedValue, currentSelected }: Props) {
    return (
        <TooltipProvider >
            <Tooltip delayDuration={0}>
                <button className='w-12 h-12 p-1' onClick={() => setSelected?.(selectedValue!)} >
                    <div className={currentSelected && currentSelected === selectedValue ? 'bg-stone-700' : ''}>
                        <TooltipTrigger asChild>{children}</TooltipTrigger>
                    </div>
                </button>
                <TooltipContent side='right' sideOffset={10} arrowPadding={5} className='z-30 bg-gradient-to-tr from-primary to-secondary border-none hover:cursor-default'>
                    {tooltipText}
                </TooltipContent>
                {line && <div className='w-full h-px bg-lighter mb-2' />}
            </Tooltip>
        </TooltipProvider>

    )
}