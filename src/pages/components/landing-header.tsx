import React from 'react'
import SectionHeading from './section-heading'

type Props = {
    className?: string
    sectionHeadingClassName?: string
    sectionName: string
    headingText: string
    paragraphText: string
}

export default function LandingHeader({ className, sectionName, headingText, paragraphText, sectionHeadingClassName }: Props) {
    return (
        <div className='w-fit p-4 flex flex-col items-center space-y-4'>
            <SectionHeading className={sectionHeadingClassName}>
                {sectionName}
            </SectionHeading>

            <h2 className='font-semibold text-4xl max-w-[42rem] tracking-wide text-center'>
                {headingText}
            </h2>

            <p className='text-lg max-w-[45rem] font-thin tracking-wide text-center'>
                {paragraphText}
            </p>
        </div>
    )
}