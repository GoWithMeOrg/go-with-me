'use client'

import { useState } from 'react'

import { EventForm } from '@/components/EventForm'
import { Event } from '@/components/Event'

export default function EventPage() {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div>
      <h3>EventPage</h3>
      {isEditMode ? <EventForm /> : <Event /> }
      <button onClick={() => { setIsEditMode(!isEditMode) }}>
        Edit
      </button>
    </div>
  )
}
