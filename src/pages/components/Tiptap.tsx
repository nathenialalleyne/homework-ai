import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'

type Props = {
    defaultValue?: string
}

export default function Tiptap({ defaultValue }: Props) {
    const editor = useEditor({
        extensions: [StarterKit, CharacterCount.configure({ mode: 'nodeSize' })],
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none scrollbar scrollbar-thin scrollbar-rounded-54 scrollbar-thumb-gray-900 scrollbar-track-gray-100 overflow-y-scroll h-96',
            },
        },
        content: ` <p> ${defaultValue} </p>`,
    })
    return (
        <EditorContent editor={editor} />
    )
}