# 大学物理可视化学习站

大学物理可视化。按教材目录把力学和电磁学放在同一个站点里，用 **纯 Canvas 2D** 做交互示意（Vite + React + TypeScript）。**不使用 Three.js**，没有后端，也不用登录。

图和读数都是示意，不能当习题数值。电场线从正电荷画到负电荷；直导线电流出屏时，磁感线按右手定则逆时针环绕。

## 本地预览

```bash
npm install
npm run dev
```

浏览器打开终端里提示的地址，路径带仓库名，例如 `http://localhost:5173/physics-vision/`。

构建：

```bash
npm ci
npm run build
npm run preview
```

## 目录从哪里来

首页、左侧栏、章节页都读 `src/catalog.ts`。以后加一页，只要在里面补一条知识点，并在 `src/pages/TopicPage.tsx` 挂上组件。

层级是 **篇 → 章 → 节**：

| 路径 | 页面 |
|------|------|
| `/` | 首页，两篇纵向排开 |
| `/p1/ch1` … `/p1/ch5` | 力学第 1–5 章 |
| `/p2/ch6` … `/p2/ch8` | 电磁学第 6–8 章 |
| `/p1/ch1/<节>`、`/p2/ch6/<节>` … | 知识点。已做好的可交互，其余为建设中 |

## 路由表

### 第 1 篇 力学（目前都是建设中）

| 路由 | 节 |
|------|----|
| `/p1/ch1` | 第 1 章 质点运动学 |
| `/p1/ch1/measure` | §1.1 运动 时空 测量 |
| `/p1/ch1/describe` | §1.2 质点运动的描述 |
| `/p1/ch1/change` | §1.3 质点运动变化的描述 |
| `/p1/ch1/relative` | §1.4 相对运动 |
| `/p1/ch2` | 第 2 章 质点动力学 |
| `/p1/ch2/momentum` | §2.1 动量 动量守恒定律 |
| `/p1/ch2/angular` | §2.2 角动量 角动量守恒定律 |
| `/p1/ch2/energy` | §2.3 能量 能量守恒定律 |
| `/p1/ch3` | 第 3 章 刚体力学基础 |
| `/p1/ch3/forms` | §3.1 刚体运动的基本形式 |
| `/p1/ch3/inertia` | §3.2 定轴转动刚体的角动量 转动惯量 |
| `/p1/ch3/fixed-axis` | §3.3 刚体定轴转动定律 |
| `/p1/ch3/angular-conservation` | §3.4 刚体的角动量定理和角动量守恒定律 |
| `/p1/ch3/rotation-energy` | §3.5 刚体定轴转动的动能定理和机械能守恒定律 |
| `/p1/ch3/plane-motion` | *§3.6 刚体的平面平行运动 |
| `/p1/ch4` | 第 4 章 流体力学简介 |
| `/p1/ch4/flow` | §4.1 流体运动的描述 |
| `/p1/ch4/bernoulli` | §4.2 连续性方程和伯努利方程 |
| `/p1/ch4/viscosity` | *§4.3 黏性流体的运动 |
| `/p1/ch5` | 第 5 章 狭义相对论 |
| `/p1/ch5/postulates` | §5.1 狭义相对论基本原理 |
| `/p1/ch5/spacetime` | §5.2 狭义相对论时空观 |
| `/p1/ch5/dynamics` | §5.3 相对论动力学基础 |

### 第 2 篇 电磁学

| 路由 | 节 | 状态 |
|------|----|------|
| `/p2/ch6` | 第 6 章 电荷与电场 | 章节页 |
| `/p2/ch6/coulomb` | §6.1 库仑定律与电场强度 | 可交互 |
| `/p2/ch6/gauss` | §6.2 高斯定理 | 建设中 |
| `/p2/ch6/potential` | §6.3 静电场的环路定理与电势 | 建设中 |
| `/p2/ch6/conductor` | §6.4 静电场中导体 | 建设中 |
| `/p2/ch6/dielectric` | §6.5 静电场中的电介质 | 建设中 |
| `/p2/ch6/field-energy` | §6.6 电场的能量 | 建设中 |
| `/p2/ch7` | 第 7 章 电流与磁场 | 章节页 |
| `/p2/ch7/steady-current` | §7.1 恒定电流和恒定电场 电动势 | 建设中 |
| `/p2/ch7/magnetic-field` | §7.2 恒定磁场和磁感应强度 | 建设中 |
| `/p2/ch7/biot-savart` | §7.3 毕奥-萨伐尔定律 | 可交互 |
| `/p2/ch7/magnetic-gauss` | §7.4 磁场中的高斯定理 | 建设中 |
| `/p2/ch7/ampere` | §7.5 真空中恒定磁场的安培环路定理 | 建设中 |
| `/p2/ch7/lorentz` | §7.6 磁场对运动电荷和载流导线的作用 | 建设中 |
| `/p2/ch7/magnetic-work` | §7.7 磁力的功 | 建设中 |
| `/p2/ch7/magnetic-media` | §7.8 磁介质中的恒定磁场 | 建设中 |
| `/p2/ch8` | 第 8 章 电磁场与麦克斯韦电磁场方程组 | 章节页 |
| `/p2/ch8/faraday` | §8.1 电磁感应的基本定律 | 建设中 |
| `/p2/ch8/induction` | §8.2 动生电动势 | 建设中 |
| `/p2/ch8/induced` | §8.3 感生电动势 感生电场 | 建设中（与 §8.2 同一示意页） |
| `/p2/ch8/inductance` | §8.4 自感和互感 | 建设中 |
| `/p2/ch8/magnetic-energy` | §8.5 磁场的能量 | 建设中 |
| `/p2/ch8/transient` | §8.6 RL 和 RC 电路中的暂态过程 | 建设中 |
| `/p2/ch8/displacement-current` | §8.7 位移电流和全电流定律 | 建设中 |
| `/p2/ch8/maxwell` | §8.8 麦克斯韦电磁场方程组 | 建设中 |

### 旧地址会跳到新地址

| 旧路由 | 新路由 |
|--------|--------|
| `/ch6/coulomb` | `/p2/ch6/coulomb` |
| `/ch6/gauss` | `/p2/ch6/gauss` |
| `/ch6/potential` | `/p2/ch6/potential` |
| `/ch7/biot-savart` | `/p2/ch7/biot-savart` |
| `/ch7/ampere` | `/p2/ch7/ampere` |
| `/ch8/induction` | `/p2/ch8/induction` |
| `/ch8/maxwell` | `/p2/ch8/maxwell` |

## GitHub Pages

线上地址预期为：<https://yoglittlebubble.github.io/physics-vision/>

推送到 `main` 后，`.github/workflows/pages.yml` 会执行 `npm ci`、`npm run build`，再用官方的 `actions/upload-pages-artifact` 和 `actions/deploy-pages` 部署。

如果 Pages 还没打开：仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。选好之后，下一次推到 `main`（或手动跑这个 workflow）才会把站点发上去。

Vite 的 `base` 是 `/physics-vision/`，路由使用 `BrowserRouter`，`basename` 取 `import.meta.env.BASE_URL`。刷新子路径时，GitHub Pages 会返回 `public/404.html`，它再把地址交回首页，由前端路由接上，避免 404。

## 代码放哪里

```
src/
  catalog.ts        篇 / 章 / 知识点 / 路由 / 状态
  components/       布局、Canvas 舞台、占位页
  pages/            首页、章节页、各专题
  physics/          库仑、毕奥-萨伐尔、二维矢量（不放 UI）
public/404.html     GitHub Pages 的单页回退
```
