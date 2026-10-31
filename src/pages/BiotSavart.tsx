import { useCallback, useMemo, useState } from 'react'
import { CanvasStage, worldToPixel } from '../components/CanvasStage'
import {
  bCenterLoop,
  bFieldInfiniteWire,
  bFieldLoopTopViewDemo,
  bMagnitudeWire,
  wireProbeReadout,
} from '../physics/biotSavart'

type Mode = 'wire' | 'loop'

/**
 * 毕奥–萨伐尔示意：
 * - 无限长直导线：I 出屏 ⊙，B 逆时针（右手定则）
 * - 圆电流：俯视逆时针电流，中心 B 出屏
 */
export function BiotSavart() {
  const [mode, setMode] = useState<Mode>('wire')
  const [I, setI] = useState(1)
  const [R, setR] = useState(0.7)
  const [probe, setProbe] = useState({ x: 0.55, y: 0 })

  const readout = useMemo(() => {
    if (mode === 'wire') {
      const r = wireProbeReadout(I, probe)
      return {
        title: '直导线探针',
        lines: [
          { label: 'r（示意）', value: r.r.toFixed(3) },
          { label: '|B| ∝ I/r', value: r.B.toFixed(3) },
          { label: 'Bₓ , Bᵧ', value: `${r.Bx.toFixed(2)}, ${r.By.toFixed(2)}` },
        ],
      }
    }
    const Bc = bCenterLoop(I, R)
    const r = Math.hypot(probe.x, probe.y)
    return {
      title: '圆电流（示意）',
      lines: [
        { label: '环半径 R', value: R.toFixed(2) },
        { label: '|B|中心 ∝ I/R', value: Bc.toFixed(3) },
        { label: '探针到心距', value: r.toFixed(3) },
      ],
    }
  }, [mode, I, R, probe])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(148,163,184,0.1)'
      ctx.lineWidth = 1
      for (let i = -3; i <= 3; i++) {
        const { px } = worldToPixel(i * 0.5, 0, w, h)
        ctx.beginPath()
        ctx.moveTo(px, 0)
        ctx.lineTo(px, h)
        ctx.stroke()
        const { py } = worldToPixel(0, i * 0.4, w, h)
        ctx.beginPath()
        ctx.moveTo(0, py)
        ctx.lineTo(w, py)
        ctx.stroke()
      }

      if (mode === 'wire') {
        drawWire(ctx, w, h, I, probe)
      } else {
        drawLoop(ctx, w, h, I, R, probe)
      }

      ctx.fillStyle = '#94a3b8'
      ctx.font = '12px system-ui'
      ctx.textAlign = 'left'
      const tip =
        mode === 'wire'
          ? '直导线：电流 ⊙ 出屏 → B 逆时针环绕（右手拇指出屏）· 点击移动探针'
          : '圆电流：环上逆时针 → 中心 B 出屏 ⊙ · 点击移动探针'
      ctx.fillText(tip, 12, 18)
    },
    [mode, I, R, probe],
  )

  return (
    <div className="page">
      <h1>毕奥–萨伐尔 · 直导线 / 圆电流</h1>
      <p className="lead">
        无限长直导线：|B| = μ₀I/(2πr)（示意缩放）。电流沿<strong>+z 出屏
        ⊙</strong>时，B 在平面内<strong>逆时针</strong>环绕——右手定则。
        圆电流俯视图：环上逆时针电流，中心磁场出屏。示意，不能当习题数值。
      </p>
      <div className="readout">
        {readout.lines.map((l) => (
          <div className="readout-card" key={l.label}>
            <div className="label">
              {readout.title} · {l.label}
            </div>
            <div className="value">{l.value}</div>
          </div>
        ))}
      </div>
      <div className="controls">
        <label className="seg">
          模式
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="wire">无限长直导线</option>
            <option value="loop">圆电流（俯视）</option>
          </select>
        </label>
        <label className="seg">
          电流 I（示意）
          <input
            type="range"
            min={0.2}
            max={2.5}
            step={0.1}
            value={I}
            onChange={(e) => setI(Number(e.target.value))}
          />
          <span>{I.toFixed(1)}</span>
        </label>
        {mode === 'loop' ? (
          <label className="seg">
            环半径 R
            <input
              type="range"
              min={0.35}
              max={1.2}
              step={0.05}
              value={R}
              onChange={(e) => setR(Number(e.target.value))}
            />
            <span>{R.toFixed(2)}</span>
          </label>
        ) : null}
        <span className="muted">示意，不能当习题数值</span>
      </div>
      <div className="viz-frame tall">
        <CanvasStage
          draw={draw}
          playing={false}
          onClickWorld={(x, y) => setProbe({ x, y })}
        />
      </div>
      <p className="hint">
        旁注：若把电流反向（I 仍取正、可视作翻转出/入屏约定），环绕方向随之反向。
        直导线 |B| 随 r 增大而减小——读数卡可对照。
      </p>
    </div>
  )
}

