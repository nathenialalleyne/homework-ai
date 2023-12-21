import React from 'react'
import SectionHeading from './section-heading'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
    sectionHeadingClassName?: string
    sectionName: string
    headingText: string
    headingClassName?: string
    paragraphText: string
}

export default function LandingHeader({ className, sectionName, headingText, headingClassName, paragraphText, sectionHeadingClassName }: Props) {
    return (
        <div className={twMerge('w-fit p-4 flex flex-col items-center space-y-4', className)}>
            <SectionHeading className={sectionHeadingClassName}>
                {sectionName}
            </SectionHeading>

            <h2 className={twMerge('font-semibold text-4xl max-w-[42rem] tracking-wide text-center', headingClassName)}>
                {headingText}
            </h2>

            <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                {paragraphText}
            </p>
        </div>
    )
}