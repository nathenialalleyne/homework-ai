import * as React from "react";

type Props = {
    text: string;
    icon: string;
};

export default function EditorSidebarCard({ text, icon }: Props) {
    return (
        <div className="items-stretch flex w-full flex-col justify-center mt-9 pr-5 py-2.5 hover:bg-lighterDark hover:cursor-pointer rounded-xl">
            <span className="flex items-center justify-between gap-3">
                <div className="aspect-square object-contain object-center justify-center items-center overflow-hidden shrink-0 max-w-full">
                    <img src={icon} className="w-6 h-6" />
                </div>
                <div className="justify-center text-slate-400 text-sm font-semibold leading-5 tracking-tight grow whitespace-nowrap">
                    {text}
                </div>
            </span>
        </div>
    );
}