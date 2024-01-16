import React from 'react'
import FullLogo from "@/images/logo";
import EditorSidebarCard from "./editor-sidebar-card";

type Props = {}

export default function EditorSidebar({ }: Props) {
    return (
        <div className="flex flex-col items-stretch w-[18%] max-md:w-full max-md:ml-0">
            <div className="bg-dark flex w-full grow flex-col items-stretch mx-auto p-8 max-md:px-5">
                <span className="items-stretch flex justify-between gap-3">
                    <FullLogo />
                </span>
                <EditorSidebarCard text={"Assignments"} icon="/assets/assignment-icon.png" />
                <EditorSidebarCard text={"Sources"} icon="/assets/bookshelf-icon.png" />
                <EditorSidebarCard text={"Writing Samples"} icon="/assets/writing-icon.png" />
                <EditorSidebarCard text={"Settings"} icon="/assets/settings-icon.png" />
            </div>
        </div>
    )
}