// 1분(또는 1단위)을 만들 때 드는 대략적 비용 데이터.
// 계산식: 플랜 월 요금(usd) × 1분당 소모량(creditsPerMin) ÷ 플랜 월 제공량(credits)
// 모두 공개 자료 기준의 '추정치'이며 모델·화질·시기에 따라 달라집니다. (확인일 2026.10.07)
const COST_FX = { KRW: 1400 }; // 원화 환산용 환율 가정(1달러=1,400원)

const COST_GROUPS = [
  {
    id: "video",
    tab: "영상 1분",
    title: "영상 1분 만들기",
    unit: "1분 영상",
    retryLabel: "마음에 들 때까지 평균 생성 횟수",
    modes: { basic: "기본 화질", high: "고화질" },
    lead: "구독료 말고 '1분짜리를 뽑는 데 얼마 드나'로 비교했습니다. 화질을 올리면 같은 서비스도 몇 배 비싸집니다.",
    items: [
      { name: "Higgsfield", category: "영상", basis: { basic: "Kling 3.0 · 8초 1080p ≈ 20크레딧(공식 블로그 예시)", high: "Kling 3.0 · 8초 1080p ≈ 20크레딧(공식 블로그 예시)" },
        creditsPerMin: { basic: 150, high: 150 },
        plans: [{ name: "Starter", usd: 15, credits: 200 }, { name: "Plus", usd: 39, credits: 1000 }, { name: "Ultra", usd: 99, credits: 3000 }] },
      { name: "Hedra", category: "영상", basis: { basic: "Character-3(말하는 캐릭터) 6크레딧/초", high: "Character-3(말하는 캐릭터) 6크레딧/초" },
        creditsPerMin: { basic: 360, high: 360 },
        plans: [{ name: "Basic", usd: 15, credits: 1500 }, { name: "Creator", usd: 30, credits: 5400 }, { name: "Pro", usd: 75, credits: 14400 }] },
      { name: "Runway", category: "영상", basis: { basic: "Gen-4 Turbo 5크레딧/초", high: "Gen-4 12크레딧/초" },
        creditsPerMin: { basic: 300, high: 720 },
        plans: [{ name: "Standard", usd: 15, credits: 625 }, { name: "Pro", usd: 35, credits: 2250 }, { name: "Max", usd: 95, credits: 9500 }] },
      { name: "Kling", category: "영상", basis: { basic: "표준 모드 · 5초 10크레딧", high: "프로 모드 · 5초 35크레딧" },
        creditsPerMin: { basic: 120, high: 420 },
        plans: [{ name: "Standard", usd: 10, credits: 660 }, { name: "Pro", usd: 37, credits: 3000 }, { name: "Premier", usd: 92, credits: 8000 }, { name: "Ultra", usd: 180, credits: 26000 }] },
      { name: "Luma Dream Machine", category: "영상", basis: { basic: "Ray3.2 720p · 5초 100크레딧", high: "Ray3.2 1080p · 5초 400크레딧" },
        creditsPerMin: { basic: 1200, high: 4800 },
        plans: [{ name: "Plus", usd: 30, credits: 10000 }, { name: "Pro", usd: 90, credits: 40000 }, { name: "Ultra", usd: 300, credits: 150000 }] },
      { name: "Pika", category: "영상", basis: { basic: "Pika 2.5 720p · 5초 20크레딧", high: "Pika 2.5 1080p · 5초 40크레딧" },
        creditsPerMin: { basic: 240, high: 480 },
        plans: [{ name: "Starter", usd: 10, credits: 900 }, { name: "Creator", usd: 35, credits: 3150 }, { name: "Fancy", usd: 95, credits: 8550 }] }
    ],
    notes: [
      "크레딧 소모량은 5~10초 클립 기준 공개 자료를 1분(60초)으로 환산했습니다.",
      "서비스마다 모델·화질·음성 포함 여부가 달라 '정확한 1:1 비교'가 아니라 규모 감각을 보는 용도입니다.",
      "Hedra는 말하는 캐릭터 영상, 나머지는 일반 영상 생성 기준입니다."
    ],
    sources: [
      ["Runway 요금·크레딧", "https://eesel.ai/blog/runway-ai-pricing"],
      ["Kling 크레딧", "https://www.atlascloud.ai/blog/guides/kling-ai-pricing"],
      ["Luma 크레딧", "https://lumalabs.ai/learning-hub/dream-machine-support-pricing-information"],
      ["Pika 크레딧", "https://www.hooked.so/compare/pika-pricing"],
      ["Hedra 크레딧", "https://hedra.com/docs/pages/studio/billing/how-credits-work"],
      ["Higgsfield 요금", "https://higgsfield.ai/blog/credits-vs-unlimited-ai-video-generation"]
    ]
  },
  {
    id: "speech",
    tab: "음성 1분",
    title: "AI 음성(TTS) 1분 만들기",
    unit: "1분 음성",
    retryLabel: "마음에 들 때까지 평균 생성 횟수",
    modes: { basic: "기본" },
    lead: "글을 목소리로 바꾸는 서비스는 영상보다 훨씬 저렴합니다. 대신 말투를 고르려고 여러 번 다시 만들게 되니 횟수를 곱해 보세요.",
    items: [
      { name: "ElevenLabs", category: "음성·음악", basis: { basic: "1,000크레딧 ≈ 1분(10,000크레딧 ≈ 10분)" },
        creditsPerMin: { basic: 1000 },
        plans: [{ name: "Starter", usd: 6, credits: 30000 }, { name: "Creator", usd: 22, credits: 121000 }, { name: "Pro", usd: 99, credits: 600000 }] },
      { name: "Fish Audio", category: "음성·음악", basis: { basic: "Plus: 월 최대 약 200분(S1 모델 기준)" },
        creditsPerMin: { basic: 1250 },
        plans: [{ name: "Plus", usd: 15, credits: 250000 }] },
      { name: "Typecast", category: "음성·음악", basis: { basic: "비즈니스: 월 약 410분(한국어), ₩99,000 환산" },
        creditsPerMin: { basic: 1 },
        plans: [{ name: "비즈니스", usd: 99000 / 1400, credits: 410 }] }
    ],
    notes: [
      "Fish Audio Plus는 월 $11로 나온 자료도 있어 실제 비용이 더 낮을 수 있습니다. Pro 이상은 제공량을 확인하지 못해 뺐습니다.",
      "Typecast의 베이직·플러스·프로 플랜은 월 제공 분량을 확인하지 못해 비즈니스만 넣었습니다."
    ],
    sources: [
      ["ElevenLabs 요금", "https://elevenlabs.io/pricing"],
      ["Fish Audio 요금", "https://smallest.ai/blog/fish-audio-pricing-plans-api-billing-commercial-use-in-2026"],
      ["Typecast 요금제 개편", "https://typecast.ai/kr/learn/typecast-pricing-plan-update-forbiz-2608"]
    ]
  },
  {
    id: "music",
    tab: "음악 1분",
    title: "AI 음악 1분 만들기",
    unit: "1분 음악",
    retryLabel: "마음에 드는 곡이 나올 때까지 평균 생성 횟수",
    modes: { basic: "기본" },
    lead: "곡 한 번 생성하는 값은 거의 공짜 수준이지만, 마음에 드는 곡을 고르려면 여러 번 뽑게 됩니다.",
    items: [
      { name: "Suno", category: "음성·음악", basis: { basic: "곡당 5크레딧, 평균 3분 곡 가정(≈ 1.7크레딧/분)" },
        creditsPerMin: { basic: 5 / 3 },
        plans: [{ name: "Pro", usd: 8, credits: 2500 }, { name: "Premier", usd: 24, credits: 10000 }] }
    ],
    notes: [
      "곡 길이는 보통 2~4분이라 3분으로 가정했습니다.",
      "상업 이용 범위와 저작권 분쟁은 요금과 별개로 따로 확인해야 합니다."
    ],
    sources: [["Suno 크레딧", "https://help.suno.com/en/articles/2410049"]]
  },
  {
    id: "meeting",
    tab: "회의 기록 1분",
    title: "회의·녹음 1분 기록하기",
    unit: "1분 기록",
    retryLabel: null,
    modes: { basic: "기본" },
    lead: "받아쓰기·회의록 서비스는 '월 제공 분량' 기준으로 1분당 값을 계산했습니다. 많이 쓸수록 싸집니다.",
    items: [
      { name: "클로바노트", category: "녹음·회의록", basis: { basic: "기업용 Lite 월 6,000분(₩20,000 환산)" },
        creditsPerMin: { basic: 1 }, plans: [{ name: "기업용 Lite", usd: 20000 / 1400, credits: 6000 }] },
      { name: "Tiro", category: "녹음·회의록", basis: { basic: "Lite 300분 · Pro 1,000분(Max는 무제한이라 제외)" },
        creditsPerMin: { basic: 1 }, plans: [{ name: "Lite", usd: 7, credits: 300 }, { name: "Pro", usd: 13, credits: 1000 }] },
      { name: "Notta", category: "녹음·회의록", basis: { basic: "Pro 월 1,800분(Business는 무제한이라 제외)" },
        creditsPerMin: { basic: 1 }, plans: [{ name: "Pro", usd: 13.61, credits: 1800 }] }
    ],
    notes: ["무제한 플랜은 1분당 값을 계산할 수 없어 뺐습니다. 월 제공 분량을 전부 쓴다고 가정한 값입니다."],
    sources: []
  }
];
