/**
 * 毕奥–萨伐尔示意：无限长直导线、圆电流（2D 截面）
 *
 * 直导线：电流沿 +z（出屏 ⊙），B 在 xy 平面成右手环绕（逆时针）。
 * |B| = μ0 I / (2π r) 示意缩放。
 *
 * 圆电流：环在 xy 平面，中心轴为 z；本页主要画「过轴线的截面」上 B 的方向示意，
 * 以及中心附近环绕感。教学优先右手定则正确。
 */

import { hypot2, type Vec2 } from './vec2'

/** μ0/(2π) 示意常数 */
export const MU0_OVER_2PI = 1

/**
 * 无限长直导线，电流 I>0 沿 +z（出屏），导线在原点。
 * B = (μ0 I)/(2π r) * φ̂，φ̂ = (-y/r, x/r) → 逆时针（右手：拇指出屏，四指逆时针）。
 */
export function bFieldInfiniteWire(I: number, x: number, y: number): Vec2 {
  const r2 = x * x + y * y
  const soft = 0.0025
  const r = Math.sqrt(r2 + soft)
  const mag = (MU0_OVER_2PI * I) / r
  // φ̂ = (-y, x)/r
  return { x: (mag * -y) / r, y: (mag * x) / r }
}

export function bMagnitudeWire(I: number, r: number): number {
  const rr = Math.max(Math.abs(r), 1e-6)
  return (MU0_OVER_2PI * Math.abs(I)) / rr
}

/**
 * 圆电流：环半径 R，电流 I>0 逆时针（从 +z 看）。
 * 在环平面内（z=0）轴外点，B 主要有 z 分量；本 2D 画布用「环平面俯视」画电流环，
 * 并用中心箭头标 B 出屏；在环外用稀疏环绕箭头示意。
 *
 * 简化：把「俯视图」上的切向示意场设为与直导线类似的环绕，但幅度按中心 B∝I/R 缩放，
 * 仅作直觉，不作精确积分。
 */
export function bCenterLoop(I: number, R: number): number {
  // |B_center| = μ0 I / (2 R) 示意 → 用 MU0_OVER_2PI * π * I / R
  const rr = Math.max(R, 0.05)
  return (MU0_OVER_2PI * Math.PI * Math.abs(I)) / rr
}

/** 环平面俯视：示意切向「环绕感」向量场（非精确毕奥积分） */
export function bFieldLoopTopViewDemo(I: number, R: number, x: number, y: number): Vec2 {
  const r = Math.hypot(x, y) || 1e-9
  // 环上电流逆时针 → 内部 B 出屏；切向示意用与直导线同向的 φ̂，强度在环附近峰化
  const near = Math.exp(-Math.pow((r - R) / (0.25 * R + 0.05), 2))
  const mag = 0.15 * I * (0.2 + near)
  return { x: (mag * -y) / r, y: (mag * x) / r }
}

export function wireProbeReadout(I: number, probe: Vec2): { r: number; B: number; Bx: number; By: number } {
  const r = hypot2(probe)
  const Bv = bFieldInfiniteWire(I, probe.x, probe.y)
  return { r, B: hypot2(Bv), Bx: Bv.x, By: Bv.y }
}
