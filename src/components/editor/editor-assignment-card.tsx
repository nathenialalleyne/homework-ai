import React from 'react'

type Props = {}

export default function EditorAssignmentCard({ }: Props) {
  return (
    <div className=''>
      <div className="items-stretch bg-neutral-50 self-stretch flex w-full flex-col justify-center mt-8 px-5 py-2.5 rounded-xl min-width-[0px]">
        <div className="items-stretch flex justify-between gap-3">
          <div className="items-stretch flex grow basis-[0%] flex-col self-start">
            <span className="items-stretch flex justify-between gap-5">
              <div className="justify-center text-gray-900 text-sm font-semibold leading-5 tracking-tight">
                Assignment Name
              </div>
              <div className="justify-center text-slate-400 text-right text-xs tracking-normal">
                09/12/2021
              </div>
            </span>
            <span className="items-stretch flex justify-between gap-5 mt-2 pr-1.5 py-0.5">
              <div className="text-gray-900 text-xs line-clamp-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus exercitationem alias laborum, magni quas omnis porro tenetur ducimus odio ipsum fugiat asperiores harum mollitia doloremque cumque ad accusantium corporis deserunt.
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-neutral-100 self-center shrink-0 max-w-full h-px mt-4" />
    </div>
  )
}