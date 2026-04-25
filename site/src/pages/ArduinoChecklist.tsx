import { useState } from 'react'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import styles from './ArduinoChecklist.module.css'

type Tab = 'checklist' | 'errors' | 'practices'

const CHECKLIST_ITEMS = [
  { text: 'Arduino plugged into USB', hint: null },
  { text: 'Green power LED lit on Arduino', hint: null },
  { text: 'Correct board selected', hint: 'Tools → Board → Arduino Uno' },
  { text: 'Correct port selected', hint: 'Tools → Port → (shows your Arduino)' },
  { text: 'Code compiled without errors', hint: 'Orange text = errors to fix' },
  { text: 'Code uploaded successfully', hint: '"Done uploading" message appears' },
  { text: 'LED strip has power connected', hint: 'Red to 5V, White to GND' },
  { text: 'LED strip data pin connected', hint: 'Green to Pin 6 or your DATA_PIN' },
]

const ERRORS = [
  {
    title: '"Port not found" or "Upload failed"',
    fixes: [
      { text: 'Check USB cable is fully plugged in' },
      { text: 'Try a different USB port' },
      { text: 'Press reset button on Arduino' },
      { text: 'Go to ', code: 'Tools → Port', after: ' and reselect' },
    ],
  },
  {
    title: 'Orange text in console (compilation error)',
    fixes: [
      { text: 'Look for red underline in code' },
      { text: 'Check for missing semicolon ', code: ';' },
      { text: 'Check for missing bracket ', code: '}', after: ' or ', code2: ')' },
      { text: 'Did you close all quotes ', code: '" "', after: ' ?' },
    ],
  },
  {
    title: "LEDs don't light up",
    fixes: [
      { text: 'Check power: Red to 5V, White to GND' },
      { text: 'Check data: Green wire to correct pin' },
      { text: 'Is LED strip backwards? Look for arrows →' },
      { text: 'Try ', code: 'FastLED.setBrightness(100);' },
    ],
  },
  {
    title: 'Sensor reads weird numbers',
    fixes: [
      { text: 'Check sensor wiring (VCC, GND, Signal)' },
      { text: 'Open Serial Monitor: ', code: 'Tools → Serial Monitor' },
      { text: 'Print value: ', code: 'Serial.println(value);' },
      { text: 'Adjust sensor position/lighting' },
    ],
  },
  {
    title: '"I broke it and don\'t know what I did!"',
    fixes: [
      { text: '', code: 'File → Open', after: ' → Load your last saved version' },
      { text: 'Or re-copy the original snippet from folder' },
      { text: 'THIS IS WHY WE SAVE OFTEN! 💾' },
    ],
  },
]

const PRACTICES = [
  {
    title: 'Save Your Working Code',
    content: 'Before making ANY changes:',
    code: 'File → Save As',
    after: '\nGive it a descriptive name like ',
    code2: 'rainbow_v1.ino',
    examples: [
      { good: true, text: '✓ basic_working.ino\n✓ sensor_test.ino\n✓ final_day2.ino' },
    ],
  },
  {
    title: 'Change One Thing at a Time',
    examples: [
      { good: true, text: '✅ Change brightness → Test → Save' },
      { good: false, text: '❌ Change 10 things → Upload → "What broke?"' },
    ],
  },
  {
    title: 'Comment Your Code',
    content: 'Comments help you remember WHY you did something!',
    examples: [
      { good: true, text: '// Changed from 100 - was too bright\nint brightness = 50;' },
    ],
  },
  {
    title: 'Test Frequently',
    content: 'After every small change:\n• Upload code\n• Watch what happens\n• If it works: SAVE IT!\n• If it breaks: Undo and try again',
  },
  {
    title: 'Read Error Messages',
    content: 'Orange text tells you WHAT is wrong and WHERE:',
    examples: [
      { good: true, text: 'sketch.ino:23:5 = Line 23, position 5' },
    ],
  },
]

