import { api } from '@/utils/api'
import React, { useState, useEffect } from 'react'
import Test from './test'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

export default function Profile({ }: Props) {
    const router = useRouter()
    const id = uuidv4()
    return (
        <>
            <button onClick={() => {
                router.push(`/assignments/${id}`)
            }}>Create New Assignment</button>
        </>
    );
}