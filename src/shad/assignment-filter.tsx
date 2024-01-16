import React from 'react'
import { Button } from "@/shad/ui/button"
import { Input } from "@/shad/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/shad/ui/select"

type Props = {
    setAssignmentSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function AssignmentFilter({ setAssignmentSearch }: Props) {
    return (
        <div className="flex items-center justify-between px-32">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">Filters:</h2>
                <div className="flex">
                    <Input className="mr-2 bg-dark-50 border-0 focus:ring-0 text-white" placeholder="Search..." type="search" onChange={(e) => {
                        setAssignmentSearch(e.target.value)
                    }} />
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-fit bg-dark-50 border-0 text-white">
                            <SelectValue placeholder="Sort by date" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-50 text-white">
                            <SelectItem value="newest">Newest to Oldest</SelectItem>
                            <SelectItem value="oldest">Oldest to Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button className="bg-dark-50 hover:bg-dark-50 hover:brightness-150 transition-all">
                Create Assignment
            </Button>
        </div>
    )
}