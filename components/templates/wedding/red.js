'use client'

import { useState, useEffect } from 'react'

export default function WeddingRed({ data }) {
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [mins, setMins] = useState('00')
  const [secs, setSecs] = useState('00')
  const [guestName, setGuestName] = useState('')
  const [rsvpChoice, setRsvpChoice] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [comment, setComment] = useState('')
  const [wishes, setWishes] = useState([
    { author: 'Айгүл Н.', text: 'Бақытты болыңыздар! Өмірлеріңіз гүлдей жайнасын!' },
    { author: 'Ерлан М.', text: 'Жас жұбайларға бақыт пен ынтымақ тілеймін!' },
  ])
  const [showWishForm, setShowWishForm] = useState(false)
  const [newWishName, setNewWishName] = useState('')
  const [newWishText, setNewWishText] = useState('')

  // Countdown
  useEffect(() => {
    if (!data.event_date) return
    const target = new Date(data.event_date)

    function update() {
      const now = new Date()
      let diff = target - now
      if (diff < 0) diff = 0
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setDays(String(d).padStart(2, '0'))
      setHours(String(h).padStart(2, '0'))
      setMins(String(m).padStart(2, '0'))
      setSecs(String(s).padStart(2, '0'))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [data.event_date])

  // Calendar
  function renderCalendar() {
    if (!data.event_date) return null
    const date = new Date(data.event_date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const emptyBefore = firstDay === 0 ? 6 : firstDay - 1
    const monthNames = ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан']
    const dayNames = ['Дс','Сс','Ср','Бс','Жм','Сб','Жк']

    return (
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #dd7373', padding: '20px', width: '100%', maxWidth: '320px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontStyle: 'italic', color: '#fff' }}>
            {monthNames[month]}
          </span>
          <span style={{ fontSize: '13px', color: '#dd7373' }}>{year}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px', textAlign: 'center' }}>
          {dayNames.map(d => (
            <div key={d} style={{ fontSize: '9px', letterSpacing: '1px', color: '#dd7373', padding: '4px 0' }}>{d}</div>
          ))}
          {Array(emptyBefore).fill(null).map((_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array(daysInMonth).fill(null).map((_, i) => (
            <div key={i + 1} style={{
              fontSize: '12px',
              color: i + 1 === day ? '#fff' : 'rgba(255,255,255,0.6)',
              padding: '6px 4px',
              background: i + 1 === day ? '#dd7373' : 'transparent',
              borderRadius: i + 1 === day ? '50%' : '0',
              fontWeight: i + 1 === day ? '600' : '400',
            }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    )
  }

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
        comment: comment,
      }),
    })
    setSubmitted(true)
  }

  function addWish() {
    if (!newWishName || !newWishText) return
    setWishes([...wishes, { author: newWishName, text: newWishText }])
    setNewWishName('')
    setNewWishText('')
    setShowWishForm(false)
  }

  const eventDate = data.event_date ? new Date(data.event_date) : null
  const monthNames = ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан']

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '430px', margin: '0 auto', background: '#EFE1D4', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ position: 'relative', background: '#681313', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
          
          {/* Background gradients */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%,#9b1c1c 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 20% 80%,#4a0a0a 0%,transparent 60%)', zIndex: 0 }} />
          
          {/* Frame */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', bottom: '16px', border: '3px solid #dd7373', zIndex: 1, pointerEvents: 'none' }} />

          {/* Corner ornaments */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute', width: '40px', height: '40px', zIndex: 2,
              top: pos.includes('t') ? '10px' : 'auto',
              bottom: pos.includes('b') ? '10px' : 'auto',
              left: pos.includes('l') ? '10px' : 'auto',
              right: pos.includes('r') ? '10px' : 'auto',
              transform: pos === 'tr' ? 'scaleX(-1)' : pos === 'bl' ? 'scaleY(-1)' : pos === 'br' ? 'scale(-1,-1)' : 'none',
            }}>
              <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
                <path d="M2 38 L2 2 L38 2" stroke="#dd7373" strokeWidth="1.5"/>
                <circle cx="2" cy="2" r="3" fill="#dd7373"/>
              </svg>
            </div>
          ))}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 24px 40px', width: '100%' }}>
            
            <div style={{ fontFamily: 'Georgia,serif', fontSize: '13px', letterSpacing: '3px', color: '#dd7373', textTransform: 'uppercase', marginBottom: '24px' }}>
              Үйлену той · Шақыру
            </div>

            {/* Фото */}
            <div style={{ width: '200px', height: '260px', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', overflow: 'hidden', border: '3px solid #dd7373', boxShadow: '0 0 30px rgba(221,115,115,0.3)', background: 'linear-gradient(160deg,#8b1a1a 0%,#4a0d0d 100%)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {data.photo_url ? (
                <img src={data.photo_url} alt="Фото" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)' }}>
                  <svg viewBox="0 0 80 80" fill="none" width="60" height="60" opacity="0.4">
                    <circle cx="40" cy="30" r="16" stroke="white" strokeWidth="1.5"/>
                    <path d="M10 72 Q40 55 70 72" stroke="white" strokeWidth="1.5"/>
                  </svg>
                  <p style={{ fontSize: '11px', letterSpacing: '1px', textAlign: 'center' }}>Фото осында қосылады</p>
                </div>
              )}
            </div>

            {/* Names */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {data.guest_name ? (
                data.guest_name.split(/[&+]|және|мен/).map((name, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontFamily: 'Georgia,serif', fontSize: '42px', color: '#fff', lineHeight: 1 }}>{name.trim()}</div>
                    {i < arr.length - 1 && <div style={{ color: '#dd7373', fontSize: '24px' }}>♥</div>}
                  </div>
                ))
              ) : (
                <>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '42px', color: '#fff', lineHeight: 1 }}>Мади</div>
                  <div style={{ color: '#dd7373', fontSize: '24px' }}>♥</div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '42px', color: '#fff', lineHeight: 1 }}>Камила</div>
                </>
              )}
            </div>

            <div style={{ fontFamily: 'Georgia,serif', fontSize: '14px', letterSpacing: '4px', color: '#dd7373', textTransform: 'uppercase', marginBottom: '32px' }}>
              Үйлену тойы · {eventDate?.getFullYear() || '2026'}
            </div>

            {/* Date badge */}
            {eventDate && (
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid #dd7373', padding: '14px 32px', textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '36px', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>
                  {eventDate.getDate()}
                </div>
                <div style={{ fontSize: '12px', letterSpacing: '3px', color: '#dd7373', textTransform: 'uppercase' }}>
                  {monthNames[eventDate.getMonth()]} · {eventDate.getFullYear()}
                </div>
              </div>
            )}

            {/* Ornament */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', width: '100%', maxWidth: '300px' }}>
              <div style={{ flex: 1, height: '1px', background: '#dd7373' }} />
              <div style={{ width: '8px', height: '8px', background: '#dd7373', transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: '1px', background: '#dd7373' }} />
            </div>

            <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.7, maxWidth: '300px', marginBottom: '24px' }}>
              Сіз(дер)ді {data.hosts || 'отбасымыздың'} үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.
            </p>

            <div style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontStyle: 'italic', color: '#dd7373', marginBottom: '40px' }}>
              Құрметпен, {data.hosts || 'Отбасы'}
            </div>
          </div>
        </div>

        {/* COUNTDOWN */}
        <div style={{ background: '#4a0d0d', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '2px solid #dd7373', borderBottom: '2px solid #dd7373' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#dd7373', textTransform: 'uppercase', marginBottom: '20px' }}>
            Тойға дейін қалған уақыт
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'center' }}>
            {[['Күн', days], ['Сағат', hours], ['Минут', mins], ['Секунд', secs]].map(([label, val], i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: '40px', color: '#fff', lineHeight: 1, minWidth: '60px', textAlign: 'center' }}>{val}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#dd7373', textTransform: 'uppercase' }}>{label}</div>
                </div>
                {i < 3 && <div style={{ fontSize: '32px', color: '#dd7373', lineHeight: 1, marginTop: '4px' }}>:</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div style={{ background: '#681313', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '22px', letterSpacing: '2px', color: '#dd7373', textAlign: 'center', textTransform: 'uppercase', marginBottom: '24px' }}>
            Күнтізбе
          </div>
          {renderCalendar()}
        </div>

        {/* VENUE */}
        <div style={{ background: '#EFE1D4', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '22px', letterSpacing: '2px', color: '#681313', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>
            Мекенжайы
          </div>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontStyle: 'italic', color: '#681313', textAlign: 'center', marginBottom: '4px' }}>
            {data.venue || 'Мейрамхана'}
          </div>
          <div style={{ fontSize: '13px', letterSpacing: '2px', color: '#681313', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>
            {data.event_time && `Уақыты: ${data.event_time}`}
          </div>

          {data.map_url && (
            <a href={data.map_url} target="_blank" rel="noopener noreferrer"
              style={{ background: '#681313', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', padding: '12px 32px', borderRadius: '90px', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
              Картаны ашу
            </a>
          )}
        </div>

        {/* RSVP */}
        <div style={{ background: '#EFE1D4', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(104,19,19,0.2)' }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '22px', letterSpacing: '2px', color: '#681313', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>
            Растау
          </div>
          <p style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontStyle: 'italic', color: '#681313', textAlign: 'center', marginBottom: '28px' }}>
            Тойға келуіңізді растауыңызды сұраймыз
          </p>

          {submitted ? (
            <div style={{ background: '#681313', color: '#fff', borderRadius: '90px', padding: '14px 24px', fontSize: '13px', textAlign: 'center' }}>
              Рахмет! Жауабыңыз қабылданды 🎉
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="Есіміңізді енгізіңіз"
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #681313', borderRadius: '90px', background: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '13px', color: '#681313', outline: 'none' }}
              />
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Пікір (міндетті емес)"
                rows={2}
                style={{ width: '100%', padding: '14px 20px', border: '2px solid #681313', borderRadius: '20px', background: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '13px', color: '#681313', outline: 'none', resize: 'none' }}
              />
              {['yes', 'with', 'no'].map((val, i) => (
                <button key={val} onClick={() => setRsvpChoice(val)}
                  style={{ width: '100%', padding: '14px 20px', border: '2px solid #681313', borderRadius: '90px', background: rsvpChoice === val ? '#681313' : '#fff', color: rsvpChoice === val ? '#fff' : '#681313', fontFamily: 'Montserrat,sans-serif', fontSize: '12px', cursor: 'pointer', textAlign: 'left' }}>
                  {['✓ Иә, барамын!', '♥ Жұбайыммен бірге барамын', '✗ Өкінішке орай, келе алмаймын'][i]}
                </button>
              ))}
              <button onClick={handleRsvp}
                style={{ width: '100%', padding: '16px', background: '#681313', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '13px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', border: 'none', borderRadius: '90px', cursor: 'pointer' }}>
                Жауап беру
              </button>
            </div>
          )}
        </div>

        {/* WISHES */}
        <div style={{ background: '#EFE1D4', padding: '32px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(104,19,19,0.2)' }}>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '22px', letterSpacing: '2px', color: '#681313', textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px' }}>
            Тойға ізгі тілектер
          </div>

          {wishes.map((w, i) => (
            <div key={i} style={{ width: '100%', maxWidth: '320px', background: '#fff', border: '1px solid rgba(104,19,19,0.2)', padding: '16px 20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#681313', marginBottom: '6px', letterSpacing: '1px' }}>{w.author}</div>
              <div style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: '15px', color: '#555', lineHeight: 1.6 }}>{w.text}</div>
            </div>
          ))}

          {showWishForm ? (
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <input value={newWishName} onChange={e => setNewWishName(e.target.value)} placeholder="Есіміңіз" style={{ padding: '12px 20px', border: '2px solid #681313', borderRadius: '90px', fontFamily: 'Montserrat,sans-serif', fontSize: '13px', color: '#681313', outline: 'none' }} />
              <textarea value={newWishText} onChange={e => setNewWishText(e.target.value)} placeholder="Тілегіңіз..." rows={3} style={{ padding: '12px 20px', border: '2px solid #681313', borderRadius: '20px', fontFamily: 'Montserrat,sans-serif', fontSize: '13px', color: '#681313', outline: 'none', resize: 'none' }} />
              <button onClick={addWish} style={{ padding: '12px', background: '#681313', color: '#fff', border: 'none', borderRadius: '90px', fontFamily: 'Montserrat,sans-serif', fontSize: '12px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer' }}>
                Жіберу
              </button>
            </div>
          ) : (
            <button onClick={() => setShowWishForm(true)}
              style={{ background: 'transparent', color: '#681313', border: '2px solid #681313', borderRadius: '90px', fontFamily: 'Montserrat,sans-serif', fontSize: '11px', letterSpacing: '2px', fontWeight: '600', textTransform: 'uppercase', padding: '12px 28px', cursor: 'pointer', marginTop: '8px' }}>
              ✎ Тілек жазу
            </button>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ background: '#681313', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', width: '100%', maxWidth: '300px', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(221,115,115,0.4)' }} />
            <div style={{ width: '8px', height: '8px', background: '#dd7373', transform: 'rotate(45deg)' }} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(221,115,115,0.4)' }} />
          </div>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '16px', letterSpacing: '2px', color: '#dd7373', textTransform: 'uppercase', marginBottom: '12px' }}>
            {data.hosts || 'ОТБАСЫ'} ӘУЛЕТІ
          </div>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '32px', fontStyle: 'italic', color: '#fff', marginBottom: '8px' }}>
            {data.guest_name || 'Мади ♥ Камила'}
          </div>
          {eventDate && (
            <div style={{ fontSize: '12px', letterSpacing: '3px', color: '#dd7373', textTransform: 'uppercase' }}>
              {eventDate.getDate()} · {String(eventDate.getMonth() + 1).padStart(2, '0')} · {eventDate.getFullYear()}
            </div>
          )}
          <div style={{ height: '60px' }} />
        </div>

      </div>
    </div>
  )
}