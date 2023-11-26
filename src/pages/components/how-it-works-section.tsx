import React from 'react'

type Props = {
    number: number
    text: string
    subText: string
    line?: boolean
    lineContainerClassName?: string
    lineClassName?: string
}

export default function HowItWorksSection({number, text, subText, line, lineClassName, lineContainerClassName}: Props) {
  return (
      <div>
          <div className='flex items-center gap-2'>
              <div className='flex p-[1px] w-12 h-12 bg-gradient-to-br from-primary from-30% to-secondary rounded-full'>
                  <div className='w-full h-full rounded-full bg-dark flex justify-center items-center'>
                      <div className='bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl font-bold after:content-["*"]after:w-20 after:h-24 after:bg-white'>
                          {number}
                      </div>
                  </div>
              </div>
              <h3 className='text-2xl font-light'>{text}</h3>
          </div>
          <div className='flex gap-2'>
              <div className={lineContainerClassName}>
                  {line ? <div className={lineClassName} /> : null}
              </div>
              <div className={!line ? 'ml-12': ''}>
                  <p className='w-[25rem] text-sm font-extralight text-gray-300'>{subText}</p>
              </div>
          </div>
      </div>
  )
}