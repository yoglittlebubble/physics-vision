/** 二维向量工具（教学示意用，非 SI 精确单位） */

export type Vec2 = { x: number; y: number }

export function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function scale(a: Vec2, s: number): Vec2 {
  return { x: a.x * s, y: a.y * s }
}

export function hypot2(a: Vec2): number {
  return Math.hypot(a.x, a.y)
}

export function normalize(a: Vec2): Vec2 {
  const L = hypot2(a) || 1e-12
  return { x: a.x / L, y: a.y / L }
}
