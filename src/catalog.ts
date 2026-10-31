/**
 * 全站目录：首页、侧栏、章节页都从这里生成。
 * 篇 / 章 / 节标题以教材目录照片为准。
 *
 * §6.2 的节名行以及 6.2.1–6.2.3 在照片上沿被裁掉，这里不编造小节号；
 * 节名按照片里的「高斯定理的应用」「静电场高斯定理的微分形式」和已知梗概，记为「高斯定理」。
 * 带 * 的是教材标成选读的节。
 */

export const SITE_TITLE = '大学物理可视化学习站'

export type TopicStatus = 'ready' | 'wip'

export type PageKey =
  | 'coulomb'
  | 'gauss'
  | 'potential'
  | 'biot-savart'
  | 'ampere'
  | 'induction'
  | 'maxwell'

export type Topic = {
  slug: string
  /** 如 §6.1、*§3.6；无节号的条目留空 */
  code: string
  title: string
  summary: string
  status: TopicStatus
  /** 已有页面；不填则用通用占位页 */
  page?: PageKey
  /** 旧路由，不含开头的 / */
  legacy?: string
}

export type Chapter = {
  id: string
  code: string
  title: string
  blurb: string
  topics: Topic[]
}

export type Part = {
  id: string
  code: string
  title: string
  blurb: string
  chapters: Chapter[]
}