export function ArduinoChecklist() {
  const [activeTab, setActiveTab] = useState<Tab>('checklist')
  const [checked, setChecked] = useState<boolean[]>(Array(CHECKLIST_ITEMS.length).fill(false))

  const toggle = (i: number) => {
    setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  const allChecked = checked.every(Boolean)

  return (
    <PageTransition>
      <div className={styles.page}>
        <div className={styles.poster}>
          {/* Background SVG */}
          <svg className={styles.svgBackground} viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="acGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3"/>
              </linearGradient>
              <filter id="acGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <pattern id="acDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="rgba(148,163,184,0.15)"/>
              </pattern>
              <symbol id="acNode" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="4" fill="none" stroke="url(#acGrad)" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="1.5" fill="#c084fc" opacity="0.6"/>
              </symbol>
            </defs>
            <rect width="100%" height="100%" fill="url(#acDots)"/>
            <g stroke="url(#acGrad)" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M 0 150 L 80 150 L 80 80 L 150 80"/><path d="M 150 80 L 150 40"/><path d="M 80 150 L 80 200 L 40 200"/>
              <path d="M 800 100 L 700 100 L 700 180 L 620 180"/><path d="M 700 100 L 700 50"/><path d="M 620 180 L 620 250 L 580 250"/>
              <path d="M 0 450 L 60 450 L 60 380 L 120 380 L 120 420"/><path d="M 60 450 L 60 520 L 100 520"/>
              <path d="M 800 500 L 720 500 L 720 440 L 680 440"/><path d="M 720 500 L 720 580"/>
              <path d="M 50 900 L 50 850 L 120 850 L 120 800"/><path d="M 120 850 L 180 850 L 180 900 L 180 950"/>
              <path d="M 750 850 L 750 780 L 680 780 L 680 820"/><path d="M 680 780 L 620 780 L 620 850"/><path d="M 750 850 L 750 920 L 700 920"/>
            </g>
            <g filter="url(#acGlow)">
              <use href="#acNode" x="70" y="140" width="20" height="20"/><use href="#acNode" x="140" y="70" width="20" height="20"/>
              <use href="#acNode" x="690" y="90" width="20" height="20"/><use href="#acNode" x="610" y="170" width="20" height="20"/>
              <use href="#acNode" x="50" y="440" width="20" height="20"/><use href="#acNode" x="710" y="490" width="20" height="20"/>
              <use href="#acNode" x="110" y="840" width="20" height="20"/><use href="#acNode" x="740" y="840" width="20" height="20"/>
            </g>
            <g opacity="0.15">
              <polygon points="400,30 430,47 430,83 400,100 370,83 370,47" fill="none" stroke="#a78bfa" strokeWidth="1"/>
              <rect x="200" y="120" width="12" height="12" rx="2" fill="none" stroke="#c084fc" strokeWidth="1" transform="rotate(45 206 126)"/>
              <rect x="600" y="300" width="12" height="12" rx="2" fill="none" stroke="#c084fc" strokeWidth="1" transform="rotate(45 606 306)"/>
            </g>
            <g fill="#c084fc">
              <circle cx="300" cy="200" r="2" opacity="0.3"/><circle cx="500" cy="400" r="1.5" opacity="0.2"/>
              <circle cx="180" cy="500" r="2" opacity="0.25"/><circle cx="350" cy="750" r="2" opacity="0.3"/>
            </g>
          </svg>

          <div className={styles.gradientOverlay}/>

          {/* Corner accents */}
          <svg className={`${styles.cornerAccent} ${styles.topLeft}`} viewBox="0 0 80 80">
            <path d="M 0 20 L 20 20 L 20 0" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="2"/>
            <circle cx="20" cy="20" r="3" fill="#c084fc" opacity="0.5"/>
          </svg>
          <svg className={`${styles.cornerAccent} ${styles.bottomRight}`} viewBox="0 0 80 80">
            <path d="M 0 20 L 20 20 L 20 0" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="2"/>
            <circle cx="20" cy="20" r="3" fill="#a78bfa" opacity="0.5"/>
          </svg>

          <div className={styles.content}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.badge}>Workshop Reference</div>
              <h1 className={styles.title}>📚 Quick Reference Guide</h1>
              <p className={styles.subtitle}>Electronics Workshop</p>
            </div>

            {/* Tabs */}
            <div className={styles.tabNav}>
              {(['checklist', 'errors', 'practices'] as Tab[]).map((tab, i) => (
                <button
                  key={tab}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {['✓ Checklist', '🔧 Errors', '💾 Best Practices'][i]}
                </button>
              ))}
            </div>

            {/* Tab: Checklist */}
            {activeTab === 'checklist' && (
              <div className={styles.checklistContainer}>
                <div className={`${styles.checklistIntro} ${allChecked ? styles.allChecked : ''}`}>
                  <p>
                    {allChecked
                      ? <>Still stuck? Call the teacher! <span>🖐️</span></>
                      : 'Keep checking for the common issues below!'}
                  </p>
                </div>
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`${styles.checklistItem} ${checked[i] ? styles.itemChecked : ''}`}
                    onClick={() => toggle(i)}
                  >
                    <div className={`${styles.checkbox} ${checked[i] ? styles.checkboxChecked : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ opacity: checked[i] ? 1 : 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemText}>{item.text}</div>
                      {item.hint && <div className={styles.itemHint}>{item.hint}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Errors */}
            {activeTab === 'errors' && (
              <div>
                {ERRORS.map((err, i) => (
                  <div key={i} className={styles.errorCard}>
                    <div className={styles.errorTitle}>{err.title}</div>
                    <ul className={styles.fixList}>
                      {err.fixes.map((fix, j) => (
                        <li key={j}>
                          {fix.text}
                          {fix.code && <code className={styles.code}>{fix.code}</code>}
                          {fix.after}{fix.code2 && <code className={styles.code}>{fix.code2}</code>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Best Practices */}
            {activeTab === 'practices' && (
              <div>
                {PRACTICES.map((p, i) => (
                  <div key={i} className={styles.ruleCard}>
                    <div className={styles.ruleTitle}>
                      <span className={styles.ruleNumber}>{i + 1}</span>
                      {p.title}
                    </div>
                    <div className={styles.ruleContent}>
                      {p.content && (
                        <p style={{ whiteSpace: 'pre-line', marginBottom: p.examples ? '0.75rem' : 0 }}>
                          {p.content}
                          {p.code && <><code className={styles.code}>{p.code}</code>{p.after}</>}
                          {p.code2 && <code className={styles.code}>{p.code2}</code>}
                        </p>
                      )}
                      {p.examples?.map((ex, j) => (
                        <div key={j} className={`${styles.exampleBox} ${ex.good ? styles.exGood : styles.exBad}`}>
                          <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap' }}>{ex.text}</pre>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
