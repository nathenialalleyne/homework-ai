import React, { useEffect } from 'react'
import BrainIcon from '@/images/brain-icon'
import Card from './sidebar/card'
import Image from 'next/image'
import { api } from '@/utils/api'

type Props = {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    currentSelected: string | null
}

export default function Sidebar({ setSelected, currentSelected }: Props) {
    const getCurrentUser = api.dbOperations.getCurrentUser.useQuery(undefined, { enabled: false })

    useEffect(() => {
        getCurrentUser.refetch()
    }, [])

    return (
        <div className='w-fit h-full overflow-hidden shrink-0'>
            <div className='h-full w-12 bg-slightlyDark pt-2 flex flex-col justify-between'>
                <div>
                    <Card tooltipText='Premium' line>
                        <BrainIcon className={`w-full h-full flex items-center justify-center`} />
                    </Card>
                    
                    <Card tooltipText='Assignments' selectedValue={'assignments'} setSelected={setSelected} currentSelected={currentSelected}>
                        <Image src={'/assets/assignment-icon.png'} width={48} height={48} alt='Assignments' />
                    </Card>
                    <Card tooltipText='Sources' selectedValue={'sources'} setSelected={setSelected} currentSelected={currentSelected}>
                        <Image src={'/assets/bookshelf-icon.png'} width={48} height={48} alt='Sources' />
                    </Card>
                    <Card tooltipText='Writing Samples' selectedValue={'samples'} setSelected={setSelected} currentSelected={currentSelected}>
                        <Image src={'/assets/writing-icon.png'} width={48} height={48} alt='Sources' />
                    </Card>
                </div>

                <Card tooltipText='Settings'>
                    <Image src={'/assets/settings-icon.png'} width={48} height={48} alt='Settings' />
                </Card>
            </div>
        </div>
    )
}