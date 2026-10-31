import { useCallback, useMemo, useState } from 'react'
import { CanvasStage, drawPolyline, worldToPixel } from '../components/CanvasStage'
import {
  eFieldSuperpose,
  fieldMagnitudeAt,
  integrateFieldLine,
  seedsAroundPositive,
  type PointCharge,
} from '../physics/coulomb'

/**
 * 点电荷库仑叠加 + 电场线示意
 * 电场线从正电荷出发沿 E，终止于负电荷或画布边界；示意不相交。
 */
export function Coulomb() {
  const [q1, setQ1] = useState(1)
  const [q2, setQ2] = useState(-1)
  const [sep, setSep] = useState(0.9)
  const [nLines, setNLines] = useState(12)
  const [probe, setProbe] = useState({ x: 0.2, y: 0.35 })

  const charges: PointCharge[] = useMemo(
    () => [
      { x: -sep / 2, y: 0, q: q1 },
      { x: sep / 2, y: 0, q: q2 },
    ],
    [q1, q2, sep],
  )

  const Eprobe = useMemo(
    () => eFieldSuperpose(charges, probe.x, probe.y),
    [charges, probe],
  )
  const Emag = useMemo(
    () => fieldMagnitudeAt(charges, probe.x, probe.y),
    [charges, probe],
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, w, h)

      // soft grid
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

      // field lines from each positive charge
      for (const c of charges) {
        if (c.q <= 0) continue
        const seeds = seedsAroundPositive(c, nLines, 0.09)
        for (const s of seeds) {
          const pts = integrateFieldLine(charges, s, 220, 0.03, 1, 2.4)
          drawPolyline(ctx, pts, w, h, 'rgba(167,139,250,0.85)', 1.4)
          // arrow mid
          if (pts.length > 20) {
            const a = pts[Math.floor(pts.length * 0.35)]
            const b = pts[Math.floor(pts.length * 0.35) + 3] ?? a
            drawArrowHead(ctx, w, h, a.x, a.y, b.x - a.x, b.y - a.y, '#c4b5fd')
          }
        }
      }
      // if both negative / no positive: seed from negatives going reverse (still +E direction end at neg)
      const hasPos = charges.some((c) => c.q > 0)
      if (!hasPos) {
        for (const c of charges) {
          if (c.q >= 0) continue
          const seeds = seedsAroundPositive({ ...c, q: 1 }, nLines, 0.09)
          for (const s of seeds) {
            const pts = integrateFieldLine(charges, s, 180, 0.03, -1, 2.4)
            drawPolyline(ctx, pts, w, h, 'rgba(56,189,248,0.7)', 1.3)
          }
        }
      }

      // charges
      for (const c of charges) {
        const { px, py } = worldToPixel(c.x, c.y, w, h)
        const r = 10 + Math.min(8, Math.abs(c.q) * 4)
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = c.q >= 0 ? '#f472b6' : '#38bdf8'
        ctx.fill()
        ctx.fillStyle = '#0b1220'
        ctx.font = 'bold 14px system-ui'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(c.q >= 0 ? '+' : '−', px, py + 1)
        ctx.fillStyle = '#e2e8f0'
        ctx.font = '11px system-ui'
        ctx.textBaseline = 'top'
        ctx.fillText(`q=${c.q.toFixed(1)}`, px, py + r + 4)
      }

      // probe
      {
        const { px, py } = worldToPixel(probe.x, probe.y, w, h)
        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = '#fbbf24'
        ctx.fill()
        const e = Eprobe
        const L = Math.hypot(e.x, e.y) || 1
        const scale = 28 / Math.max(0.4, Math.min(L, 8))
        drawArrowHead(
          ctx,
          w,
          h,
          probe.x,
          probe.y,
          e.x * scale * 0.04,
          e.y * scale * 0.04,
          '#fbbf24',
          true,
        )
        ctx.fillStyle = '#fbbf24'
        ctx.font = '11px system-ui'
        ctx.textAlign = 'left'
        ctx.fillText('探针 E', px + 8, py - 8)
      }

      // legend
      ctx.fillStyle = '#94a3b8'
      ctx.font = '12px system-ui'
      ctx.textAlign = 'left'
      ctx.fillText('电场线：正 → 负（示意不相交）· 点击画布移动探针', 12, 18)
    },
    [charges, nLines, probe, Eprobe],
  )

  return (
    <div className="page">
      <h1>库仑叠加 · 电场线</h1>
      <p className="lead">
        两个点电荷的电场矢量叠加。电场线从<strong>正电荷</strong>出发，沿局部
        E 方向延伸，终止于<strong>负电荷</strong>或离开视野。线密度示意场强强弱，
        系数已缩放。示意，不能当习题数值。
      </p>
      <div className="readout">
        <div className="readout-card">
          <div className="label">探针位置 (x, y)</div>
          <div className="value">
            {probe.x.toFixed(2)}, {probe.y.toFixed(2)}
          </div>
        </div>
        <div className="readout-card">
          <div className="label">|E|（示意）</div>
          <div className="value">{Emag.toFixed(2)}</div>
        </div>
        <div className="readout-card">
          <div className="label">Eₓ , Eᵧ（示意）</div>
          <div className="value">
            {Eprobe.x.toFixed(2)}, {Eprobe.y.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="controls">
        <label className="seg">
          q₁（左）
          <input
            type="range"
            min={-2}
            max={2}
            step={0.1}
            value={q1}
            onChange={(e) => setQ1(Number(e.target.value))}
          />
          <span>{q1.toFixed(1)}</span>
        </label>
        <label className="seg">
          q₂（右）
          <input
            type="range"
            min={-2}
            max={2}
            step={0.1}
            value={q2}
            onChange={(e) => setQ2(Number(e.target.value))}
          />
          <span>{q2.toFixed(1)}</span>
        </label>
        <label className="seg">
          间距
          <input
            type="range"
            min={0.4}
            max={1.6}
            step={0.05}
            value={sep}
            onChange={(e) => setSep(Number(e.target.value))}
          />
          <span>{sep.toFixed(2)}</span>
        </label>
        <label className="seg">
          电场线条数
          <input
            type="range"
            min={6}
            max={20}
            step={1}
            value={nLines}
            onChange={(e) => setNLines(Number(e.target.value))}
          />
          <span>{nLines}</span>
        </label>
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
        旁注：同性相斥、异性相吸体现在电场线从正散开、汇入负。叠加后线仍「不相交」——
        每点 E 方向唯一（电荷所在奇点除外）。
      </p>
    </div>
  )
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  x: number,
  y: number,
  dx: number,
  dy: number,
  color: string,
  shaft = false,
) {
  const { px, py } = worldToPixel(x, y, w, h)
  const { px: qx, py: qy } = worldToPixel(x + dx, y + dy, w, h)
  const ang = Math.atan2(qy - py, qx - px)
  if (shaft) {
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(qx, qy)
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  }
  const ah = 7
  ctx.beginPath()
  ctx.moveTo(qx, qy)
  ctx.lineTo(qx - ah * Math.cos(ang - 0.4), qy - ah * Math.sin(ang - 0.4))
  ctx.lineTo(qx - ah * Math.cos(ang + 0.4), qy - ah * Math.sin(ang + 0.4))
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}
