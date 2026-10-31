import { useCallback } from 'react'
import { CanvasStage, worldToPixel } from './CanvasStage'

type Props = {
  title: string
  chapter: string
  intuition: string
  controlHint?: string
}

/** 专题占位页：说明 + 网格 Canvas + 禁用滑条 */
export function PlaceholderPage({
  title,
  chapter,
  intuition,
  controlHint = '后续可调参',
}: Props) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, _t: number) => {
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, w, h)
      // grid
      ctx.strokeStyle = 'rgba(148,163,184,0.12)'
      ctx.lineWidth = 1
      for (let i = -2; i <= 2; i++) {
        const { px } = worldToPixel(i * 0.5, 0, w, h)
        ctx.beginPath()
        ctx.moveTo(px, 0)
        ctx.lineTo(px, h)
        ctx.stroke()
        const { py } = worldToPixel(0, i * 0.5, w, h)
        ctx.beginPath()
        ctx.moveTo(0, py)
        ctx.lineTo(w, py)
        ctx.stroke()
      }
      ctx.fillStyle = '#94a3b8'
      ctx.font = '16px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('可视化开发中', w / 2, h / 2)
      ctx.font = '12px system-ui, sans-serif'
      ctx.fillStyle = '#64748b'
      ctx.fillText(chapter, w / 2, h / 2 + 24)
    },
    [chapter],
  )

  return (
    <div className="page">
      <h1>
        {title}
        <span className="placeholder-badge">建设中</span>
      </h1>
      <p className="lead">{intuition}</p>
      <div className="controls">
        <label className="seg">
          参数（{controlHint}）
          <input type="range" min={0} max={100} defaultValue={50} disabled />
        </label>
        <span className="muted">示意，不能当习题数值</span>
      </div>
      <div className="viz-frame">
        <CanvasStage draw={draw} playing={false} />
      </div>
      <p className="hint">这一节的交互图还在建设中。画面和滑条都是示意，不能当习题数值。</p>
    </div>
  )
}
