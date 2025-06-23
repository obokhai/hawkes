import React from 'react'
import Image from 'next/image'
import { StopCircle, Timer } from 'lucide-react'
const Deadlines = ({id, taskName, dueDate, time, priority, stage, status, description}) => {

  return (
    <div id={id}>
        <div className='flex flex-col border-2 mt-6 rounded-xl'>
            <div className='flex border-l-4  border-[#5A48F9] min-h-16 rounded-lg '>
                <div className='w-1/6 bg-gray-300 flex justify-between p-2 flex-col'>
                    <span className='text-xs'>{dueDate}</span>
                    <span className='text-xs text-gray-600'>{time}</span>
                </div>
                <div className='w-5/6 flex items-center justify-between'>
                <span className=' font-bold text-sm px-12'>{description}</span>
                <span className='flex items-center gap-x-8 mx-4'> 
                <h5> Stage {stage}</h5>
                <span className={`min-w-[100px] gap-x-2 capitalize flex ${status ==='completed' ?'border-green-400 border-[1px] text-green-400 text-xs ': status === 'in_progress'? 'border-orange-400 border-[1px] text-orange-400 text-xs': 'text-red-400 text-xs border-[1px] border-red-400 '} items-center justify-center rounded-full p-2`}>
                    <Timer/>
                  <p>
  {status === 'completed'
    ? 'Completed'
    : status === 'in_progress'
      ? 'In Progress'
      : 'Pending'}
</p>
                </span>
               
                </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Deadlines