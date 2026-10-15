import type { Messages } from "./en";

/** 简体中文. Needs a native review: see docs/07-translation-review.md. */
const zh: Messages = {
  meta: {
    siteTitle: "湄公河慢船游轮：会晒至琅勃拉邦 · Nagi of Mekong",
    siteDescription:
      "从会晒（清孔对岸）经北本到琅勃拉邦，湄公河上两天，酒店到酒店全程安排：接送、过境协助、午餐和酒店均已包含。{from} 起。",
    tagline: "舒适、安心地畅游壮丽的湄公河",
    ogAlt: "Nagi of Mekong：从会晒到琅勃拉邦的湄公河慢船游轮",
    notFoundTitle: "页面不存在",
  },

  common: {
    skipToContent: "跳到正文",
    home: "首页",
    breadcrumb: "页面路径",
    perPerson: "每人",
    perPersonShort: "/ 人",
    from: "起价",
    priceOnRequest: "价格请咨询",
    opensNewTab: "（在新标签页打开）",
    askOnWhatsApp: "WhatsApp 咨询",
    whatsapp: "WhatsApp",
    call: "致电",
    included: "包含",
    notIncluded: "不含",
    meals: "餐食：",
    route: "路线",
    routeTo: "至",
    keyFacts: "行程要点",
    photo: "照片",
    placeholder: "待补充",
    pauseMotion: "暂停滚动文字",
  },

  nav: {
    main: "主导航",
    mobile: "移动端导航",
    footer: "页脚",
    homeLabel: "{name}，首页",
    cruises: "游轮行程",
    whereToStay: "住宿",
    charters: "包船",
    guide: "路线指南",
    faq: "常见问题",
    contact: "联系我们",
    privacy: "隐私",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    menu: "菜单",
    menuDescription: "网站导航、语言、货币和联系方式",
    visit: "了解更多",
    talkToUs: "联系我们",
    whatsappNumber: "WhatsApp {phone}",
    open: "服务时间 {hours}",
    bookingLabel: "查询空位",
  },

  switcher: {
    region: "语言和货币",
    language: "语言",
    currency: "货币",
    languageButton: "语言：{name}",
    currencyButton: "货币：{name}",
    currencyHint: "预订以美元结算，其他货币仅供参考。",
  },

  banner: {
    label: "语言",
    text: "本页面也有简体中文版。",
    accept: "阅读中文版",
    dismiss: "不用了",
    dismissLabel: "关闭并继续使用当前语言",
  },

  currency: {
    approx: "约 {amount}",
    note: "{currency} 金额仅供参考，预订以美元结算。",
    noteUsd: "价格以美元标示，即实际结算货币。",
    rates: "汇率：欧洲中央银行（经 Frankfurter），{date}。",
    ratesTitle: "{date} 汇率",
    noRates: "暂无汇率：价格以美元显示。",
  },

  facts: [
    { value: "2", label: "天河上旅程" },
    { value: "40", label: "个座位，通常还有空余" },
    { value: "3", label: "班/周顺流出发" },
  ],

  contact: {
    replyPromise: "所有预订咨询我们都会在 24 小时内回复。",
    country: "泰国",
    locationNote: "与老挝会晒隔河相望",
  },

  home: {
    offerName: "两天湄公河游轮，门到门全程安排",
    title: "从会晒到琅勃拉邦，舒适又安心",
    intro:
      "顺湄公河而下两天，在北本住一晚。我们到清孔或会晒的酒店接您，协助您过境，在船上供应午餐，最后把您送到琅勃拉邦的酒店。",
    departures: "出发日",
    loopPhrase: "乘慢船两天抵达琅勃拉邦",
    freeToAsk: "免费咨询，无需承诺。",
    journeyEyebrow: "旅程",
    journeyTitle: "河上两天",
    dayChip: "{n}",
    dayLabel: "第 {n} 天：",
    fullItinerary: "查看顺流行程详情",
    compareHotels: "比较北本的酒店",
    onboardEyebrow: "登上 Nagi of Mekong",
    onboardTitle: "一段值得回味的河上旅程",
    onboardIntro:
      "我们是一家中档游轮运营商：舒适安全的船，每天新鲜现做的午餐，还有一位从码头到酒店全程照应的领队。",
    moreEyebrow: "更多玩法",
    moreTitle: "想逆流而上，或从更远的地方出发？",
    moreIntro: "可以从琅勃拉邦逆流而上，也可以从清迈或难府出发，去河边的路交给我们。",
    readGuide: "阅读路线指南",
    faqEyebrow: "出发须知",
    faqTitle: "登船前的常见问题",
    allQuestions: "签证、餐食和天气的所有问题",
  },

  packagesSection: {
    eyebrow: "每人价格",
    title: "同一条船，北本住哪您来选",
    intro: "每个套餐都包含接送、过境协助、两顿午餐、沿途停靠和各段接驳。不同的只是您住的酒店。",
  },

  handled: {
    eyebrow: "门到门",
    title: "从您的酒店到琅勃拉邦，一切都已安排好",
    intro: "自己走这条河，下面每一件事都得亲自搞定。乘坐 Nagi of Mekong，这些都包含在行程里。",
    onYourOwn: "自己走，您得操心……",
    withUs: "跟我们走",
    onYourOwnSr: "自己走：",
    rows: [
      { task: "从酒店去码头", handled: "我们到酒店接您，送您到码头。" },
      { task: "泰老边境和落地签", handled: "我们协助您过境、办理签证。" },
      { task: "过境和上船时搬行李", handled: "行李由我们帮您搬。" },
      { task: "在河上漫长的一天找吃的", handled: "我们每天现做午餐，提供素食和清真选择。" },
      { task: "在北本找住处", handled: "我们为您预订北本的酒店，含早餐。" },
      { task: "不知道沿途哪里值得停", handled: "我们停靠村庄和帕乌洞，并有英语领队讲解。" },
      { task: "从琅勃拉邦码头进城", handled: "我们把您从码头送到琅勃拉邦的酒店。" },
      { task: "担心意外情况", handled: "每位乘客都有旅行保险和救生衣。" },
    ],
  },

  boat: [
    {
      title: "空间宽敞",
      text: "船上有 40 个座位，但通常坐不满，座椅舒适，可以随意走动。",
    },
    {
      title: "安全第一",
      text: "每位乘客都有救生衣，船上备有安全设备。现代化洗手间、舒适座椅，还有可以打牌、玩游戏或写明信片的桌子。",
    },
    {
      title: "船上现做午餐",
      text: "每天现做午餐，并提供茶、咖啡和饮品。可选纯素、素食和清真餐。",
    },
    {
      title: "全程陪同",
      text: "两天都有英语领队随行，帮您搬行李、协助过境，并负责两端的接送。",
    },
  ],

  reviews: {
    eyebrow: "评价",
    title: "旅客怎么说",
    intro:
      "来自 Tripadvisor 和 Viator 的原文评价，未经修改，每条都附原文链接，并保留撰写时的语言。",
    ratingsLabel: "旅客评分",
    reviewCount: "{count} 条评价",
    asOf: "截至 {date}",
    note: "Viator 与 Tripadvisor 的评价总数和评分",
    copiedOn: "评分和评价于 {date} 从各平台复制。",
    showAll: "查看全部 {count} 条评价",
    readAllOn: "在 {name} 查看全部评价",
    seeAllOn: "（在 {name} 查看全部评价，新标签页打开）",
    written: "撰写于 {date}",
    reviewFrom: "评价来自",
    readOn: "在 {name} 阅读",
    language: "评价语言：",
    rated: "评分 {rating}（满分 5）",
    levels: {
      "5": "极好",
      "4": "很好",
      "3": "一般",
      "2": "较差",
      "1": "很差",
    },
  },

  tiktok: {
    eyebrow: "TikTok 上",
    title: "旅客在 TikTok 上怎么说",
    intro: "这些旅客乘过我们的船并拍了视频。视频和配文都是他们的原话，未经修改。这些不是评分。",
    play: "播放 @{handle} 的 TikTok 视频",
    privacy: "点击后才会从 TikTok 加载，TikTok 可能会设置 Cookie。",
    watchOn: "在 TikTok 观看",
    opensTikTok: "将打开 TikTok",
    captionLabel: "@{handle} 的配文：",
    showMore: "展开完整配文",
    showLess: "收起",
    dialogTitle: "@{handle} 的 TikTok 视频",
    dialogDescription: "视频从 TikTok 加载。按 Esc 或“关闭”返回。",
    close: "关闭",
    loading: "正在从 TikTok 加载视频……",
    retrieved: "配文与 TikTok 上发布的原文一致，复制于 {date}。",
    placeholder: "暂无配文：请在 src/content/tiktok.ts 中补充。",
  },

  trip: {
    duration: "行程时长",
    group: "人数",
    groupDefault: "船上最多 40 位乘客",
    includedEyebrow: "我们来安排",
    includedTitle: "费用包含",
    includedIntro: "以下内容全部包含在价格中，路上无需您再操心。",
    itineraryEyebrow: "每日安排",
    itineraryTitle: "行程",
    pricesEyebrow: "价格",
    pricesTitle: "每人价格",
    pricesOnRequestTitle: "价格请咨询",
    knowEyebrow: "出发之前",
    knowTitle: "出行须知",
    asideLabel: "预订此行程",
    askEarly: "{note}请尽早咨询。",
    bookIntro: "选好出发日期，告诉我们同行人数。发送咨询免费，不构成任何承诺。",
    dayOne: "第一天：{stop}",
    moreEyebrow: "更多玩法",
    moreTitle: "其他行程",
    seeItinerary: "查看行程和价格",
    twinShare: "，双人间或双床间两人同住",
    singleSupplement: "单人房差 {price}",
    singleSupplementInline: "单人房差 {price}",
    offerEnds: "优惠截至 {date}",
    validUntil: "有效期至 {date}",
    validFrom: "{date} 起",
    kind: { cruise: "河上游轮", landCruise: "陆路 + 游轮" },
  },

  nextSailings: {
    label: "近期班次",
    every: "每{days}",
  },

  nextSteps: {
    stepSr: "第 {n} 步：",
    defaultDayOne: "出发当天早上到酒店接您",
    send: {
      title: "您发送咨询",
      text: "一条预先填好的 WhatsApp 消息或电子邮件，免费且无需承诺。",
    },
    confirm: {
      title: "我们 24 小时内确认",
      text: "确认您选定日期的空位和最终价格。",
    },
    travel: { title: "您出发" },
  },

  cta: {
    title: "告诉我们日期，其余交给我们",
    text: "告诉我们您想哪天出发、一共几位。",
    orCall: "或致电",
    orEmail: "或发邮件至",
  },

  booking: {
    checkCount: {
      one: "请检查这一项信息",
      other: "请检查 {count} 项信息",
    },
    stepTrip: "您的行程",
    tripField: "游轮或行程",
    dateHint: "选一个日期，或告诉我们您的时间灵活。",
    chooseDate: "{label}：选择日期",
    anotherDate: "其他日期",
    flexible: "时间灵活",
    flexibleLabel: "其他日期或时间灵活",
    loadingDates: "正在加载近期班次……",
    stepTravellers: "人数和住宿",
    travellers: "出行人数",
    fewer: "减少一人",
    more: "增加一人",
    nightIn: "北本住宿",
    alsoAsk: "顺便咨询",
    optional: "（选填）",
    alsoAskHint: "我们会在回复中一并说明，不构成承诺。",
    stepDetails: "您的信息",
    name: "姓名",
    email: "电子邮件",
    phone: "电话或 WhatsApp",
    diet: "饮食需求",
    dietHint: "可提供纯素、素食和清真餐",
    message: "其他需求？",
    summary: "咨询摘要",
    yourRequest: "您的咨询",
    trip: "行程",
    date: "日期",
    flexibleShort: "灵活",
    notChosen: "尚未选择",
    travellersShort: "人数",
    option: "选项",
    alsoAsking: "顺便咨询",
    estimate: "预估总价",
    estimateFor: { one: "（{count} 人）", other: "（{count} 人）" },
    basedOn: "按公布价格计算",
    inclSupplement: "，含单人房差",
    weConfirm: "最终价格以我们确认为准。",
    quote: "我们会给您发送报价。",
    sendWhatsApp: "通过 WhatsApp 发送",
    sendEmail: "通过邮件发送",
    nothingCharged:
      "网上不会收取任何费用。您的消息会在 WhatsApp 或邮件应用中打开，确认后即可发送。",
    readyIn: "您的咨询已在{channel}中准备好，请在那里点击发送。",
    channelWhatsApp: " WhatsApp ",
    channelEmail: "邮件应用",
    nothingOpened: "没有弹出窗口？请发邮件至 {email} 或致电 {phone}。",
    errors: {
      name: "请填写您的姓名。",
      trip: "请选择游轮或行程。",
      travellers: "出行人数需在 1 到 40 之间。",
      email: "电子邮件地址似乎有误。",
    },
  },

  faqPage: {
    title: "湄公河游轮常见问题：老挝签证、过境、餐食和天气",
    description:
      "登船前的答疑：酒店接送与泰老边境、老挝落地签、船上午餐、仅乘船座位，以及北本的凉季。",
    eyebrow: "规划行程",
    heading: "湄公河游轮：您的问题，我们来解答",
    intro: "从过境到午餐吃什么：湄公河两日游的实用信息。",
    essentialsEyebrow: "要点",
    essentialsTitle: "实用信息",
    essentials: [
      {
        title: "接送和过境",
        text: "我们到清孔或会晒的酒店接您，帮您处理行李，并协助办理泰国和老挝的出入境手续。",
      },
      {
        title: "老挝签证",
        text: "乘坐顺流游轮，请携带美元现金支付落地签费用，并准备一张证件照。难府线路需提前在老挝使馆办好签证。",
      },
      {
        title: "船上餐食",
        text: "每天现做午餐，另有茶、咖啡和饮品。需要纯素、素食或清真餐，告诉我们即可。",
      },
      {
        title: "天气",
        text: "11 月至次年 1 月，北本可能非常冷，请带上保暖衣物或外套。",
      },
    ],
    links:
      "路线、过境和行李清单，逐步说明：<guide>会晒至琅勃拉邦路线指南</guide>。从更远的地方来？可以从<chiangMai>清迈</chiangMai>或<nan>难府</nan>出发，去河边的路交给我们。",
    boatEyebrow: "船只",
    boatTitle: "船上的舒适与安全",
    faqEyebrow: "常见问题",
    faqTitle: "常见问题",
  },

  faq: [
    {
      question: "怎么预订？",
      answer:
        "通过预订表单、WhatsApp 或电子邮件给我们发送咨询，写明希望的出发日期、人数和北本的酒店。我们会在 24 小时内回复确认。",
    },
    {
      question: "船哪几天出发？",
      answer:
        "顺流从会晒到琅勃拉邦：每周日、周三和周五。逆流从琅勃拉邦到会晒：每周一和周四；逆流班次需达到最低乘客人数。",
    },
    {
      question: "在哪里接我们？",
      answer: "在您位于清孔（泰国）或会晒（老挝）的酒店。我们送您到码头，帮您处理行李并协助过境。",
    },
    {
      question: "去老挝需要签证吗？",
      answer:
        "顺流游轮我们会协助您办理落地签：请携带美元现金支付签证费，并准备一张证件照。难府线路则必须提前在老挝使馆办好签证。",
    },
    {
      question: "船上吃什么？",
      answer: "每天现做午餐，另有茶、咖啡和饮品。可选纯素、素食和清真餐，预订时告诉我们即可。",
    },
    {
      question: "可以只坐船、不订北本的酒店吗？",
      answer: "可以。每个班次都有仅乘船座位，每人 {price:cruise-only}。北本的住宿由您自行安排。",
    },
    {
      question: "河上冷吗？",
      answer: "11 月至次年 1 月，北本可能非常冷，请带上保暖衣物或外套。",
    },
    {
      question: "可以为团队或活动包船吗？",
      answer: "可以。我们承接最多 40 人的小型会议、培训、奖励旅游和特别活动，船上提供茶歇和午餐。",
    },
  ],

  whereToStay: {
    title: "湄公河游轮北本住宿推荐",
    description:
      "北本（Pakbeng）标准和豪华酒店及对应游轮套餐价格，另有琅勃拉邦的 Villa Mira 和会晒码头旁的青年旅舍。",
    eyebrow: "住宿",
    heading: "北本酒店及沿途住宿",
    intro: "为北本的那一晚选择合适的舒适度，并找到游轮前后在琅勃拉邦和会晒的住处。",
    groups: {
      pakBeng: {
        title: "北本：河上的那一晚",
        intro: "顺流套餐包含在这里住一晚，价格取决于您选择的酒店。",
      },
      luangPrabang: {
        title: "琅勃拉邦：行前或行后",
        intro: "老城里的一家民宿，适合游轮前后入住。",
      },
      houayXai: {
        title: "会晒：码头旁",
        intro: "离慢船码头五分钟的经济型住处，价格请直接联系店主。",
      },
    },
    cruisePackage: "游轮套餐",
    hotelWebsite: "酒店官网",
  },

  stays: {
    "mon-savahn": {
      tier: "标准",
      description: "我们的基础选项，包含在标准游轮套餐中：简洁的空调房，含早餐。",
      facts: ["空调房", "含早餐"],
    },
    "le-grande": {
      tier: "豪华",
      description: "约 50 栋空调别墅，大多带河景和阳台，并设有泳池。",
      facts: ["约 50 栋别墅", "河景和阳台", "泳池"],
    },
    sanctuary: {
      tier: "豪华",
      description: "拥有 48 间客房的度假屋，从高级风扇房到豪华空调房，并设有泳池。",
      facts: ["48 间客房", "风扇房或空调房", "泳池"],
    },
    "villa-mira": {
      tier: "三星民宿",
      description: "11 间客房，位于香通寺附近一条安静的石板街上，适合游轮前后在琅勃拉邦入住。",
      facts: [
        "9 间高级双人/双床房和 2 间家庭房，27 平方米",
        "空调、独立淋浴、有线电视",
        "保险箱、冰箱、吹风机、电水壶及茶和咖啡",
      ],
    },
    "homy-dormy": {
      tier: "经济型",
      description: "温馨的青旅式住处，距慢船码头五分钟，适合游轮前一晚或结束后入住。",
      facts: ["4 个房间，每间 4 张上下铺", "简单早餐", "步行 5 分钟到码头"],
    },
  },

  charters: {
    title: "湄公河私人包船：团队与活动",
    description:
      "包下 Nagi of Mekong 举办会议、培训、奖励旅游或特别活动，最多 40 人，船上提供茶歇和午餐。",
    eyebrow: "水上休闲与会议",
    heading: "在河上举办会议、培训和特别活动",
    intro: "我们在 Nagi of Mekong 上承办小型会议、培训、奖励旅游和特别活动。",
    emailButton: "发邮件告诉我们您的活动",
    emailSubject: "湄公河私人包船 / 活动咨询",
    offerLabel: "我们提供",
    points: [
      { title: "最多 40 人", text: "乘坐我们的一艘大船。" },
      { title: "课桌式或剧院式", text: "按您的活动需求布置，配有基础设备。" },
      { title: "茶歇和午餐", text: "活动期间在船上供应。" },
    ],
    tellUs: "告诉我们日期、团队人数和您的想法。",
    ctaTitle: "策划一场水上活动",
    ctaText: "把日期和人数发给我们。",
  },

  contactPage: {
    title: "预订湄公河游轮或联系我们",
    description:
      "通过 WhatsApp 或电子邮件查询 Nagi of Mekong 的空位。电话 +66 95 507 3264，邮箱 adisak.star@gmail.com。24 小时内回复。",
    eyebrow: "预订与联系",
    heading: "查询空位",
    intro: "把您的需求发给我们：免费，也不构成任何承诺。",
    phone: "电话",
    email: "电子邮件",
    hours: "服务时间",
    basedIn: "所在地",
    bookingTitle: "您的预订咨询",
    bookingIntro: "简单四步。您的消息会在 WhatsApp 或邮件应用中打开，确认后即可发送。",
  },

  privacy: {
    title: "隐私",
    description:
      "Nagi of Mekong 网站如何处理您的信息：不做追踪，只在您的浏览器中保存两项偏好设置。",
    heading: "隐私",
    intro: "本网站的设计原则是尽可能少地收集信息。",
    sections: [
      {
        title: "本网站保存什么",
        text: "本网站没有用户账户、没有流量统计，也没有广告追踪。字体由本网站提供，不经过第三方。和所有网站一样，托管服务器可能出于安全和稳定的需要保留标准技术日志（例如 IP 地址和访问的页面）。",
      },
      {
        title: "您的语言和货币",
        text: "当您选择语言时，一个小 Cookie（nagi_locale）会记住您的选择一年，之后不再询问。当您选择货币时，它会保存在浏览器的本地存储中。两者都不会发送给任何人，也不会用于追踪您，您可以在浏览器设置中清除。我们从不根据您的位置推断语言，只读取您浏览器请求的语言。",
      },
      {
        title: "TikTok 视频",
        text: "TikTok 视频只有在您点击后才会加载。只有那时，您的浏览器才会连接 TikTok，TikTok 可能会根据其隐私政策设置自己的 Cookie。“在 TikTok 观看”链接会打开 TikTok 网站。",
      },
      {
        title: "预订表单",
        text: "预订表单不会把您的信息发送到任何服务器。当您点击“通过 WhatsApp 发送”或“通过邮件发送”时，消息会在您的浏览器中生成，并在 WhatsApp 或您的邮件应用中打开。在您点击发送之前，不会发出任何内容。",
      },
      {
        title: "当您联系我们时",
        text: "您发送的消息会通过 WhatsApp 或电子邮件送达 Nagi of Mekong，仅用于回复您的咨询和安排行程。这些服务有各自的隐私政策。",
      },
    ],
    questionsTitle: "问题",
    questions: "请发邮件至 <email>{email}</email>。",
  },

  guide: {
    title: "会晒到琅勃拉邦慢船攻略：路线指南",
    description:
      "从清孔和会晒（Huay Xai）乘两天慢船到琅勃拉邦怎么走：出发日、过境与老挝签证、北本住一晚，以及逆流行程。",
    eyebrow: "路线指南",
    crumb: "路线指南",
    heading: "乘慢船从会晒到琅勃拉邦",
    intro:
      "从泰老边境到琅勃拉邦的两天湄公河之旅是怎样的：从过境一直到北本的那一晚。会晒（Houay Xai）也写作 Huay Xai 或 Houayxay，北本（Pak Beng）常写作 Pakbeng。",
    askWhatsApp: "WhatsApp 咨询",
    onThisPage: "本页内容",
    toc: {
      route: "路线概览",
      border: "清孔、会晒与边境",
      dayOne: "第一天：会晒到北本",
      pakBeng: "北本的一晚",
      dayTwo: "第二天：北本到琅勃拉邦",
      upstream: "逆流而上",
      fromChiangMai: "从清迈出发",
      fromNan: "从难府出发",
      packing: "行李清单",
    },
    upstreamTitle: "逆流而上：琅勃拉邦到会晒",
    route:
      "河上旅程共两天，在边境与琅勃拉邦之间的半路村镇北本住一晚。顺流班次每{downDays}从会晒出发；逆流班次每{upDays}从琅勃拉邦出发。",
    border: [
      "泰国清莱府的清孔与老挝的会晒隔湄公河相望。乘坐我们的顺流游轮，早餐后我们会到您在任一城镇的酒店接您，帮您处理行李，并协助办理泰老两国的出入境手续和落地签。",
      "办理老挝落地签，请携带美元现金支付签证费，并准备一张证件照。",
    ],
    dayOne:
      "上船后先来杯茶或咖啡，看两岸风景缓缓后退。船会停靠一座乡村，午餐在船上现做，下午抵达北本。我们送您到酒店，晚上自由活动。",
    pakBengIntro: "我们的顺流套餐包含北本的一晚住宿，价格取决于您选择的酒店：",
    pakBengStay: "<name>{name}</name>（{tier}）：{facts}。",
    pakBengPrice: "游轮套餐每人 {price}。",
    cruiseOnly: "已经订好房间？仅乘船座位每人 {price}，住宿由您自行安排。",
    pakBengCold: "11 月至次年 1 月，北本可能非常冷。<link>比较北本的酒店</link>。",
    dayTwo:
      "在酒店吃完早餐后再次登船。船会停靠一座少数民族村寨，并在船上供应午餐，运气好的话还能看到岸边洗澡的大象或淘金的村民。最后一站是帕乌洞，洞里供奉着无数佛像。从琅勃拉邦码头，嘟嘟车或小巴会把您送到城里的住处。",
    dayTwoLink: "<link>查看顺流游轮的行程、价格和包含项目</link>。",
    upstream:
      "逆流班次每{days}从琅勃拉邦出发，清晨到酒店接您，第一天在船上享用简单早餐，并停靠帕乌洞和一座老挝村庄。第二天约 16:30 抵达会晒，正好赶上过境回泰国：我们送您到边境，并包含去清孔的巴士票。逆流班次需达到最低乘客人数，请尽早咨询。",
    upstreamPrice: "每人 {price}。",
    upstreamMore:
      "您还可以接着从清孔经清莱走陆路两三天去清迈：欢迎找我们规划。<link>查看逆流游轮</link>。",
    chiangMai:
      "我们的五天行程先在清迈住两晚。第三天驱车约 300 公里前往清孔，沿途游览温泉、白庙和金三角（含鸦片博物馆 Hall of Opium），当晚住清孔，次日开始两天游轮。请在{days}抵达清迈，以便衔接船期。",
    chiangMaiPrice: "每人 {price}，最少两人成行。",
    chiangMaiLink: "<link>查看清迈陆路 + 游轮行程</link>。",
    nan: "从泰国北部的难府出发，经会孔（Huai Kon）口岸进入老挝，距北本约一小时车程，在那里登船，沿河航行一天到琅勃拉邦。此线路须提前在老挝使馆办好签证，并注明从孟恩（Muang Ngeun）入境。",
    nanLink: "<link>查看难府至琅勃拉邦行程</link>。",
    packing: [
      "护照、用于支付老挝签证费的美元现金，以及一张证件照。",
      "11 月至次年 1 月请带保暖衣物或外套。",
      "不用自带午餐：船上现做。如需纯素、素食或清真餐，请提前告诉我们。",
    ],
    packingLink: "<link>更多关于签证、餐食和天气的问题</link>。",
    ctaTitle: "想把整条路线都交给我们吗？",
  },

  notFound: {
    title: "这个页面顺流漂走了",
    text: "您要找的页面不存在，或已随新网站更换了地址。",
    home: "返回首页",
    contact: "联系我们",
  },

  map: {
    title: "路线图：湄公河从会晒出发，在北本过夜，抵达琅勃拉邦",
    board: "第1天 · 登船",
    overnight: "过夜",
    arrive: "第2天 · 抵达",
  },

  photos: {
    hero: { alt: "Nagi of Mekong 慢船行驶在湄公河上，背后是连绵山丘" },
    riverBanks: { alt: "从甲板上看到的湄公河沙洲、岩石和林木茂密的山丘" },
    pakOuCave: { alt: "湄公河畔帕乌洞内成排的佛像" },
    pakBeng: { alt: "傍晚时分停靠在北本的游船" },
    village: { alt: "游轮停靠期间，旅客在河边村庄里漫步" },
    boatExterior: { alt: "停靠在码头、准备登船的 Nagi of Mekong 游船" },
    boatInterior: {
      alt: "船舱内一排排舒适的座椅和桌子，两侧都能看到河景",
      caption: "座椅舒适，空间宽敞",
    },
    lunch: {
      alt: "船上供应的现做自助午餐",
      caption: "每天供应现做的自助午餐",
    },
    host: {
      alt: "英语领队在甲板上与乘客交谈",
      caption: "两天都有英语领队随行",
    },
    crew: { alt: "Nagi of Mekong 的船员在船前合影" },
    upstream: { alt: "清晨从琅勃拉邦码头出发" },
    chiangMai: { alt: "清莱府的白庙，前往湄公河途中的一站" },
    nan: { alt: "泰国北部难府城中的一座寺庙" },
    charter: { alt: "一个私人团队在船上开会，窗外是湄公河" },
  },

  trips: {
    downstream: {
      name: "顺流游轮：会晒至琅勃拉邦",
      shortName: "顺流 · 会晒 → 琅勃拉邦",
      bookTitle: "预订顺流游轮",
      summary:
        "顺湄公河而下两天，从泰老边境直达联合国教科文组织世界遗产城市琅勃拉邦，途中在北本您选定的酒店住一晚。",
      duration: "2 天 1 晚",
      departuresLabel: "会晒出发",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "标准酒店",
          detail: "北本的空调房，含早餐。",
          badge: "",
        },
        "le-grande": {
          label: "Le Grande Pak Beng",
          detail: "带泳池的高档酒店，含早餐。",
          badge: "",
        },
        sanctuary: {
          label: "Sanctuary Pak Beng Lodge",
          detail: "带泳池的度假屋，含早餐。",
          badge: "",
        },
        "sanctuary-summer-2026": {
          label: "Sanctuary Pak Beng Lodge — 夏季优惠",
          detail: "季节性促销。",
          badge: "夏季优惠",
        },
        "cruise-only": {
          label: "仅乘船",
          detail: "船上座位、两顿午餐、沿途游览和接驳。北本的住宿由您自行安排。",
          badge: "",
        },
      },
      included: [
        "清孔或会晒酒店接送至码头",
        "代搬行李，协助过境和办理落地签",
        "旅行保险",
        "两天全程陪同游轮，配英语领队",
        "每天现做午餐和饮品（可选纯素、素食和清真）",
        "沿途游览停靠，包括帕乌洞",
        "在北本您选定的酒店住一晚（“仅乘船”除外）",
        "琅勃拉邦码头送至您的酒店",
      ],
      notIncluded: ["老挝签证费（需用美元支付）及一张证件照", "个人消费"],
      itinerary: [
        {
          label: "第 1 天",
          title: "会晒至北本",
          meals: "午餐",
          note: "",
          stops: [
            {
              title: "酒店接送",
              text: "早餐后，我们到您在清孔或会晒的酒店接您，帮您处理行李，并协助过境和办理落地签。",
            },
            {
              title: "登船",
              text: "坐定后来杯茶或咖啡，看湄公河两岸的日常生活从眼前流过。",
            },
            { title: "村庄停靠", text: "参观河岸边的一座乡村。" },
            { title: "船上热午餐", text: "" },
            { title: "北本", text: "下午抵达，送您到酒店，晚上自由活动。" },
          ],
        },
        {
          label: "第 2 天",
          title: "北本至琅勃拉邦",
          meals: "酒店早餐，船上午餐",
          note: "",
          stops: [
            { title: "重回河上", text: "早餐后登船，开始最后一段航程。" },
            { title: "停靠少数民族村寨", text: "" },
            { title: "船上午餐", text: "运气好的话，能看到岸边洗澡的大象和淘金的村民。" },
            { title: "帕乌洞", text: "供奉着无数佛像的洞穴寺庙。" },
            {
              title: "琅勃拉邦",
              text: "从码头乘嘟嘟车或小巴前往您在城里的住处。",
            },
          ],
        },
      ],
      goodToKnow: [
        "请携带美元现金和一张证件照，用于办理老挝落地签。",
        "每个班次都有仅乘船座位。",
        "通过邮件或 WhatsApp 预订，我们会在 24 小时内确认。",
      ],
      packages: {
        standard: {
          name: "游轮 + 标准酒店",
          summary: "全程安排，北本住简洁的空调房。",
          highlight: "全部包含",
          points: [
            "北本空调房，含早餐",
            "接送、过境协助、两顿午餐、沿途停靠和接驳",
            "英语领队和旅行保险",
          ],
        },
        deluxe: {
          name: "游轮 + 豪华度假屋",
          summary: "同样的行程，北本那晚住带泳池的度假屋。",
          highlight: "",
          points: [
            "Le Grande Pak Beng：约 50 栋别墅，大多带河景和阳台",
            "Sanctuary Pak Beng Lodge：48 间客房",
            "两家都有泳池并含早餐",
          ],
        },
        "cruise-only": {
          name: "仅乘船",
          summary: "北本已经有住处？那就只坐船。",
          highlight: "",
          points: ["同样的船、领队、午餐、停靠和接驳", "北本的住宿由您自行安排"],
        },
      },
      extras: ["游轮前一晚在会晒住宿", "游轮结束后在琅勃拉邦住宿"],
      seo: {
        title: "会晒到琅勃拉邦慢船游轮，两天行程",
        description:
          "从会晒（Huay Xai，清孔对岸）经北本到琅勃拉邦的两天湄公河游轮。含酒店接送、午餐和过境协助。{from} 起。",
      },
    },

    upstream: {
      name: "逆流游轮：琅勃拉邦至会晒",
      shortName: "逆流 · 琅勃拉邦 → 会晒",
      bookTitle: "预订逆流游轮",
      summary: "同一段河上旅程反向而行，从琅勃拉邦逆流而上到泰国边境的会晒，正好赶上过境去清孔。",
      duration: "2 天 1 晚",
      departuresLabel: "琅勃拉邦出发",
      departuresNote: "需达到最低乘客人数。",
      minimum: "",
      priceOnRequest: "",
      options: {
        standard: {
          label: "游轮 + 北本酒店",
          detail: "Mekong Riverside Lodge、BKC Villa 或同级酒店，含早餐。",
          badge: "",
        },
      },
      included: [
        "清晨到琅勃拉邦酒店接您并送至码头",
        "第一天船上提供简单早餐、咖啡和茶",
        "每天船上现做午餐",
        "停靠帕乌洞和河边村庄",
        "北本住宿一晚，含早餐",
        "送至老泰边境，并含去清孔的巴士票",
      ],
      notIncluded: [
        "北本高档酒店（Sanctuary Pak Beng Lodge 或 Le Grande Pak Beng）：需加价，欢迎咨询",
      ],
      itinerary: [
        {
          label: "第 1 天",
          title: "琅勃拉邦至北本",
          meals: "船上早餐和午餐",
          note: "11 月至次年 1 月，北本可能非常冷，请带上保暖衣物或外套。",
          stops: [
            { title: "清晨接送", text: "从酒店送到码头，随后在船上享用简单早餐、咖啡和茶。" },
            { title: "帕乌洞", text: "" },
            { title: "老挝少数民族村庄", text: "" },
            { title: "船上现做午餐", text: "" },
            { title: "北本", text: "下午抵达。晚上可以逛逛小镇，领队会推荐吃饭的地方。" },
          ],
        },
        {
          label: "第 2 天",
          title: "北本至会晒",
          meals: "酒店早餐，船上午餐",
          note: "",
          stops: [
            { title: "退房登船", text: "在酒店吃完早餐，开始最后一段航程。" },
            { title: "村庄停靠", text: "在河边一座村庄停靠一次。" },
            { title: "船上午餐", text: "" },
            {
              title: "约 16:30 抵达会晒",
              text: "正好赶上过境回泰国：送您到边境，并提供去清孔的巴士票，方便您继续行程。",
            },
          ],
        },
      ],
      goodToKnow: [
        "可接着在泰国北部走陆路两三天，从清孔经清莱到清迈。欢迎找我们规划。",
        "北本的高档酒店只需少量加价即可入住。",
      ],
      packages: {},
      extras: [
        "北本的高档酒店（Sanctuary Pak Beng Lodge 或 Le Grande Pak Beng）",
        "继续走陆路去清莱和清迈的行程规划",
      ],
      seo: {
        title: "琅勃拉邦到会晒慢船游轮，两天行程",
        description:
          "从琅勃拉邦经北本逆流而上到会晒（Huay Xai）的两天湄公河游轮，正好赶上过境去清孔。每周一、周四出发。{from}。",
      },
    },

    "chiang-mai-land-and-cruise": {
      name: "清迈、金三角与湄公河",
      shortName: "陆路 + 游轮 · 清迈 → 琅勃拉邦",
      bookTitle: "预订陆路 + 游轮行程",
      summary:
        "从清迈到琅勃拉邦的五天行程：清迈住两晚，途经白庙和金三角驱车前往湄公河，再乘两天顺流游轮。",
      duration: "5 天 4 晚",
      departuresLabel: "抵达清迈",
      departuresNote: "周二抵达赶周五的船，周四抵达赶周日的船，周日抵达赶周三的船。",
      minimum: "最少 2 人成行。3 人及以上家庭请发邮件获取准确报价。",
      priceOnRequest: "",
      options: {
        package: {
          label: "完整行程",
          detail: "双人间或双床间两人同住，包含下列全部项目。",
          badge: "",
        },
      },
      included: [
        "空调私家车或小巴接送，配英语导游",
        "清迈 Dusit Princess（四星）或同级酒店两晚，含早餐",
        "清迈至清孔的车程，含沿途游览、午餐、门票和英语陪同",
        "清孔四星酒店一晚，含早餐",
        "两天游轮，含每日午餐、北本住宿和沿途游览",
        "保险",
      ],
      notIncluded: ["个人消费", "酒精饮料", "签证费"],
      itinerary: [
        {
          label: "第 1–2 天",
          title: "清迈",
          meals: "早餐",
          note: "",
          stops: [
            {
              title: "清迈机场接机",
              text: "送往市中心的四星酒店 Dusit Princess，步行两分钟即到夜市。",
            },
            { title: "自由活动", text: "可安排自选游览，或量身定制行程。" },
          ],
        },
        {
          label: "第 3 天",
          title: "清迈至清孔",
          meals: "早餐、午餐",
          note: "",
          stops: [
            { title: "约 300 公里的风景之旅", text: "" },
            { title: "温泉和白庙", text: "" },
            { title: "金三角", text: "包括鸦片博物馆 Hall of Opium。" },
            { title: "当地餐厅午餐", text: "" },
            { title: "清孔", text: "入住 Chiang Khong Teak Garden 或 Fortune Riverview。" },
          ],
        },
        {
          label: "第 4–5 天",
          title: "顺湄公河而下到琅勃拉邦",
          meals: "每天船上午餐",
          note: "",
          stops: [
            {
              title: "两天顺流游轮",
              text: "在北本住一晚，船上现做午餐并沿途停靠游览，与顺流游轮相同。",
            },
          ],
        },
      ],
      goodToKnow: [
        "请按船期选择抵达日：周二、周四或周日。",
        "可加订清迈当地游览，或为您定制行程。",
      ],
      packages: {},
      extras: ["清迈游览和短途行程", "定制行程"],
      seo: {
        title: "清迈到琅勃拉邦慢船之旅：五天行程",
        description:
          "五天从清迈到琅勃拉邦：白庙、金三角、清孔住一晚，再经北本乘两天湄公河游轮。{from}。",
      },
    },

    "nan-to-luang-prabang": {
      name: "难府至琅勃拉邦：陆路 + 河上",
      shortName: "陆路 + 游轮 · 难府 → 琅勃拉邦",
      bookTitle: "预订陆路 + 游轮行程",
      summary: "四天行程：从泰国北部的难府出发，经会孔口岸到北本，再沿湄公河航行一天到琅勃拉邦。",
      duration: "4 天 3 晚",
      departuresLabel: "抵达难府",
      departuresNote: "",
      minimum: "",
      priceOnRequest: "价格请咨询：发邮件给我们，我们会给您报价。",
      options: {},
      included: [
        "曼谷 → 难府单程经济舱机票（托运 15 公斤，手提 7 公斤）",
        "按行程安排的接送和游览，配英语导游（老挝边境至北本段仅司机）",
        "行程中注明的餐食",
        "门票",
        "难府和北本的三星酒店",
        "北本 → 琅勃拉邦一天游轮，含午餐、饮品，并停靠村庄和帕乌洞",
        "琅勃拉邦码头送至市中心",
      ],
      notIncluded: [],
      itinerary: [
        {
          label: "第 1 天",
          title: "抵达难府",
          meals: "",
          note: "",
          stops: [
            { title: "难府机场接机", text: "送往市中心酒店。" },
            { title: "下午参观难府最具代表性的寺庙", text: "" },
            { title: "夜市", text: "数百个摊位，有美食、当地纪念品和手工艺品。" },
          ],
        },
        {
          label: "第 2 天",
          title: "市场、村庄和农场午餐",
          meals: "早餐、午餐",
          note: "",
          stops: [
            { title: "当地市场和村庄", text: "包括鸡舍桑拿和按摩体验。" },
            { title: "在农场享用泰北风味午餐", text: "" },
            { title: "下午自由活动", text: "" },
          ],
        },
        {
          label: "第 3 天",
          title: "过境前往北本",
          meals: "早餐、午餐",
          note: "出发前您必须在本国或曼谷的老挝使馆办好老挝签证，并注明将从沙耶武里省孟恩（Muang Ngeun）入境。",
          stops: [
            {
              title: "穿过农田和稻田",
              text: "途经普阿县（Pua）并在当地餐厅午餐，体验泰国社区旅游的一天。",
            },
            {
              title: "会孔口岸",
              text: "办理泰国出境手续后，由老挝司机陪您办理老挝入境。",
            },
            {
              title: "北本",
              text: "约 55 公里、一小时左右车程，到达这座河边小村里您选定的酒店。",
            },
          ],
        },
        {
          label: "第 4 天",
          title: "乘船从北本到琅勃拉邦",
          meals: "早餐、船上午餐",
          note: "",
          stops: [
            { title: "登上 Nagi of Mekong", text: "一天的顺流航程。" },
            { title: "河边村庄和帕乌洞", text: "" },
            { title: "琅勃拉邦", text: "下午抵达，送往市中心酒店。" },
          ],
        },
      ],
      goodToKnow: ["此线路必须提前办好老挝签证。", "难府抵达日：周一、周三或周五。"],
      packages: {},
      extras: [],
      seo: {
        title: "难府经北本到琅勃拉邦：四天行程",
        description: "四天从泰国北部的难府经会孔口岸、北本，再乘船一天到琅勃拉邦。",
      },
    },
  },
};

export default zh;
