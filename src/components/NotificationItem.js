import Image from 'next/image'
import React from 'react'

function NotificationItem({ name, action, target, time, icon }) {
  return (
    <div className="flex items-start space-x-3 text-sm">
      {/* Avatar or icon */}
      <div className="flex-shrink-0">
        {icon === "plus" ? (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-bold">+</span>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 leading-snug">
        {name && <span className="font-medium">{name} </span>}
        {action && <span>{action} </span>}
        <span className="font-medium text-blue-600">"{target}"</span>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </div>
  )
}

export default NotificationItem