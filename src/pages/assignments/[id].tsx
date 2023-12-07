import React, { createContext, useEffect, useState } from 'react'
import NameAssignment from './create/name'
import { StageContext } from './context'
import InputSource from './create/source'

type Props = {}

export default function CreateAssignment({ }: Props) {
  const [stage, setStage] = useState('name')
  const [assignmentName, setAssignmentName] = useState('')

  return (
    <StageContext.Provider value={setStage}>
      {stage === 'name' ? <NameAssignment setAssignmentName={setAssignmentName} /> : null}
      {stage === 'source' ? <InputSource key={1}/> : null}
    </StageContext.Provider>
  )
}