function drawWire(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  I: number,
  probe: { x: number; y: number },
) {
  const o = worldToPixel(0, 0, w, h)
  // wire cross-section: ⊙
  ctx.beginPath()
  ctx.arc(o.px, o.py, 14, 0, Math.PI * 2)
  ctx.fillStyle = '#a78bfa'
  ctx.fill()
  ctx.fillStyle = '#0b1220'
  ctx.font = 'bold 14px system-ui'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('⊙', o.px, o.py + 1)
  ctx.fillStyle = '#e2e8f0'
  ctx.font = '11px system-ui'
  ctx.textBaseline = 'top'
  ctx.fillText(`I=${I.toFixed(1)} 出屏`, o.px, o.py + 18)

  // concentric B circles + arrows (counterclockwise)
  const radii = [0.35, 0.55, 0.8, 1.1]
  for (const r of radii) {
    const mag = bMagnitudeWire(I, r)
    ctx.beginPath()
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      const { px, py } = worldToPixel(r * Math.cos(a), r * Math.sin(a), w, h)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.strokeStyle = `rgba(56,189,248,${0.25 + Math.min(0.55, mag * 0.15)})`
    ctx.lineWidth = 1.5
    ctx.stroke()
    // CCW arrows at 4 positions
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + 0.2
      const x = r * Math.cos(a)
      const y = r * Math.sin(a)
      const B = bFieldInfiniteWire(I, x, y)
      arrowAt(ctx, w, h, x, y, B.x, B.y, '#38bdf8')
    }
  }

  // probe
  const p = worldToPixel(probe.x, probe.y, w, h)
  ctx.beginPath()
  ctx.arc(p.px, p.py, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#fbbf24'
  ctx.fill()
  const B = bFieldInfiniteWire(I, probe.x, probe.y)
  arrowAt(ctx, w, h, probe.x, probe.y, B.x, B.y, '#fbbf24', true)
}

function drawLoop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  I: number,
  R: number,
  probe: { x: number; y: number },
) {
  // loop circle
  ctx.beginPath()
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const { px, py } = worldToPixel(R * Math.cos(a), R * Math.sin(a), w, h)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.strokeStyle = '#a78bfa'
  ctx.lineWidth = 3
  ctx.stroke()

  // current direction arrows on loop (CCW)
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2
    const x = R * Math.cos(a)
    const y = R * Math.sin(a)
    // tangent CCW = (-sin, cos)
    arrowAt(ctx, w, h, x, y, -Math.sin(a) * I, Math.cos(a) * I, '#c4b5fd')
  }

  // center B out of page
  const o = worldToPixel(0, 0, w, h)
  ctx.beginPath()
  ctx.arc(o.px, o.py, 16, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(56,189,248,0.25)'
  ctx.fill()
  ctx.strokeStyle = '#38bdf8'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#38bdf8'
  ctx.font = 'bold 16px system-ui'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('⊙ B', o.px, o.py)
  ctx.fillStyle = '#94a3b8'
  ctx.font = '11px system-ui'
  ctx.textBaseline = 'top'
  ctx.fillText(`|B|中心示意 ${bCenterLoop(I, R).toFixed(2)}`, o.px, o.py + 20)

  // sparse demo field arrows
  for (let ix = -2; ix <= 2; ix++) {
    for (let iy = -2; iy <= 2; iy++) {
      if (ix === 0 && iy === 0) continue
      const x = ix * 0.45
      const y = iy * 0.45
      const B = bFieldLoopTopViewDemo(I, R, x, y)
      if (Math.hypot(B.x, B.y) < 0.02) continue
      arrowAt(ctx, w, h, x, y, B.x, B.y, 'rgba(56,189,248,0.55)')
    }
  }

  const p = worldToPixel(probe.x, probe.y, w, h)
  ctx.beginPath()
  ctx.arc(p.px, p.py, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#fbbf24'
  ctx.fill()
}

function arrowAt(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
  long = false,
) {
  const L = Math.hypot(vx, vy) || 1e-9
  const len = long ? 0.22 : 0.12
  const ux = (vx / L) * len
  const uy = (vy / L) * len
  const a = worldToPixel(x, y, w, h)
  const b = worldToPixel(x + ux, y + uy, w, h)
  const ang = Math.atan2(b.py - a.py, b.px - a.px)
  ctx.beginPath()
  ctx.moveTo(a.px, a.py)
  ctx.lineTo(b.px, b.py)
  ctx.strokeStyle = color
  ctx.lineWidth = long ? 2.2 : 1.5
  ctx.stroke()
  const ah = long ? 8 : 6
  ctx.beginPath()
  ctx.moveTo(b.px, b.py)
  ctx.lineTo(b.px - ah * Math.cos(ang - 0.4), b.py - ah * Math.sin(ang - 0.4))
  ctx.lineTo(b.px - ah * Math.cos(ang + 0.4), b.py - ah * Math.sin(ang + 0.4))
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}
