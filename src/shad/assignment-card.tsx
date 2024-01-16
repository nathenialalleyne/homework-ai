import React from 'react'
import { CardTitle, CardDescription, CardHeader, Card } from "@/shad/ui/card"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/shad/ui/select"
import { Popover, PopoverContent, PopoverTrigger, } from "@/shad/ui/popover"
import { Button } from "@/shad/ui/button"
import MenuDotIcon from "@/images/menu-dots"
type Props = {
    assignmentName: string
    assignmentDescription: string
    assignmentDate: string
}

export default function AssignmentCard({
    assignmentName,
    assignmentDescription,
    assignmentDate,
}: Props) {
    return (
        <button className='text-start shrink-0 w-full'>
            <Card className="bg-dark-50 text-white border-0 hover:brightness-125 transition-all grow">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <div className="grid gap-2">
                        <CardTitle>{assignmentName}</CardTitle>
                        <CardDescription className='text-slate-300 line-clamp-1'>{assignmentDescription}</CardDescription>
                        <CardDescription className='text-slate-300'>{assignmentDate}</CardDescription>
                    </div>

                    <Popover>
                        <PopoverTrigger className="w-12 h-12 bg-0 focus:border-0 border-0 focus:ring-0 ring-0">
                            <MenuDotIcon className="fill-white hover:fill-slate-300 transition-all w-6 h-6" />
                        </PopoverTrigger>
                        <PopoverContent className="bg-dark-100 border-0 w-fit brightness-125 ">
                            <Button className='text-red-500 font-sans bg-dark-100 w-full hover:bg-dark-100 hover:text-red-300'>
                                Delete
                            </Button>
                        </PopoverContent>
                    </Popover>
                </CardHeader>
            </Card>
        </button>
    )
}