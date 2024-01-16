import React from 'react'

type Props = {
    text: string
}

export default function EditorTopbarHeader({text}: Props) {
  return (
      <div className="justify-center items-stretch bg-slightlyDark flex flex-col pt-8 max-md:max-w-full">
          <span className="flex items-center justify-between gap-5 mx-8 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
              <div className="justify-center text-white text-2xl font-semibold leading-9 tracking-tighter">
                  Assignments
                  <br />
              </div>
          </span>
          <div className="bg-neutral-100 shrink-0 h-px mt-8 max-md:max-w-full" />
      </div>
  )
}