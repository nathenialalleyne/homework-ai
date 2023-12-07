// import React, { useState, useContext } from 'react'
// import { StageContext } from '../context'
// import Menu from '@/pages/components/general/menu'

// type Props = {
//     setAssignmentName: React.Dispatch<React.SetStateAction<string>>
// }

// export default function NameAssignment({ setAssignmentName }: Props) {
//     const setStage = useContext(StageContext)
//     return (
//         <div>
//             {/* <h1>Create Assignment</h1>
//             <input
//                 type="text"
//                 placeholder="Assignment Name"
//                 onChange={(e) => setAssignmentName(e.target.value)}
//             />
//             <button onClick={() => {
//                 (setStage as React.Dispatch<React.SetStateAction<string>>)('source')
//             }}>continue</button> */}
//             <Menu />
//         </div>
//     )
// }