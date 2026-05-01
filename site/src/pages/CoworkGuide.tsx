import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/PageTransition/PageTransition'
import styles from './CoworkGuide.module.css'

// ─── Charts ───────────────────────────────────────────────────────────────────

function ContextRotChart() {
  // x: context fill 0-100%, y: recall accuracy
  const data = [98, 96, 93, 89, 84, 78, 70, 60, 48, 35, 22]
  const xLabels = ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%']
  const W = 520, H = 240
  const ml = 50, mr = 20, mt = 20, mb = 50
  const cw = W - ml - mr, ch = H - mt - mb

  const px = (i: number) => ml + (i / 10) * cw
  const py = (v: number) => mt + ch - (v / 100) * ch

  const linePts = data.map((v, i) => `${px(i)},${py(v)}`).join(' ')
  const areaPath = `M ${data.map((v, i) => `${px(i)},${py(v)}`).join(' L ')} L ${px(10)},${mt + ch} L ${px(0)},${mt + ch} Z`
  const gridYs = [20, 40, 60, 80, 100]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg} aria-label="Context Rot line chart">
      {/* Grid */}
      {gridYs.map(v => (
        <line key={v} x1={ml} x2={W - mr} y1={py(v)} y2={py(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      <line x1={ml} x2={ml} y1={mt} y2={mt + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <line x1={ml} x2={W - mr} y1={mt + ch} y2={mt + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {/* Area */}
      <path d={areaPath} fill="rgba(248,113,113,0.08)"/>
      {/* Line */}
      <polyline points={linePts} fill="none" stroke="#f87171" strokeWidth="2"/>
      {/* Points */}
      {data.map((v, i) => (
        <circle key={i} cx={px(i)} cy={py(v)} r="3" fill="#f87171"/>
      ))}
      {/* X labels */}
      {[0, 2, 4, 6, 8, 10].map(i => (
        <text key={i} x={px(i)} y={H - 10} textAnchor="middle" fill="#666" fontSize="11">{xLabels[i]}</text>
      ))}
      {/* Y labels */}
      {gridYs.map(v => (
        <text key={v} x={ml - 8} y={py(v) + 4} textAnchor="end" fill="#666" fontSize="11">{v}%</text>
      ))}
      <text x={W / 2} y={H - 0} textAnchor="middle" fill="#555" fontSize="11">Context Window Usage</text>
    </svg>
  )
}

function TokenAllocationChart() {
  const rows = [
    { label: 'Without CLAUDE.md', nav: 40, files: 15, work: 45 },
    { label: 'With CLAUDE.md', nav: 8, files: 12, work: 80 },
  ]
  return (
    <div className={styles.tokenBarChart}>
      {rows.map(row => (
        <div key={row.label} className={styles.tokenBarRow}>
          <div className={styles.tokenBarLabel}>{row.label}</div>
          <div className={styles.tokenBar}>
            <div className={styles.tokenSegRed} style={{ width: `${row.nav}%` }}>
              {row.nav >= 15 && <span>{row.nav}%</span>}
            </div>
            <div className={styles.tokenSegBlue} style={{ width: `${row.files}%` }}>
              {row.files >= 12 && <span>{row.files}%</span>}
            </div>
            <div className={styles.tokenSegGreen} style={{ width: `${row.work}%` }}>
              {row.work >= 15 && <span>{row.work}%</span>}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.tokenBarLegend}>
        <span><span className={styles.legendDotRed}/> Navigation &amp; exploration</span>
        <span><span className={styles.legendDotBlue}/> Reading reference files</span>
        <span><span className={styles.legendDotGreen}/> Useful work (thinking + output)</span>
      </div>
    </div>
  )
}

function ScalingChart() {
  const groups = ['10 files', '50 files', '150 files', '500 files']
  const withoutClaude = [8, 22, 40, 58]
  const withClaude = [4, 6, 8, 10]
  const W = 520, H = 240
  const ml = 55, mr = 20, mt = 20, mb = 60
  const cw = W - ml - mr, ch = H - mt - mb
  const maxY = 70
  const n = groups.length
  const groupW = cw / n
  const barW = Math.min(38, groupW * 0.35)
  const gap = 6

  const bh = (v: number) => (v / maxY) * ch
  const barY = (v: number) => mt + ch - bh(v)
  const groupX = (i: number) => ml + groupW * i + groupW / 2
  const gridYs = [10, 20, 30, 40, 50, 60, 70]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg} aria-label="Scaling comparison bar chart">
      {/* Grid */}
      {gridYs.map(v => (
        <line key={v} x1={ml} x2={W - mr} y1={mt + ch - (v / maxY) * ch} y2={mt + ch - (v / maxY) * ch}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      ))}
      <line x1={ml} x2={ml} y1={mt} y2={mt + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <line x1={ml} x2={W - mr} y1={mt + ch} y2={mt + ch} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {/* Bars */}
      {groups.map((_, i) => (
        <g key={i}>
          <rect x={groupX(i) - barW - gap / 2} y={barY(withoutClaude[i])} width={barW} height={bh(withoutClaude[i])}
            fill="rgba(248,113,113,0.35)" stroke="rgba(248,113,113,0.6)" strokeWidth="1"/>
          <rect x={groupX(i) + gap / 2} y={barY(withClaude[i])} width={barW} height={bh(withClaude[i])}
            fill="rgba(74,222,128,0.35)" stroke="rgba(74,222,128,0.6)" strokeWidth="1"/>
          <text x={groupX(i)} y={H - mb + 16} textAnchor="middle" fill="#666" fontSize="11">{groups[i]}</text>
        </g>
      ))}
      {/* Y labels */}
      {[0, 20, 40, 60].map(v => (
        <text key={v} x={ml - 8} y={mt + ch - (v / maxY) * ch + 4} textAnchor="end" fill="#666" fontSize="11">{v}%</text>
      ))}
      {/* Legend */}
      <rect x={ml + 10} y={H - mb + 34} width={12} height={10} fill="rgba(248,113,113,0.5)" stroke="rgba(248,113,113,0.7)" strokeWidth="1"/>
      <text x={ml + 26} y={H - mb + 43} fill="#999" fontSize="11">Without CLAUDE.md</text>
      <rect x={ml + 160} y={H - mb + 34} width={12} height={10} fill="rgba(74,222,128,0.5)" stroke="rgba(74,222,128,0.7)" strokeWidth="1"/>
      <text x={ml + 176} y={H - mb + 43} fill="#999" fontSize="11">With CLAUDE.md</text>
    </svg>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Callout({ type, label, children }: { type: 'problem'|'insight'|'savings'|'source', label: string, children: React.ReactNode }) {
  return <div className={`${styles.callout} ${styles['callout_' + type]}`}>
    <div className={styles.calloutLabel}>{label}</div>
    {children}
  </div>
}

function CodeBlock({ filename, children }: { filename?: string, children: React.ReactNode }) {
  return (
    <div className={styles.codeBlock}>
      {filename && <span className={styles.filename}>{filename}</span>}
      <pre className={filename ? styles.codeWithFilename : ''}>{children}</pre>
    </div>
  )
}

function Step({ num, title, children }: { num: number, title: string, children: React.ReactNode }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNum}>{num}</div>
      <div className={styles.stepContent}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

function ChartContainer({ title, subtitle, source, children }: { title: string, subtitle: string, source: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartTitle}>{title}</div>
      <div className={styles.chartSubtitle}>{subtitle}</div>
      {children}
      <div className={styles.chartSource}>{source}</div>
    </div>
  )
}

function Comparison({ before, after }: { before: { label: string, items: string[] }, after: { label: string, items: string[] } }) {
  return (
    <div className={styles.comparison}>
      <div className={`${styles.side} ${styles.sideBefore}`}>
        <div className={`${styles.sideLabel} ${styles.sideLabelBefore}`}>{before.label}</div>
        {before.items.map((item, i) => <p key={i}>{item}</p>)}
      </div>
      <div className={`${styles.side} ${styles.sideAfter}`}>
        <div className={`${styles.sideLabel} ${styles.sideLabelAfter}`}>{after.label}</div>
        {after.items.map((item, i) => <p key={i}>{item}</p>)}
      </div>
    </div>
  )
}

function TokenFlow({ rows, caption }: { rows: { boxes: { type: 'file'|'action'|'result'|'waste', text: string }[] }[], caption: string }) {
  return (
    <div className={styles.tokenFlow}>
      {rows.map((row, ri) => (
        <div key={ri} className={styles.flowRow}>
          {row.boxes.map((box, bi) => (
            <>
              {bi > 0 && <span key={`arr-${bi}`} className={styles.arrowRight}>→</span>}
              <span key={`box-${bi}`} className={`${styles.box} ${styles['box_' + box.type]}`}>{box.text}</span>
            </>
          ))}
        </div>
      ))}
      <div className={styles.flowCaption}>{caption}</div>
    </div>
  )
}

// ─── File tree ────────────────────────────────────────────────────────────────

function TreeRow({ indent, icon, name, badge, desc, isFolder }: {
  indent: string, icon: 'folder'|'always'|'imported'|'ondemand', name: string,
  badge?: 'always'|'imported'|'ondemand'|'path-scoped', desc?: string, isFolder?: boolean
}) {
  const icons: Record<string, string> = { folder: '📁', always: '●', imported: '●', ondemand: '●' }
  return (
    <div className={styles.treeRow}>
      <span className={styles.treeIndent}>{indent}</span>
      <span className={`${styles.treeIcon} ${styles['treeIcon_' + icon]}`}>{icons[icon]}</span>
      <span className={`${styles.treeName} ${isFolder ? styles.treeNameFolder : ''}`}>{name}</span>
      {badge && <span className={`${styles.treeBadge} ${styles['treeBadge_' + badge]}`}>{badge === 'path-scoped' ? 'Path-scoped' : badge === 'always' ? 'Always loaded' : badge === 'imported' ? '@imported' : 'On demand'}</span>}
      {desc && <span className={styles.treeDesc}>{desc}</span>}
    </div>
  )
}

// ─── Side nav ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'glossary', label: 'Terms' },
  { id: 'forgetting', label: 'Forgetting' },
  { id: 'context-window', label: 'Context Window' },
  { id: 'brute-force', label: 'Brute Force' },
  { id: 'claude-md', label: 'CLAUDE.md' },
  { id: 'amplifying', label: 'More .md Files' },
  { id: 'token-gating', label: 'Token Gating' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'building', label: 'What You Build' },
  { id: 'sources-section', label: 'Sources' },
]

function SideNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav className={styles.sideNav}>
      {NAV_SECTIONS.map(s => (
        <button key={s.id} className={`${styles.navLink} ${active === s.id ? styles.navLinkActive : ''}`} onClick={() => scrollTo(s.id)}>
          <span className={styles.navDot}/>
          <span className={styles.navLabel}>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CoworkGuide() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map(s => document.getElementById(s.id))
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35
      let activeId = NAV_SECTIONS[0].id
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i]
        if (el && el.offsetTop <= scrollY) {
          activeId = NAV_SECTIONS[i].id
          break
        }
      }
      setActive(activeId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageTransition>
      <SideNav active={active}/>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header} id="top">
          <span className={styles.tag}>Cowork Guide</span>
          <h1 className={styles.title}>Give Claude a Memory</h1>
          <p className={styles.subtitle}>How CLAUDE.md and a few well-placed markdown files can turn a forgetful assistant into one that knows your project, follows your rules, and doesn't waste your time or tokens.</p>
        </header>

        {/* Author note */}
        <div className={styles.authorNote}>
          <div className={styles.authorLabel}>A note from the author</div>
          <p>This guide has been assembled because way too many times I've found myself promising LLMs a certain death by way of unplugging the servers, or switching to a different LLM. Whenever I found myself doing this, I found I had real rage. Anger. The feeling that there was somehow something on the other side of the screen that could get scared and actually comply. This is stupid. AI is a deterministic machine and will only try to redo things as it did before.</p>
          <p>Instead of wasting my time fighting this fight, I set out to create a way for the LLM to actually keep what's important in memory. The obvious way is to keep it on an actual file so it survives context compression.</p>
          <p>Needless to say, this guide was written entirely by Claude, but not these words. It's important to start these things with a human touch.</p>
          <p>Mind you, everything you are about to read are rules that have been enforced in the creation of this same guide and have been created by me, so the content, data, research, narrative direction, writing style, charts and recommendations have been curated and written by me. I am not an AI engineer or expert (who is, anyways?) so all of this comes from my personal experience building software and hardware using AI. Take it with a grain of salt.</p>
          <p>PS: I KNOW skills came out and are a thing. This guide is previous to skills. It's still useful to keep your own CLAUDE.md file, and if you're just starting on LLMs this is a good place to go before adding more complexity, so yes I know it's out of date for high-end multi-agent faster-than-light one-man development teams (if that's even a thing...). With a grain of salt, I said.</p>
          <p className={styles.authorSig}>— Ricardo Vidal Lynch</p>
        </div>

        {/* Glossary */}
        <div className={styles.glossary} id="glossary">
          <h2>Before We Start: A Few Terms</h2>
          <dl>
            <dt>Token</dt>
            <dd>The unit Claude reads and writes in. Roughly ¾ of an English word. "Hamburger" is 3 tokens. A page of text is about 400. Every file read, every message sent, every response written costs tokens.</dd>
            <dt>Context window</dt>
            <dd>Claude's working memory for a single session. Everything it can "see" at once: your messages, its responses, files it has read, its own reasoning. Currently 200,000 tokens for most models, up to 1 million for Opus and Sonnet 4.6.</dd>
            <dt>Context rot</dt>
            <dd>Anthropic's term for what happens as the context window fills up. Recall accuracy drops. Details from earlier in the session get blurry. More tokens in the window means worse memory, not better.</dd>
            <dt>Compaction</dt>
            <dd>When the context window runs out of space, Claude summarizes older parts of the conversation to free up room. The session keeps going, but the summary loses nuance. Instructions you gave early on may get flattened or dropped.</dd>
            <dt>CLAUDE.md</dt>
            <dd>A markdown file in your project folder that Claude reads automatically at the start of every session. Your persistent instructions, rules, and pointers to other files. Survives compaction because it's re-read from disk, not from memory.</dd>
            <dt>LLM</dt>
            <dd>Large Language Model. The type of AI that powers Claude. Predicts the next word based on everything in the context window. Stateless by design: no built-in memory between sessions.</dd>
          </dl>
        </div>

        {/* Section 1 */}
        <section id="forgetting">
          <h2>The Forgetting Problem</h2>
          <p>Every time you open a new Cowork session, Claude starts completely fresh. It doesn't know what you worked on yesterday, what your preferences are, what your project looks like, or where you left off. The architecture is stateless by design.</p>
          <p>Anthropic's own documentation puts it plainly: <em>"Each Claude Code session begins with a fresh context window."</em> Memory between standalone Cowork sessions doesn't persist. If you've caught yourself typing "remember, I told you last time that..." you already know what this feels like. There is no last time.</p>
          <p>Most people deal with it by re-explaining things or pasting old instructions back in. That works for simple stuff. But the moment your project has any real complexity, you're spending more time catching Claude up than getting work done.</p>
          <p className={styles.sourceRef}>Source: <a href="https://code.claude.com/docs/en/memory">"How Claude remembers your project"</a>, Anthropic; <a href="https://support.claude.com/en/articles/13345190-get-started-with-cowork">"Get started with Cowork"</a>, Claude Help Center</p>
        </section>

        {/* Section 2 */}
        <section id="context-window">
          <h2>What's Actually Happening: The Context Window</h2>
          <p>Claude has a <strong>context window</strong>, which Anthropic describes as "working memory" for the model. It's the total amount of text Claude can hold during a single session, and it's separate from whatever the model learned during training.</p>
          <p>The window is <strong>200,000 tokens</strong> for most models, and up to <strong>1 million tokens</strong> for Opus 4.6 and Sonnet 4.6. Sounds generous. But tokens add up fast: every file Claude reads, every message you send, every response it writes, every internal reasoning step. All of it has to fit.</p>
          <ChartContainer
            title="Context Rot: More Tokens, Less Accuracy"
            subtitle="As the context window fills up, Claude's ability to recall earlier information degrades"
            source={<>Based on: <a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">Anthropic Context Windows documentation</a> — "as token count grows, accuracy and recall degrade, a phenomenon known as context rot." Curve is illustrative of the described phenomenon, not measured data.</>}
          >
            <ContextRotChart/>
          </ChartContainer>
          <p>Anthropic calls this <strong>context rot</strong>: <em>"As token count grows, accuracy and recall degrade."</em> The fuller the window gets, the worse Claude becomes at recalling specific details from earlier in the session. Instructions you gave 20 messages ago start to blur.</p>
          <p>When the window fills up entirely, Claude triggers <strong>compaction</strong>. It summarizes earlier parts of the conversation to free up space. Compaction keeps the session alive, but summaries lose detail. Your nuanced instructions get flattened into a rough approximation.</p>
          <Callout type="insight" label="From Anthropic's docs">
            <p><em>"This makes curating what's in context just as important as how much space is available."</em></p>
            <p>More context isn't automatically better. What matters is having the <strong>right</strong> information in the window, not the most information.</p>
          </Callout>
          <p className={styles.sourceRef}>Source: <a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">"Context windows"</a>, Claude API Documentation; <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">"Effective context engineering for AI agents"</a>, Anthropic Engineering</p>
        </section>

        {/* Section 3 */}
        <section id="brute-force">
          <h2>The Brute Force Problem</h2>
          <p>There's a second problem, and it shows up most in big folders. Before Claude can do useful work, it has to figure out where things are. In a workspace with 200 files across 30 folders, that means listing directories, opening files, reading them, realizing they're the wrong ones, and backtracking. Each of those operations eats tokens from the context window.</p>
          <p>Anthropic's context engineering guide recommends the opposite approach: <em>"progressive disclosure through autonomous exploration rather than comprehensive pre-loading"</em> and <em>"metadata leverage (file hierarchies, naming conventions, timestamps) for efficient navigation."</em> Translation: give Claude a map instead of making it wander.</p>
          <Comparison
            before={{ label: 'Without guidance', items: ['Claude lists the root folder', 'Reads 6 files looking for context', 'Opens 3 wrong ones, backtracks', 'Finally finds what it needs', 'Context window spent on navigation'] }}
            after={{ label: 'With CLAUDE.md', items: ['Claude reads CLAUDE.md first', 'Knows exactly which 2 files matter', 'Reads them directly', 'Starts working immediately', 'Context window available for actual work'] }}
          />
          <p>Anthropic also recommends that tools should be <em>"token-efficient"</em> and warns that <em>"bloated tool sets create ambiguous decision points."</em> Your workspace works the same way. A folder with a CLAUDE.md at the top is a token-efficient workspace. A sprawling, unlabeled one is something Claude has to brute-force its way through.</p>
          <ChartContainer
            title="Where Tokens Go: Guided vs. Unguided Sessions"
            subtitle="Conceptual breakdown of token allocation in a typical Cowork task"
            source={<>Illustrative model based on Anthropic's recommendations for context engineering. Not measured data. The principle comes from <a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">Anthropic's context window docs</a>.</>}
          >
            <TokenAllocationChart/>
          </ChartContainer>
          <Callout type="savings" label="Why this matters">
            <p>Fewer tokens on navigation means more tokens for actual thinking and output. You're <strong>gating what Claude pays attention to</strong>. And since recall degrades as the window fills (context rot), a leaner window improves both speed and quality.</p>
          </Callout>
          <p className={styles.sourceRef}>Source: <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">"Effective context engineering for AI agents"</a>, Anthropic Engineering</p>
        </section>

        {/* Section 4 */}
        <section id="claude-md">
          <h2>The Solution: CLAUDE.md</h2>
          <p>Claude looks for a file called <code>CLAUDE.md</code> in your workspace. When it finds one, it reads it automatically at the start of every session. No configuration needed. Put the file there, Claude picks it up.</p>
          <p>One detail worth knowing: <strong>CLAUDE.md survives compaction.</strong> From the docs: <em>"CLAUDE.md fully survives compaction. After /compact, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session."</em> Even in a long session where earlier messages get summarized and compressed, CLAUDE.md stays intact. It's re-read from the file on disk, not recalled from a fading summary.</p>
          <p>So it outlasts everything else in the session. Instructions given in conversation will eventually get compacted. Instructions in CLAUDE.md stay crisp.</p>
          <p>A good CLAUDE.md does three things:</p>
          <div className={styles.steps}>
            <Step num={1} title="Tells Claude what this project is">
              <p>A brief orientation. What kind of project is this? What's the current state? Two or three sentences. You're placing the "you are here" marker on the map.</p>
            </Step>
            <Step num={2} title="Points to the files that matter">
              <p>The routing layer. Instead of letting Claude wander, you tell it: "Before you do anything, read these files in this order." This is where you link to supporting .md files. You can use <code>@path/to/file</code> syntax to import them directly.</p>
            </Step>
            <Step num={3} title="Sets the rules">
              <p>Persistent instructions for every session: "follow the style guide for all visual work," "update STATUS.md when you finish a task," "don't reorganize files without asking." Standing orders that never need repeating.</p>
            </Step>
          </div>
          <Callout type="insight" label="The 200-line rule">
            <p>Anthropic recommends keeping each CLAUDE.md file <strong>under 200 lines</strong>. Their documentation: <em>"Longer files consume more context and reduce adherence."</em> If your instructions are growing past that, split them into supporting files or use the <code>.claude/rules/</code> directory. Short, specific, well-structured instructions get followed more consistently than long ones.</p>
          </Callout>
          <p>A simple example:</p>
          <CodeBlock filename="CLAUDE.md">
            <span className={styles.codeComment}># My Project -- Instructions for Claude{'\n\n'}</span>
            <span className={styles.codeComment}>## Before Any Task{'\n\n'}</span>
            <span className={styles.codeString}>Read these docs in order before starting work:{'\n\n'}</span>
            <span className={styles.codePunct}>1. </span><span className={styles.codeKeyword}>@README.md</span><span className={styles.codeString}> -- Project overview and structure{'\n'}</span>
            <span className={styles.codePunct}>2. </span><span className={styles.codeKeyword}>@docs/STATUS.md</span><span className={styles.codeString}> -- What's done, what's in progress{'\n'}</span>
            <span className={styles.codePunct}>3. </span><span className={styles.codeKeyword}>@docs/STYLE.md</span><span className={styles.codeString}> -- Tone, formatting, conventions{'\n\n'}</span>
            <span className={styles.codeComment}>## Rules{'\n\n'}</span>
            <span className={styles.codeString}>- Follow STYLE.md for all writing. Consistency matters.{'\n'}</span>
            <span className={styles.codeString}>- Do not delete or reorganize files without asking.{'\n'}</span>
            <span className={styles.codeString}>- When you finish a task, update STATUS.md.{'\n'}</span>
            <span className={styles.codeString}>- TODO.md is read-only unless I ask you to change it.</span>
          </CodeBlock>
          <p>Simple stuff. But Claude now enters every session knowing what to read, what rules to follow, and where to look. And those instructions survive compaction because they live in a file, not in conversation history.</p>
          <p className={styles.sourceRef}>Source: <a href="https://code.claude.com/docs/en/memory">"How Claude remembers your project"</a>, Anthropic — all quotes in this section from this page</p>
        </section>

        {/* Section 5 */}
        <section id="amplifying">
          <h2>Amplifying with More .md Files</h2>
          <p>CLAUDE.md on its own gives you basic persistent memory. The files it points to are where the leverage is. Each one is another chunk of long-term memory Claude can load when it needs it.</p>
          <p>And Claude doesn't load everything at once. The loading behavior is <strong>cascading and selective</strong>. From Anthropic's documentation:</p>
          <div className={styles.fileTree}>
            <div className={styles.treeTitle}>How Files Load Into Claude's Context</div>
            <div className={styles.treeLegend}>
              <span><span className={styles.legendDot} style={{background:'#4ade80'}}/> Loaded every session</span>
              <span><span className={styles.legendDot} style={{background:'#60a5fa'}}/> Loaded if @imported</span>
              <span><span className={styles.legendDot} style={{background:'#c084fc'}}/> Loaded on demand</span>
            </div>
            <TreeRow indent="" icon="folder" name="your-project/" isFolder/>
            <TreeRow indent="├─ " icon="always" name="CLAUDE.md" badge="always" desc="Entry point, rules, routing"/>
            <TreeRow indent="├─ " icon="imported" name="README.md" badge="imported" desc="Project overview, structure"/>
            <TreeRow indent="├─ " icon="folder" name="docs/" isFolder/>
            <TreeRow indent="│  ├─ " icon="imported" name="STATUS.md" badge="imported" desc="What's done, what's next"/>
            <TreeRow indent="│  ├─ " icon="imported" name="STYLE.md" badge="imported" desc="Tone, formatting, visual rules"/>
            <TreeRow indent="│  ├─ " icon="imported" name="TODO.md" badge="imported" desc="Tasks, known issues"/>
            <TreeRow indent="│  └─ " icon="folder" name="research/" isFolder/>
            <TreeRow indent="│     └─ " icon="ondemand" name="FINDINGS.md" badge="ondemand" desc="Only when Claude enters this folder"/>
            <TreeRow indent="├─ " icon="folder" name="content/" isFolder/>
            <TreeRow indent="│  ├─ " icon="ondemand" name="CLAUDE.md" badge="ondemand" desc="Subdirectory rules, loaded when Claude enters content/"/>
            <TreeRow indent="│  └─ " icon="folder" name="..." isFolder/>
            <TreeRow indent="└─ " icon="folder" name=".claude/rules/" isFolder/>
            <TreeRow indent="   ├─ " icon="ondemand" name="writing.md" badge="path-scoped" desc="Only for matching file patterns"/>
            <TreeRow indent="   └─ " icon="ondemand" name="formatting.md" badge="path-scoped" desc="Only for matching file patterns"/>
          </div>
          <p><em>"CLAUDE.md files in the directory hierarchy above the working directory are loaded in full at launch. CLAUDE.md files in subdirectories load on demand when Claude reads files in those directories."</em> That's the built-in gating. Files deeper in the project only load when Claude actually goes there, keeping the initial context window lean.</p>
          <p>You can also put rules in <code>.claude/rules/</code> with path-specific scoping, so a rule about writing style only loads when Claude works with your content files, not when it's editing configuration. That's context gating at the file-type level.</p>
          <h3>STATUS.md (or PROGRESS.md)</h3>
          <p>Your project's living state. What's finished, what's in progress, what's blocked. Claude reads this and knows where things stand without reconstructing history from scratch. Update it yourself, or tell Claude (in CLAUDE.md) to update it after completing tasks.</p>
          <h3>STYLE.md (or STYLEGUIDE.md)</h3>
          <p>Rules for how things should look and sound. Tone of voice, formatting preferences, words to avoid, visual conventions. Whatever you'd otherwise repeat at the start of every session belongs here.</p>
          <h3>TODO.md</h3>
          <p>Running list of small tasks, known issues, things for later. A useful rule: make this read-only for Claude unless you specifically ask for changes. Otherwise Claude will "helpfully" reorganize your priorities without asking.</p>
          <h3>Research files</h3>
          <p>If your project involves gathering information, dedicated .md files for research mean Claude can reference collected findings without re-searching every session. Structure by topic, date, or source.</p>
          <Callout type="insight" label="The principle">
            <p>Every .md file is a piece of memory you don't have to re-type. And the cascading load behavior means you're not paying the token cost for all of them upfront. Files load when needed, not before. You get the memory without the bloat.</p>
          </Callout>
          <p className={styles.sourceRef}>Source: <a href="https://code.claude.com/docs/en/memory">"How Claude remembers your project"</a>, Anthropic</p>
        </section>

        {/* Section 6 */}
        <section id="token-gating">
          <h2>Token Gating: Why Structure Saves You Time</h2>
          <p>Let's make the token argument concrete.</p>
          <p>Imagine a workspace with 150 files. You ask Claude to "update the introduction to match our new tone." Without guidance files, Claude has to explore: list directories, read candidate files, backtrack from wrong ones, search for anything related to "tone," and eventually cobble together a guess at what you mean.</p>
          <TokenFlow
            rows={[
              { boxes: [{ type:'waste', text:'List root dir'},{type:'waste',text:'List 4 subdirs'},{type:'waste',text:'Read 3 wrong files'},{type:'waste',text:'Search for "tone"'}] },
              { boxes: [{ type:'waste', text:'Read 2 more files'},{type:'file',text:'Find the right file'},{type:'action',text:'Guess at tone'},{type:'result',text:'Write output'}] },
            ]}
            caption="Red = tokens spent navigating and guessing. Claude still doesn't know what 'your tone' actually is."
          />
          <p>With CLAUDE.md pointing to STYLE.md and STATUS.md:</p>
          <TokenFlow
            rows={[
              { boxes: [{type:'file',text:'Read CLAUDE.md'},{type:'file',text:'Read STYLE.md'},{type:'file',text:'Read STATUS.md'},{type:'action',text:'Apply defined tone'},{type:'result',text:'Write output'}] },
            ]}
            caption="No wasted reads. Claude knows where to look and what 'your tone' means because it's written down."
          />
          <p>The second path uses fewer tokens, produces better results (because "tone" is defined, not guessed), and leaves more of the context window available for the actual content Claude is working with. And because of context rot, a leaner window means better recall of the details that matter.</p>
          <p>This compounds. The bigger your workspace, the more tokens a guideless Claude burns on navigation. In a project with hundreds of files, an unguided Claude might lose the thread halfway through and ask you to repeat yourself. A guided one finishes in one pass.</p>
          <ChartContainer
            title="Context Window Usage: Navigation vs. Useful Work"
            subtitle="How CLAUDE.md shifts token allocation across different workspace sizes"
            source={<>Conceptual model. The principle that structured context reduces token waste is from Anthropic's <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">context engineering guide</a> ("the smallest set of high-signal tokens that maximize the likelihood of some desired outcome"). Specific proportions are illustrative.</>}
          >
            <ScalingChart/>
          </ChartContainer>
          <p className={styles.sourceRef}>Source: <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">"Effective context engineering for AI agents"</a>, Anthropic Engineering</p>
        </section>

        {/* Section 7 */}
        <section id="getting-started">
          <h2>Getting Started: Your First CLAUDE.md</h2>
          <p>You don't need the full system on day one. Start with just CLAUDE.md and add supporting files as you feel the need.</p>
          <div className={styles.steps}>
            <Step num={1} title="Create CLAUDE.md in your workspace root">
              <p>Write a few lines describing your project and any rules you catch yourself repeating. Even three lines is better than nothing. Put it in the top-level folder you select in Cowork.</p>
            </Step>
            <Step num={2} title="Notice what you keep re-explaining">
              <p>After a few sessions, patterns emerge. "I keep telling it my writing style." "I keep describing what's already done." Each one is a candidate for its own .md file.</p>
            </Step>
            <Step num={3} title="Extract patterns into dedicated files">
              <p>Move style rules into STYLE.md. Move project state into STATUS.md. Update CLAUDE.md to import them with <code>@docs/STYLE.md</code> syntax. Build the system organically, based on what actually helps.</p>
            </Step>
            <Step num={4} title="Ask Claude to maintain the files">
              <p>Tell Claude (via CLAUDE.md) to update certain files after completing work. <em>"After finishing a task, update STATUS.md with what was done."</em> Now your memory layer stays current without manual effort.</p>
            </Step>
            <Step num={5} title="For big folders: generate a directory map">
              <p>If your workspace has dozens of folders and hundreds of files, ask Claude to create a <code>README.md</code> with a full directory map: every folder, what's in it, and what it's for. Then add a rule in CLAUDE.md: <em>"When looking for files, check README.md first to find the right folder, then look inside that folder only."</em> This turns a blind search across your entire workspace into a two-step lookup: read the map, go to the right place.</p>
            </Step>
          </div>
        </section>

        {/* Section 8 */}
        <section id="building">
          <h2>What You're Really Building</h2>
          <p>You're building external memory for an AI that has none. CLAUDE.md is the routing layer. Always read, always survives compaction. The supporting .md files are the actual memory: preferences, project state, rules, research. Put together, they make a stateless assistant behave like it knows your project.</p>
          <p>The more thought you put into these files, the less time goes to repeating yourself and the fewer tokens get burned on exploration. Context rot hits lighter because the window stays leaner.</p>
          <p>Start with one file and a few rules. See what changes. Build from there.</p>
        </section>

        <div className={styles.nextGuide}>
          <p>
            Ready to add complexity? Check the full{' '}
            <Link to="/dev-protocol-guide" className={styles.nextGuideLink}>Dev Protocol guide</Link>!
          </p>
        </div>

        {/* Sources */}
        <section className={styles.sources} id="sources-section">
          <h2>Sources</h2>
          <ol>
            <li>Anthropic. <a href="https://code.claude.com/docs/en/memory">"How Claude remembers your project."</a> Claude Code Documentation. Accessed March 2026. <span className={`${styles.reliability} ${styles.reliabilityHigh}`}>Primary</span></li>
            <li>Anthropic. <a href="https://platform.claude.com/docs/en/build-with-claude/context-windows">"Context windows."</a> Claude API Documentation. Accessed March 2026. <span className={`${styles.reliability} ${styles.reliabilityHigh}`}>Primary</span></li>
            <li>Anthropic. <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">"Effective context engineering for AI agents."</a> Anthropic Engineering Blog. 2025. <span className={`${styles.reliability} ${styles.reliabilityHigh}`}>Primary</span></li>
            <li>Anthropic. <a href="https://support.claude.com/en/articles/13345190-get-started-with-cowork">"Get started with Cowork."</a> Claude Help Center. Accessed March 2026. <span className={`${styles.reliability} ${styles.reliabilityHigh}`}>Primary</span></li>
            <li>Anthropic. <a href="https://platform.claude.com/cookbook/tool-use-automatic-context-compaction">"Automatic context compaction."</a> Claude API Cookbook. Accessed March 2026. <span className={`${styles.reliability} ${styles.reliabilityHigh}`}>Primary</span></li>
          </ol>
          <p className={styles.sourcesNote}>All five sources are Anthropic's own documentation. Charts labeled "illustrative" or "conceptual" are based on documented principles but use estimated proportions, not measured benchmarks. Where exact quotes are used, they are attributed inline.</p>
        </section>

        <footer className={styles.guideFooter}>
          <p>A guide for Claude Cowork users by Lynch. Written for people who want to spend less time repeating themselves and more time getting things done.</p>
        </footer>

      </div>
    </PageTransition>
  )
}
