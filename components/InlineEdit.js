'use client'

import { useState } from 'react'

export default function InlineEdit({ value, onChange, style, className, multiline, placeholder }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          placeholder={placeholder}
          style={{ ...style, background: 'rgba(255,255,255,0.2)', border: '2px dashed rgba(255,255,255,0.6)', borderRadius: '8px', padding: '4px 8px', resize: 'none', width: '100%', outline: 'none' }}
          className={className}
          rows={3}
        />
      )
    }
    return (
      <input
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        placeholder={placeholder}
        style={{ ...style, background: 'rgba(255,255,255,0.2)', border: '2px dashed rgba(255,255,255,0.6)', borderRadius: '8px', padding: '4px 8px', outline: 'none', width: '100%' }}
        className={className}
      />
    )
  }

  return (
    <span
      onClick={() => setEditing(true)}
      style={{ ...style, cursor: 'pointer', borderBottom: '2px dashed rgba(255,255,255,0.4)', display: 'inline-block' }}
      className={className}
      title="Өзгерту үшін басыңыз"
    >
      {value || placeholder || 'Басыңыз...'}
    </span>
  )
}