import React from 'react'
import classNames from 'classnames'

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
      <div className='sm:w-[28rem]'>
          <div className='flex items-center gap-2 sm:flex-row xs:flex-col xs:text-center sm:text-left sm:ml-0'>
              <div className='flex p-[1px] w-12 h-12 bg-gradient-to-br from-primary from-30% to-secondary rounded-full'>
                  <div className='w-full h-full rounded-full bg-dark flex justify-center items-center'>
                      <div className='bg-gradient-to-br from-primary from-30% to-secondary bg-clip-text text-transparent text-2xl font-bold after:content-["*"]after:w-20 after:h-24 after:bg-white'>
                          {number}
                      </div>
                  </div>
              </div>
              <h3 className='text-2xl font-light xs:max-w-[15rem] sm:max-w-full'>{text}</h3>
          </div>
          <div className='flex gap-2'>
              <div className={lineContainerClassName}>
                  {line ? <div className={classNames('xs:hidden sm:block',lineClassName)} /> : null}
              </div>
              <div className={!line ? 'sm:ml-12': ''}>
                  <p className='sm:w-[25rem] xs:max-w-[20rem] text-sm xs:text-center sm:text-left font-extralight text-gray-300'>{subText}</p>
              </div>
          </div>
      </div>
  )
}