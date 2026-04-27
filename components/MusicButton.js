'use client'

import { useState, useEffect, useRef } from 'react'

export default function MusicButton({ musicUrl, defaultMusicUrl }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  
  const url = musicUrl || defaultMusicUrl

  useEffect(() => {
    if (!url) return
    audioRef.current = new Audio(url)
    audioRef.current.loop = true
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [url])

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  if (!url) return null

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '16px',
        zIndex: 999,
        background: playing ? '#681313' : 'rgba(0,0,0,0.7)',
        color: '#fff',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '90px',
        padding: '10px 18px',
        fontSize: '13px',
        letterSpacing: '1px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {playing ? '⏸ Тоқтату' : '♫ Әуен'}
    </button>
  )
}