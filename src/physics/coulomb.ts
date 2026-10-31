/**
 * 点电荷电场叠加（2D 示意）
 * 约定：正电荷电场线向外，负电荷向内；线从正指向负。
 * k、q 取示意数值，非习题 SI 值。
 */

import { hypot2, type Vec2 } from './vec2'

export type PointCharge = {
  x: number
  y: number
  /** 电荷量示意值，>0 正，<0 负 */
  q: number
}

/** 库仑常数示意（教学缩放） */
export const K_DEMO = 1

/** 单点电荷在 (x,y) 的电场 */
export function eFieldPoint(c: PointCharge, x: number, y: number): Vec2 {
  const dx = x - c.x
  const dy = y - c.y
  const r2 = dx * dx + dy * dy
  const soft = 0.0025
  const r = Math.sqrt(r2 + soft)
  const mag = (K_DEMO * c.q) / (r * r)
  return { x: (mag * dx) / r, y: (mag * dy) / r }
}

/** 多点电荷叠加 */
export function eFieldSuperpose(charges: PointCharge[], x: number, y: number): Vec2 {
  let ex = 0
  let ey = 0
  for (const c of charges) {
    const e = eFieldPoint(c, x, y)
    ex += e.x
    ey += e.y
  }
  return { x: ex, y: ey }
}

/**
 * 从种子点沿电场方向积分一条电场线。
 * direction +1 沿 E（从正电荷出发），-1 逆 E。
 * 靠近任一电荷中心则终止，避免穿过电荷。
 */
export function integrateFieldLine(
  charges: PointCharge[],
  seed: Vec2,
  steps: number,
  ds: number,
  direction: 1 | -1,
  bounds = 2.2,
): Vec2[] {
  const pts: Vec2[] = [{ ...seed }]
  let p = { ...seed }
  for (let i = 0; i < steps; i++) {
    const e = eFieldSuperpose(charges, p.x, p.y)
    const speed = hypot2(e) || 1e-12
    p = {
      x: p.x + (direction * ds * e.x) / speed,
      y: p.y + (direction * ds * e.y) / speed,
    }
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) break
    if (Math.abs(p.x) > bounds || Math.abs(p.y) > bounds) break
    let hit = false
    for (const c of charges) {
      const d = Math.hypot(p.x - c.x, p.y - c.y)
      if (d < 0.05) {
        pts.push({ x: c.x, y: c.y })
        hit = true
        break
      }
    }
    if (hit) break
    pts.push({ ...p })
  }
  return pts
}

/** 在正电荷周围均匀布置种子，沿 +E 画线 */
export function seedsAroundPositive(c: PointCharge, n: number, radius = 0.08): Vec2[] {
  if (c.q <= 0) return []
  const seeds: Vec2[] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    seeds.push({ x: c.x + radius * Math.cos(a), y: c.y + radius * Math.sin(a) })
  }
  return seeds
}

export function fieldMagnitudeAt(charges: PointCharge[], x: number, y: number): number {
  return hypot2(eFieldSuperpose(charges, x, y))
}
