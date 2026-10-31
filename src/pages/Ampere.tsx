import { PlaceholderPage } from '../components/PlaceholderPage'

export function Ampere() {
  return (
    <PlaceholderPage
      chapter="第7章"
      title="安培环路"
      intuition="安培定律：∮B·dl = μ₀ I_enc。对无限长直导线取同心圆环路，B 切向且大小恒定，可得 B = μ₀ I/(2πr)。本页后续将动画环路积分与穿链电流。"
      controlHint="后续可调电流与环路半径"
    />
  )
}