export const CATALOG: Part[] = [
  {
    id: 'p1',
    code: '第1篇',
    title: '力学',
    blurb: '质点怎样运动，动量、角动量和能量怎么守恒，再到刚体、流体和狭义相对论。',
    chapters: [
      {
        id: 'ch1',
        code: '第1章',
        title: '质点运动学',
        blurb: '先把运动说清楚：位置、速度、加速度，以及换一个参考系之后怎么看。',
        topics: [
          {
            slug: 'measure',
            code: '§1.1',
            title: '运动 时空 测量',
            summary: '物质与运动、测量标准、单位制和参考系。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'describe',
            code: '§1.2',
            title: '质点运动的描述',
            summary: '质点、位置矢量、位移和速度。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'change',
            code: '§1.3',
            title: '质点运动变化的描述',
            summary: '加速度、自然坐标，以及圆周运动的角量。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'relative',
            code: '§1.4',
            title: '相对运动',
            summary: '同一运动在不同参考系里的速度、加速度关系。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch2',
        code: '第2章',
        title: '质点动力学',
        blurb: '力怎样改变动量，力矩怎样改变角动量，功和能又如何彼此转化。',
        topics: [
          {
            slug: 'momentum',
            code: '§2.1',
            title: '动量 动量守恒定律',
            summary: '动量、力、动量定理，以及质心运动。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'angular',
            code: '§2.2',
            title: '角动量 角动量守恒定律',
            summary: '质点的角动量、力矩和角动量守恒。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'energy',
            code: '§2.3',
            title: '能量 能量守恒定律',
            summary: '动能定理、势能和机械能守恒。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch3',
        code: '第3章',
        title: '刚体力学基础',
        blurb: '物体不能再当成一个点的时候：平动、定轴转动和转动惯量。',
        topics: [
          {
            slug: 'forms',
            code: '§3.1',
            title: '刚体运动的基本形式',
            summary: '平动和转动，以及描述转动用的角量。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'inertia',
            code: '§3.2',
            title: '定轴转动刚体的角动量 转动惯量',
            summary: '刚体对定轴的角动量，以及转动惯量怎么算。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'fixed-axis',
            code: '§3.3',
            title: '刚体定轴转动定律',
            summary: '力矩等于角动量的变化率，定轴时写成 M = Iα。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'angular-conservation',
            code: '§3.4',
            title: '刚体的角动量定理和角动量守恒定律',
            summary: '合外力矩为零时角动量守恒；选读里还有进动。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'rotation-energy',
            code: '§3.5',
            title: '刚体定轴转动的动能定理和机械能守恒定律',
            summary: '转动动能、力矩的功，以及机械能是否守恒。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'plane-motion',
            code: '*§3.6',
            title: '刚体的平面平行运动',
            summary: '选读：平面运动怎么描述，以及纯滚动。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch4',
        code: '第4章',
        title: '流体力学简介',
        blurb: '把流动看成速度场：流线、连续性方程和伯努利方程。',
        topics: [
          {
            slug: 'flow',
            code: '§4.1',
            title: '流体运动的描述',
            summary: '速度场、定常流动、流线和流管。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'bernoulli',
            code: '§4.2',
            title: '连续性方程和伯努利方程',
            summary: '理想流体里流量守恒，以及压强和流速的关系。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'viscosity',
            code: '*§4.3',
            title: '黏性流体的运动',
            summary: '选读：黏性、湍流，以及斯托克斯定律、泊肃叶定律。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch5',
        code: '第5章',
        title: '狭义相对论',
        blurb: '光速不变之后，同时、时间和长度都随参考系改变。',
        topics: [
          {
            slug: 'postulates',
            code: '§5.1',
            title: '狭义相对论基本原理',
            summary: '从伽利略相对性原理到狭义相对论的两条基本原理。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'spacetime',
            code: '§5.2',
            title: '狭义相对论时空观',
            summary:
              '同时的相对性、时间与长度的相对性、时空间隔；目录中另有闵可夫斯基四维世界。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'dynamics',
            code: '§5.3',
            title: '相对论动力学基础',
            summary: '质速关系、相对论动能，以及静能和质能关系。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
    ],
  },
  {
    id: 'p2',
    code: '第2篇',
    title: '电磁学',
    blurb: '电荷的电场、电流的磁场，以及变化的电磁场怎样连成麦克斯韦方程组。',
    chapters: [
      {
        id: 'ch6',
        code: '第6章',
        title: '电荷与电场',
        blurb: '从库仑定律出发，看电场线、高斯定理、电势、导体和电介质。',
        topics: [
          {
            slug: 'coulomb',
            code: '§6.1',
            title: '库仑定律与电场强度',
            summary: '拖动两个点电荷，看电场叠加。电场线从正电荷指向负电荷。',
            status: 'ready',
            page: 'coulomb',
            legacy: 'ch6/coulomb',
          },
          {
            slug: 'gauss',
            code: '§6.2',
            title: '高斯定理',
            summary: '对称的电荷分布可以用高斯面把电场算出来。交互图还在建设中。',
            status: 'wip',
            page: 'gauss',
            legacy: 'ch6/gauss',
          },
          {
            slug: 'potential',
            code: '§6.3',
            title: '静电场的环路定理与电势',
            summary: '静电场做功与路径无关，等势面和电场线垂直。交互图还在建设中。',
            status: 'wip',
            page: 'potential',
            legacy: 'ch6/potential',
          },
          {
            slug: 'conductor',
            code: '§6.4',
            title: '静电场中导体',
            summary: '静电平衡、空腔导体和电容。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'dielectric',
            code: '§6.5',
            title: '静电场中的电介质',
            summary: '电介质极化，以及有介质时的高斯定理。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'field-energy',
            code: '§6.6',
            title: '电场的能量',
            summary: '电荷系统和电容器储存的电能，也可以看成电场的能量。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch7',
        code: '第7章',
        title: '电流与磁场',
        blurb: '恒定电流、毕奥-萨伐尔定律、安培环路，以及磁场对电荷和电流的力。',
        topics: [
          {
            slug: 'steady-current',
            code: '§7.1',
            title: '恒定电流和恒定电场 电动势',
            summary: '电流形成的条件、电流密度和电源电动势。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'magnetic-field',
            code: '§7.2',
            title: '恒定磁场和磁感应强度',
            summary: '磁性来自电荷的运动，用磁感应强度 B 描述磁场。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'biot-savart',
            code: '§7.3',
            title: '毕奥-萨伐尔定律',
            summary: '直导线和圆电流的磁场。电流出屏时，直导线周围的 B 沿逆时针，符合右手定则。',
            status: 'ready',
            page: 'biot-savart',
            legacy: 'ch7/biot-savart',
          },
          {
            slug: 'magnetic-gauss',
            code: '§7.4',
            title: '磁场中的高斯定理',
            summary: '磁感线闭合，穿出任意闭合面的磁通量为零。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'ampere',
            code: '§7.5',
            title: '真空中恒定磁场的安培环路定理',
            summary: '对称分布时，用安培环路把 B 算出来。交互图还在建设中。',
            status: 'wip',
            page: 'ampere',
            legacy: 'ch7/ampere',
          },
          {
            slug: 'lorentz',
            code: '§7.6',
            title: '磁场对运动电荷和载流导线的作用',
            summary: '洛伦兹力、带电粒子在磁场里的轨迹，以及安培力。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'magnetic-work',
            code: '§7.7',
            title: '磁力的功',
            summary: '磁力对载流导线做的功，以及磁力矩对线圈做的功。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'magnetic-media',
            code: '§7.8',
            title: '磁介质中的恒定磁场',
            summary: '磁介质的磁化、介质中的高斯定理和安培环路，以及铁磁质。这一节的图还在建设中。',
            status: 'wip',
          },
        ],
      },
      {
        id: 'ch8',
        code: '第8章',
        title: '电磁场与麦克斯韦电磁场方程组',
        blurb: '磁通量变化产生电动势，位移电流补上全电流，四条方程收束全篇。',
        topics: [
          {
            slug: 'faraday',
            code: '§8.1',
            title: '电磁感应的基本定律',
            summary: '法拉第电磁感应定律：磁通量变化就有感应电动势。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'induction',
            code: '§8.2',
            title: '动生电动势',
            summary: '导体切割磁感线产生的动生电动势，并和感生电动势放在一起对照。交互图还在建设中。',
            status: 'wip',
            page: 'induction',
            legacy: 'ch8/induction',
          },
          {
            slug: 'induced',
            code: '§8.3',
            title: '感生电动势 感生电场',
            summary: '磁场随时间变化时出现感生电场。目前与动生电动势共用一张示意页。',
            status: 'wip',
            page: 'induction',
          },
          {
            slug: 'inductance',
            code: '§8.4',
            title: '自感和互感',
            summary: '线圈自身的磁通变化，以及两个线圈之间的互感。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'magnetic-energy',
            code: '§8.5',
            title: '磁场的能量',
            summary: '电感器储存的能量，也可以看成磁场的能量。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'transient',
            code: '§8.6',
            title: 'RL 和 RC 电路中的暂态过程',
            summary: '接通或断开电源后，电流和电压怎样趋近稳态。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'displacement-current',
            code: '§8.7',
            title: '位移电流和全电流定律',
            summary: '电容器充放电时，位移电流把安培环路补完整。这一节的图还在建设中。',
            status: 'wip',
          },
          {
            slug: 'maxwell',
            code: '§8.8',
            title: '麦克斯韦电磁场方程组',
            summary: '四条方程分别约束电场和磁场的散度与旋度。结构图还在建设中。',
            status: 'wip',
            page: 'maxwell',
            legacy: 'ch8/maxwell',
          },
        ],
      },
    ],
  },
]

export function chapterPath(partId: string, chapterId: string): string {
  return `/${partId}/${chapterId}`
}

export function topicPath(partId: string, chapterId: string, slug: string): string {
  return `/${partId}/${chapterId}/${slug}`
}

export function topicLabel(topic: Topic): string {
  return topic.code ? `${topic.code} ${topic.title}` : topic.title
}

export function locate(pathname: string): {
  part?: Part
  chapter?: Chapter
  topic?: Topic
} {
  const segs = pathname.split('/').filter(Boolean)
  const part = CATALOG.find((item) => item.id === segs[0])
  if (!part) return {}
  const chapter = part.chapters.find((item) => item.id === segs[1])
  if (!chapter) return { part }
  const topic = chapter.topics.find((item) => item.slug === segs[2])
  return topic ? { part, chapter, topic } : { part, chapter }
}

export function legacyRedirects(): { from: string; to: string }[] {
  const rows: { from: string; to: string }[] = []
  for (const part of CATALOG) {
    for (const chapter of part.chapters) {
      for (const topic of chapter.topics) {
        if (!topic.legacy) continue
        rows.push({
          from: topic.legacy,
          to: topicPath(part.id, chapter.id, topic.slug),
        })
      }
    }
  }
  return rows
}
