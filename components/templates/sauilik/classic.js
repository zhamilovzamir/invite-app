'use client'

import { useState, useEffect } from 'react'

export default function SauilikClassic({ data }) {
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
    <div style={{ background: '#f0f8ff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #e8f4fd 0%, #d4eaf7 50%, #e8f4fd 100%)', overflow: 'hidden' }}>

          {/* Звёздочки фон */}
          {['10% 20%','80% 15%','20% 70%','75% 65%','50% 40%','30% 85%','65% 30%'].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', left: pos.split(' ')[0], top: pos.split(' ')[1], fontSize: ['16px','12px','20px','14px','18px','10px','16px'][i], opacity: 0.3 }}>⭐</div>
          ))}

          {/* Рамка */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '2px solid #7ec8e3', borderRadius: '20px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 32px', width: '100%', textAlign: 'center' }}>

            <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#4a9abb', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'Georgia,serif' }}>
              ✨ Сәбилік той · Шақыру ✨
            </p>

            {/* Фото */}
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #7ec8e3', boxShadow: '0 0 30px rgba(126,200,227,0.4)', marginBottom: '24px', background: 'linear-gradient(135deg,#d4eaf7,#b8d9f0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.photo_url ? (
                <img src={data.photo_url} alt="Фото" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '64px' }}>👶</span>
              )}
            </div>

            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '44px', fontStyle: 'italic', color: '#2a7a9b', marginBottom: '8px', lineHeight: 1 }}>
              {data.guest_name || 'Есім'}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0 24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #7ec8e3)' }} />
              <span style={{ color: '#7ec8e3', fontSize: '18px' }}>⭐</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #7ec8e3)' }} />
            </div>

            <p style={{ fontFamily: 'Georgia,serif', fontSize: '15px', color: '#4a7a8a', lineHeight: 1.8, marginBottom: '32px', maxWidth: '280px' }}>
              Сіздерді сүйікті <span style={{ color: '#2a7a9b', fontWeight: '600' }}>{data.guest_name || 'сәбиіміздің'}</span> сәбилік тойына шақырамыз
            </p>

            {eventDate && (
              <div style={{ background: 'rgba(126,200,227,0.15)', border: '2px solid #7ec8e3', borderRadius: '16px', padding: '20px 40px', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '48px', color: '#2a7a9b', lineHeight: 1 }}>
                  {eventDate.getDate()}
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a9abb', textTransform: 'uppercase', marginTop: '4px' }}>
                  {monthNames[eventDate.getMonth()]} · {eventDate.getFullYear()}
                </div>
              </div>
            )}

            <p style={{ fontSize: '11px', color: '#7aa8bb', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Құрметпен, {data.hosts || 'Ата-аналар'}
            </p>
          </div>
        </div>

        {/* COUNTDOWN */}
        <div style={{ background: '#2a7a9b', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Тойға дейін
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {[['Күн', days], ['Сағат', hours], ['Минут', mins], ['Секунд', secs]].map(([label, val], i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '36px', color: '#fff', lineHeight: 1, minWidth: '50px', textAlign: 'center' }}>{val}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{label}</div>
                </div>
                {i < 3 && <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.5)', lineHeight: 1, marginTop: '4px' }}>:</div>}
              </div>
            ))}
          </div>
        </div>

        {/* VENUE */}
        <div style={{ background: '#fff', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#4a9abb', textTransform: 'uppercase', marginBottom: '16px' }}>Мекенжайы</p>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#2a7a9b', textAlign: 'center', marginBottom: '8px' }}>
            {data.venue || 'Мейрамхана'}
          </h2>
          {data.event_time && (
            <p style={{ fontSize: '13px', letterSpacing: '2px', color: '#7aa8bb', textTransform: 'uppercase', marginBottom: '24px' }}>
              Уақыты: {data.event_time}
            </p>
          )}
          {data.map_url && (
            <a href={data.map_url} target="_blank" rel="noopener noreferrer"
              style={{ background: '#2a7a9b', color: '#fff', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', borderRadius: '90px', textDecoration: 'none', display: 'inline-block', marginBottom: '12px' }}>
              Картаны ашу
            </a>
          )}
          {data.telegram_channel && (
            <a href={data.telegram_channel} target="_blank" rel="noopener noreferrer"
              style={{ background: 'transparent', color: '#2a7a9b', border: '2px solid #7ec8e3', fontFamily: 'Georgia,serif', fontSize: '12px', letterSpacing: '2px', padding: '12px 32px', borderRadius: '90px', textDecoration: 'none', display: 'inline-block' }}>
              ✈️ Telegram каналы
            </a>
          )}
        </div>

        {/* RSVP */}
        <div style={{ background: '#f0f8ff', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid #d4eaf7' }}>
          <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#4a9abb', textTransform: 'uppercase', marginBottom: '8px' }}>Растау</p>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontStyle: 'italic', color: '#4a7a8a', textAlign: 'center', marginBottom: '28px' }}>
            Келуіңізді растауыңызды сұраймыз
          </p>

          {submitted ? (
            <div style={{ background: '#2a7a9b', color: '#fff', borderRadius: '16px', padding: '20px 40px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia,serif', fontSize: '18px' }}>Рахмет! 🎉</p>
              <p style={{ fontSize: '13px', marginTop: '8px', opacity: 0.8 }}>Жауабыңыз қабылданды</p>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Есіміңіз"
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #7ec8e3', borderRadius: '90px', background: '#fff', color: '#2a7a9b', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none' }} />
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Тілегіңіз (міндетті емес)" rows={2}
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #d4eaf7', borderRadius: '20px', background: '#fff', color: '#2a7a9b', fontFamily: 'Georgia,serif', fontSize: '14px', outline: 'none', resize: 'none' }} />
              {[['yes', '✓ Иә, барамын!'], ['with', '♥ Жұбайыммен бірге'], ['no', '✗ Келе алмаймын']].map(([val, label]) => (
                <button key={val} onClick={() => setRsvpChoice(val)}
                  style={{ width: '100%', padding: '14px 20px', border: `2px solid ${rsvpChoice === val ? '#2a7a9b' : '#d4eaf7'}`, borderRadius: '90px', background: rsvpChoice === val ? '#2a7a9b' : '#fff', color: rsvpChoice === val ? '#fff' : '#4a7a8a', fontFamily: 'Georgia,serif', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>
                  {label}
                </button>
              ))}
              <button onClick={handleRsvp}
                style={{ width: '100%', padding: '16px', background: '#2a7a9b', color: '#fff', border: 'none', borderRadius: '90px', fontFamily: 'Georgia,serif', fontSize: '13px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }}>
                Жауап беру
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ background: '#2a7a9b', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '32px', marginBottom: '16px' }}>👶</span>
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