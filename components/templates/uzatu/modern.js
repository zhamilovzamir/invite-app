'use client'

import { useState, useEffect } from 'react'
import MusicButton from '@/components/MusicButton'

export default function UzatuModern({ data }) {
  const [guestName, setGuestName] = useState('')
  const [rsvpChoice, setRsvpChoice] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [comment, setComment] = useState('')
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [mins, setMins] = useState('00')
  const [secs, setSecs] = useState('00')

  useEffect(() => {
    if (!data.event_date) return
    const target = new Date(data.event_date)
    function update() {
      const now = new Date()
      let diff = target - now
      if (diff < 0) diff = 0
      setDays(String(Math.floor(diff / 86400000)).padStart(2, '0'))
      setHours(String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'))
      setMins(String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'))
      setSecs(String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [data.event_date])

  async function handleRsvp() {
    if (!guestName) return alert('Есіміңізді енгізіңіз')
    if (!rsvpChoice) return alert('Жауапты таңдаңыз')
    await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: data.orderId,
        guest_name: guestName,
        answer: rsvpChoice === 'no' ? 'no' : 'yes',
        comment,
      }),
    })
    setSubmitted(true)
  }

  const eventDate = data.event_date ? new Date(data.event_date) : null
  const monthNames = ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан']

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)', overflow: 'hidden' }}>
          
          {/* Казахский орнамент фон */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0px, #c9a96e 1px, transparent 0px, transparent 50%)', backgroundSize: '20px 20px' }} />
          
          {/* Золотая рамка */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid #c9a96e', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '26px', left: '26px', right: '26px', bottom: '26px', border: '1px solid rgba(201,169,110,0.3)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 32px', width: '100%', textAlign: 'center' }}>
            
            <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '32px', fontFamily: 'Georgia,serif' }}>
              ✦ Ұзату той · Шақыру ✦
            </p>

            {/* Фото */}
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #c9a96e', boxShadow: '0 0 40px rgba(201,169,110,0.3)', marginBottom: '28px', background: 'linear-gradient(135deg,#2d1b4e,#1a0a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.photo_url ? (
                <img src={data.photo_url} alt="Фото" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '48px' }}>🌺</span>
              )}
            </div>

            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '48px', fontStyle: 'italic', color: '#fff', marginBottom: '8px', lineHeight: 1 }}>
              {data.guest_name || 'Есім'}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #c9a96e)' }} />
              <span style={{ color: '#c9a96e', fontSize: '18px' }}>✦</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #c9a96e)' }} />
            </div>

            <p style={{ fontFamily: 'Georgia,serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '280px' }}>
              Қызымыз <span style={{ color: '#c9a96e' }}>{data.guest_name || 'есімі'}</span>-дің ұзату тойына сіздерді шақырамыз
            </p>

            {eventDate && (
              <div style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid #c9a96e', padding: '20px 40px', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '48px', color: '#c9a96e', lineHeight: 1 }}>
                  {eventDate.getDate()}
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '4px' }}>
                  {monthNames[eventDate.getMonth()]} · {eventDate.getFullYear()}
                </div>
              </div>
            )}

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Құрметпен, {data.hosts || 'Отбасы'}
            </p>
          </div>
        </div>

        {/* COUNTDOWN */}
        <div style={{ background: '#12082a', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid #c9a96e' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '20px' }}>
            Тойға дейін
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {[['Күн', days], ['Сағат', hours], ['Минут', mins], ['Секунд', secs]].map(([label, val], i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '36px', color: '#c9a96e', lineHeight: 1, minWidth: '50px', textAlign: 'center' }}>{val}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{label}</div>
                </div>
                {i < 3 && <div style={{ fontSize: '28px', color: '#c9a96e', lineHeight: 1, marginTop: '4px' }}>:</div>}
              </div>
            ))}
          </div>
        </div>

        {/* VENUE */}
        <div style={{ background: '#1a0a2e', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(201,169,110,0.3)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '16px' }}>Мекенжайы</p>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#fff', textAlign: 'center', marginBottom: '8px' }}>
            {data.venue || 'Мейрамхана'}
          </h2>
          {data.event_time && (
            <p style={{ fontSize: '13px', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '24px' }}>
              Уақыты: {data.event_time}
            </p>
          )}
          {data.map_url && (
            <a href={data.map_url} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#c9a96e', border: '1px solid #c9a96e', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', borderRadius: '0', textDecoration: 'none', display: 'inline-block' }}>
              Картаны ашу →
            </a>
          )}
          {data.telegram_channel && (
            <a href={data.telegram_channel} target="_blank" rel="noopener noreferrer"
              style={{ marginTop: '12px', background: 'transparent', color: '#c9a96e', border: '1px solid rgba(201,169,110,0.4)', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', textDecoration: 'none', display: 'inline-block' }}>
              ✈️ Telegram каналы
            </a>
          )}
        </div>

        {/* RSVP */}
        <div style={{ background: '#12082a', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(201,169,110,0.3)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#c9a96e', textTransform: 'uppercase', marginBottom: '8px' }}>Растау</p>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '28px' }}>
            Келуіңізді растауыңызды сұраймыз
          </p>

          {submitted ? (
            <div style={{ border: '1px solid #c9a96e', padding: '20px 40px', textAlign: 'center' }}>
              <p style={{ color: '#c9a96e', fontFamily: 'Georgia,serif', fontSize: '18px' }}>Рахмет! 🎉</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '8px' }}>Жауабыңыз қабылданды</p>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Есіміңіз"
                style={{ width: '100%', padding: '14px 20px', border: '1px solid #c9a96e', background: 'transparent', color: '#fff', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none' }} />
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Тілегіңіз (міндетті емес)" rows={2}
                style={{ width: '100%', padding: '14px 20px', border: '1px solid rgba(201,169,110,0.4)', background: 'transparent', color: '#fff', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none', resize: 'none' }} />
              {[['yes', '✓ Иә, барамын!'], ['with', '♥ Жұбайыммен бірге'], ['no', '✗ Келе алмаймын']].map(([val, label]) => (
                <button key={val} onClick={() => setRsvpChoice(val)}
                  style={{ width: '100%', padding: '14px 20px', border: `1px solid ${rsvpChoice === val ? '#c9a96e' : 'rgba(201,169,110,0.3)'}`, background: rsvpChoice === val ? 'rgba(201,169,110,0.1)' : 'transparent', color: rsvpChoice === val ? '#c9a96e' : 'rgba(255,255,255,0.5)', fontFamily: 'Georgia,serif', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>
                  {label}
                </button>
              ))}
              <button onClick={handleRsvp}
                style={{ width: '100%', padding: '16px', background: '#c9a96e', color: '#1a0a2e', border: 'none', fontFamily: 'Georgia,serif', fontSize: '13px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }}>
                Жауап беру
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ background: '#0a0a0a', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderTop: '1px solid #c9a96e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', width: '100%', maxWidth: '280px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.4)' }} />
            <span style={{ color: '#c9a96e' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          </div>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#c9a96e', marginBottom: '8px' }}>
            {data.guest_name || 'Есім'}
          </p>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            {eventDate ? `${eventDate.getDate()} · ${String(eventDate.getMonth() + 1).padStart(2, '0')} · ${eventDate.getFullYear()}` : ''}
          </p>
          <div style={{ height: '40px' }} />
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
            Создано на <span style={{ color: '#c9a96e' }}>InviteApp</span>
          </p>
        </div>

      </div>
      <MusicButton 
        musicUrl={data.music_url} 
        defaultMusicUrl="https://uuavetegsohayzhtdthh.supabase.co/storage/v1/object/public/music/minezinkorkem.mp3"
      />
    </div>
  )
}