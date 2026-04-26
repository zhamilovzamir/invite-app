'use client'

import { useState, useEffect } from 'react'

export default function TuganKunClassic({ data }) {
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
    <div style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #2d1b69 0%, #11998e 100%)', overflow: 'hidden' }}>

          {/* Звёзды */}
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ position: 'absolute', width: '4px', height: '4px', background: '#fff', borderRadius: '50%', opacity: Math.random() * 0.5 + 0.2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}

          {/* Рамка */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 32px', width: '100%', textAlign: 'center' }}>

            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎂</div>

            <p style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '24px' }}>
              Туған күн · Шақыру
            </p>

            {/* Фото */}
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.5)', boxShadow: '0 0 40px rgba(255,255,255,0.1)', marginBottom: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.photo_url ? (
                <img src={data.photo_url} alt="Фото" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '64px' }}>🎂</span>
              )}
            </div>

            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '44px', fontStyle: 'italic', color: '#fff', marginBottom: '8px', lineHeight: 1 }}>
              {data.guest_name || 'Есім'}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4))' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>🎉</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.4))' }} />
            </div>

            <p style={{ fontFamily: 'Georgia,serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '280px' }}>
              Сіздерді <span style={{ color: '#fff', fontWeight: '600' }}>{data.guest_name || 'есімі'}</span>-дің туған күніне шақырамыз
            </p>

            {eventDate && (
              <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', padding: '20px 40px', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '48px', color: '#fff', lineHeight: 1 }}>
                  {eventDate.getDate()}
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '4px' }}>
                  {monthNames[eventDate.getMonth()]} · {eventDate.getFullYear()}
                </div>
              </div>
            )}

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {data.hosts || 'Отбасы'}
            </p>
          </div>
        </div>

        {/* COUNTDOWN */}
        <div style={{ background: '#11998e', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '20px' }}>
            🎂 Тойға дейін қалды
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {[['Күн', days], ['Сағат', hours], ['Минут', mins], ['Секунд', secs]].map(([label, val], i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '8px 12px', fontFamily: 'Georgia,serif', fontSize: '36px', color: '#fff', lineHeight: 1, minWidth: '50px', textAlign: 'center' }}>{val}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{label}</div>
                </div>
                {i < 3 && <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.5)', lineHeight: 1, marginTop: '8px' }}>:</div>}
              </div>
            ))}
          </div>
        </div>

        {/* VENUE */}
        <div style={{ background: '#fff', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📍</div>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#11998e', textTransform: 'uppercase', marginBottom: '16px' }}>Мекенжайы</p>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#2d1b69', textAlign: 'center', marginBottom: '8px' }}>
            {data.venue || 'Мейрамхана'}
          </h2>
          {data.event_time && (
            <p style={{ fontSize: '13px', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase', marginBottom: '24px' }}>
              🕐 {data.event_time}
            </p>
          )}
          {data.map_url && (
            <a href={data.map_url} target="_blank" rel="noopener noreferrer"
              style={{ background: 'linear-gradient(135deg,#2d1b69,#11998e)', color: '#fff', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', borderRadius: '90px', textDecoration: 'none', display: 'inline-block', marginBottom: '12px' }}>
              🗺️ Картаны ашу
            </a>
          )}
          {data.telegram_channel && (
            <a href={data.telegram_channel} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#2d1b69', border: '2px solid #2d1b69', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', borderRadius: '90px', textDecoration: 'none', display: 'inline-block' }}>
              ✈️ Telegram каналы
            </a>
          )}
        </div>

        {/* RSVP */}
        <div style={{ background: '#f8f6ff', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>💌</div>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#2d1b69', textTransform: 'uppercase', marginBottom: '8px' }}>Растау</p>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontStyle: 'italic', color: '#888', textAlign: 'center', marginBottom: '28px' }}>
            Келуіңізді растауыңызды сұраймыз
          </p>

          {submitted ? (
            <div style={{ background: 'linear-gradient(135deg,#2d1b69,#11998e)', borderRadius: '20px', padding: '24px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎉</div>
              <p style={{ fontFamily: 'Georgia,serif', fontSize: '18px', color: '#fff' }}>Рахмет!</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Жауабыңыз қабылданды</p>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Есіміңіз"
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #e0d9ff', borderRadius: '90px', background: '#fff', color: '#2d1b69', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none' }} />
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Тілегіңіз (міндетті емес)" rows={2}
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #e0d9ff', borderRadius: '20px', background: '#fff', color: '#2d1b69', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none', resize: 'none' }} />
              {[['yes', '🎂 Иә, барамын!'], ['with', '💕 Жұбайыммен бірге'], ['no', '😢 Келе алмаймын']].map(([val, label]) => (
                <button key={val} onClick={() => setRsvpChoice(val)}
                  style={{ width: '100%', padding: '14px 20px', border: `2px solid ${rsvpChoice === val ? '#2d1b69' : '#e0d9ff'}`, borderRadius: '90px', background: rsvpChoice === val ? '#2d1b69' : '#fff', color: rsvpChoice === val ? '#fff' : '#888', fontFamily: 'Georgia,serif', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>
                  {label}
                </button>
              ))}
              <button onClick={handleRsvp}
                style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#2d1b69,#11998e)', color: '#fff', border: 'none', borderRadius: '90px', fontFamily: 'Georgia,serif', fontSize: '13px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }}>
                Жауап беру
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ background: 'linear-gradient(160deg,#2d1b69,#11998e)', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎂</div>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#fff', marginBottom: '8px' }}>
            {data.guest_name || 'Есім'}
          </p>
          {eventDate && (
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
              {eventDate.getDate()} · {String(eventDate.getMonth() + 1).padStart(2, '0')} · {eventDate.getFullYear()}
            </p>
          )}
          <div style={{ height: '40px' }} />
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
            Создано на <span style={{ color: 'rgba(255,255,255,0.6)' }}>InviteApp</span>
          </p>
        </div>

      </div>
    </div>
  )
}