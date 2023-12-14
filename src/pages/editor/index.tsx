import React from 'react'
import Header from '../components/Header'

type Props = {}

export default function Editor({}: Props) {
  return (
    <div className='bg-dark w-screen h-screen'>
        <Header profile />
    </div>
  )
}