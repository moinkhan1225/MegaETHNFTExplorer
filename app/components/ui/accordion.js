'use client'
import React, { useState } from "react"

export function Accordion({ children, type }) {
  return <div className="space-y-2">{children}</div>
}

export function AccordionItem({ value, children }) {
  const [open, setOpen] = useState(false)

  return React.Children.map(children, (child) => {
    if (child.type.displayName === 'AccordionTrigger') {
      return React.cloneElement(child, { open, setOpen })
    }
    if (child.type.displayName === 'AccordionContent') {
      return React.cloneElement(child, { open })
    }
    return child
  })
}

export function AccordionTrigger({ children, open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full flex justify-between items-center p-3 bg-purple-50 rounded-lg text-purple-700 font-medium hover:bg-purple-100 transition"
    >
      {children}
      <span>{open ? '-' : '+'}</span>
    </button>
  )
}
AccordionTrigger.displayName = 'AccordionTrigger'

export function AccordionContent({ children, open }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        open ? 'max-h-96 p-3 bg-white border border-purple-200 rounded-b-lg' : 'max-h-0 p-0'
      }`}
    >
      {children}
    </div>
  )
}
AccordionContent.displayName = 'AccordionContent'
