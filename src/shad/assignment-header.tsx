import React from 'react'
import Link from "next/link"
import { Button } from "@/shad/ui/button"
import BrainIcon from '@/images/brain-icon'
import { useClerk } from '@clerk/nextjs'

type Props = {}

export default function AssignmentHeader({}: Props) {
    const {user} = useClerk()
  return (
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-dark-100 brightness-125">
          <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4 dark:text-white" href="#">
              <BrainIcon className='w-12 h-12'/>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
              <Button className="text-white hover:bg-dark-100 hover:text-slate-400" variant="ghost">
                  Assignments
              </Button>
              <Button className="text-white hover:bg-dark-100 hover:text-slate-400" variant="ghost">
                  Input Documents
              </Button>
          </nav>
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <Button className="rounded-full ml-auto" size="icon" variant="ghost">
                  <img
                      alt="Avatar"
                      className="rounded-full "
                      height="32"
                      src={user?.imageUrl}
                      style={{
                          aspectRatio: "32/32",
                          objectFit: "cover",
                      }}
                      width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
              </Button>
          </div>
      </header>
  )
}