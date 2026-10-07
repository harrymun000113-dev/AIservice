// 자동 생성 파일 (tools/xlsx_to_services.py). 직접 수정하지 말고 엑셀을 고친 뒤 다시 생성하세요.
const CATEGORIES = ["리서치", "글쓰기", "이미지 생성", "영상", "음성·음악", "녹음·회의록", "시각화·PPT", "웹·UI/UX 디자인", "AI 만화·스토리보드", "업무 자동화"];
const SERVICES = [
 {
  "id": "chatgpt-research",
  "group": "chatgpt",
  "no": 1,
  "name": "ChatGPT",
  "category": "리서치",
  "desc": "OpenAI의 대표 범용 AI 챗봇",
  "url": "https://chatgpt.com/",
  "pros": [
   "추론 능력이 뛰어나고 활용 범위가 넓음",
   "딥 리서치로 여러 웹 자료를 모아 보고서 작성 가능"
  ],
  "cons": [
   "할루시네이션(그럴듯한 오답)이 있어 사실 확인 필요",
   "무료는 고급 모델·딥 리서치 사용량 제한"
  ],
  "use": "주제 탐색, 자료 조사 후 보고서 정리, 아이디어 정리",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Go 약 $8 / Plus $20 / Pro $100~200"
  ],
  "priceNotes": [],
  "minPaidUSD": 8.0,
  "researchedOnly": false
 },
 {
  "id": "grok-research",
  "group": "grok",
  "no": 2,
  "name": "Grok",
  "category": "리서치",
  "desc": "X(트위터) 실시간 정보에 강한 AI",
  "url": "https://grok.com/",
  "pros": [
   "X와 연동되어 최신 이슈 파악에 강함"
  ],
  "cons": [
   "답변이 상대적으로 간소함",
   "특정 분야에서 두드러진 강점은 없음"
  ],
  "use": "리서치, 트렌드 파악",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "SuperGrok Lite $10 / SuperGrok $30 / Heavy $300"
  ],
  "priceNotes": [
   "연 결제 시 약 17% 할인, X Premium+($40)에도 포함"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "perplexity-research",
  "group": "perplexity",
  "no": 3,
  "name": "Perplexity",
  "category": "리서치",
  "desc": "답변마다 출처를 달아 주는 AI 검색 엔진",
  "url": "https://www.perplexity.ai/",
  "pros": [
   "실시간 웹 검색 결과를 요약하고 문장마다 출처 링크를 붙여 검증이 쉬움",
   "학술·소셜 등 검색 범위 선택 가능"
  ],
  "cons": [
   "출처를 잘못 요약하거나 질 낮은 출처를 인용할 때가 있어 원문 확인 필요",
   "긴 글쓰기·창작에는 약함"
  ],
  "use": "최신 정보 검색, 출처가 필요한 자료 조사, 팩트 체크",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $20 / Max $200"
  ],
  "priceNotes": [
   "연 결제 시 Pro 월 약 $16.67, 학생·교육자 Pro $10"
  ],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "gemini-research",
  "group": "gemini",
  "no": 4,
  "name": "Gemini",
  "category": "리서치",
  "desc": "구글 검색·서비스와 연동되는 구글의 AI",
  "url": "https://gemini.google.com/app?hl=ko",
  "pros": [
   "구글 검색 기반으로 최신 정보에 강함",
   "긴 문서·영상도 한 번에 처리 가능",
   "딥 리서치 기능 제공, 무료 사용량이 넉넉함"
  ],
  "cons": [
   "안전장치가 과해 답변을 거절하는 경우가 있음",
   "할루시네이션 있음"
  ],
  "use": "자료 조사, 긴 PDF·유튜브 영상 요약, 구글 문서·지메일 연동 작업",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Google AI Plus $7.99 / Pro $19.99 / Ultra $99.99~"
  ],
  "priceNotes": [],
  "minPaidUSD": 7.99,
  "researchedOnly": false
 },
 {
  "id": "felo-research",
  "group": "felo",
  "no": 5,
  "name": "Felo",
  "category": "리서치",
  "desc": "연구·학술 중심 AI 검색 엔진",
  "url": "https://felo.ai/ko/search",
  "pros": [
   "Claude, GPT, DeepSeek 등 다양한 최신 모델 사용 가능"
  ],
  "cons": [
   "무료는 고급 검색 횟수 제한"
  ],
  "use": "학술 자료 검색, 검색 결과로 PPT·마인드맵 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $14.99"
  ],
  "priceNotes": [
   "연 결제 시 할인"
  ],
  "minPaidUSD": 14.99,
  "researchedOnly": false
 },
 {
  "id": "genspark-research",
  "group": "genspark",
  "no": 6,
  "name": "Genspark",
  "category": "리서치",
  "desc": "검색 결과를 한 페이지 보고서로 정리해 주는 AI 에이전트",
  "url": "https://www.genspark.ai/",
  "pros": [
   "여러 출처를 모아 정리된 페이지로 만들어 줌",
   "자료 조사·슬라이드 제작 등 작업까지 대행"
  ],
  "cons": [
   "무료 크레딧이 빨리 소진됨",
   "다운로드 및 수정이 제한적임"
  ],
  "use": "주제 조사 후 보고서·자료 정리",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus $24.99 / Pro $249.99"
  ],
  "priceNotes": [
   "연 결제 시 Plus $19.99, Pro $199.99"
  ],
  "minPaidUSD": 24.99,
  "researchedOnly": false
 },
 {
  "id": "liner-research",
  "group": "liner",
  "no": 7,
  "name": "라이너 (Liner)",
  "category": "리서치",
  "desc": "신뢰도 높은 출처 중심의 국산 AI 검색",
  "url": "https://liner.com/ko",
  "pros": [
   "논문 등 학술 출처 위주로 답변함",
   "한국어 지원이 좋음"
  ],
  "cons": [
   "일반 상식·최신 뉴스 검색에는 약함"
  ],
  "use": "과제·논문 자료 조사, 브레인스토밍, 데이터 분석",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $17.99 / Max $35.99"
  ],
  "priceNotes": [
   "연 결제 시 Pro $14.99, Max $29.99"
  ],
  "minPaidUSD": 17.99,
  "researchedOnly": false
 },
 {
  "id": "storm-research",
  "group": "storm",
  "no": 8,
  "name": "Storm",
  "category": "리서치",
  "desc": "주제를 넣으면 위키백과식 장문 리포트를 써 주는 스탠퍼드 연구 프로젝트",
  "url": "https://storm.genie.stanford.edu/",
  "pros": [
   "출처가 달린 긴 개요·리포트를 자동 생성함"
  ],
  "cons": [
   "영어 위주임",
   "생성 속도가 느림"
  ],
  "use": "주제 개요 파악, 리포트 초안 작성",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "무료"
  ],
  "priceNotes": [],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "consensus-research",
  "group": "consensus",
  "no": 9,
  "name": "Consensus",
  "category": "리서치",
  "desc": "논문을 근거로 답해 주는 학술 검색 AI",
  "url": "https://consensus.app/",
  "pros": [
   "실제 논문만 근거로 사용함",
   "연구 결과의 찬반 경향까지 보여 줌"
  ],
  "cons": [
   "관련 논문이 없는 주제는 답변 불가"
  ],
  "use": "논문 찾기, 과학적 근거 확인, 석·박사 논문 작성, 주식 차트 분석",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $20 / Deep $65"
  ],
  "priceNotes": [
   "연 결제 시 Pro $12, Deep $45"
  ],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "notebooklm-research",
  "group": "notebooklm",
  "no": 10,
  "name": "노트북LM (NotebookLM)",
  "category": "리서치",
  "desc": "내가 올린 자료만 바탕으로 답해 주는 구글 AI 노트",
  "url": "https://notebooklm.google.com/",
  "pros": [
   "올린 PDF·링크·영상 안에서만 답해 할루시네이션이 적음",
   "오디오 요약(팟캐스트) 기능 제공"
  ],
  "cons": [
   "웹 검색 기능이 제한적임"
  ],
  "use": "강의 자료·논문 요약, 시험 공부",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "단독 판매 없음, Google AI 구독에 포함",
   "Google AI Plus $7.99 / Pro $19.99 / Ultra $99.99~"
  ],
  "priceNotes": [],
  "minPaidUSD": 7.99,
  "researchedOnly": false
 },
 {
  "id": "alphaxiv-research",
  "group": "alphaxiv",
  "no": 11,
  "name": "AlphaXiv",
  "category": "리서치",
  "desc": "arXiv 논문을 AI와 함께 읽는 사이트",
  "url": "https://www.alphaxiv.org/",
  "pros": [
   "논문 요약·질문 가능",
   "다른 연구자의 코멘트 확인 가능"
  ],
  "cons": [
   "arXiv(주로 이공계) 논문만 대상으로 함"
  ],
  "use": "이공계 논문 읽기",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "무료"
  ],
  "priceNotes": [],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "chatgpt-writing",
  "group": "chatgpt",
  "no": 12,
  "name": "ChatGPT",
  "category": "글쓰기",
  "desc": "OpenAI의 대표 범용 AI 챗봇",
  "url": "https://chatgpt.com/",
  "pros": [
   "문체·분량 조절이 자유롭고 초안부터 교정·요약까지 한 번에 가능",
   "이미지 생성 등 부가 기능이 풍부함"
  ],
  "cons": [
   "특유의 AI 문체가 남아 다듬기 필요",
   "할루시네이션 있음"
  ],
  "use": "보고서·자기소개서·이메일 초안, 글 다듬기·요약",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Go 약 $8 / Plus $20 / Pro $100~200"
  ],
  "priceNotes": [],
  "minPaidUSD": 8.0,
  "researchedOnly": false
 },
 {
  "id": "claude-writing",
  "group": "claude",
  "no": 13,
  "name": "Claude",
  "category": "글쓰기",
  "desc": "자연스러운 문장과 긴 글에 강한 AI",
  "url": "https://claude.ai/",
  "pros": [
   "사람이 쓴 듯한 자연스러운 문체",
   "긴 문서 읽기·코딩에 강함"
  ],
  "cons": [
   "무료는 사용량 제한이 빡빡함"
  ],
  "use": "에세이, 보고서, 긴 글 작성·교정",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $20 (연 결제 시 월 $17)",
   "Max $100~"
  ],
  "priceNotes": [],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "grok-writing",
  "group": "grok",
  "no": 14,
  "name": "Grok",
  "category": "글쓰기",
  "desc": "X(트위터) 실시간 정보에 강한 AI",
  "url": "https://grok.com/",
  "pros": [
   "검열이 덜하고 말투가 자유로움"
  ],
  "cons": [
   "답변이 상대적으로 간소함"
  ],
  "use": "SNS 글, 캐주얼한 글",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "SuperGrok Lite $10 / SuperGrok $30 / Heavy $300"
  ],
  "priceNotes": [
   "연 결제 시 약 17% 할인, X Premium+($40)에도 포함"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "gemini-writing",
  "group": "gemini",
  "no": 15,
  "name": "Gemini",
  "category": "글쓰기",
  "desc": "구글 검색·서비스와 연동되는 구글의 AI",
  "url": "https://gemini.google.com/app?hl=ko",
  "pros": [
   "무료로도 긴 글 처리 가능",
   "구글 문서·지메일에서 바로 글쓰기 보조 가능"
  ],
  "cons": [
   "검열이 다소 있음",
   "문체가 평이해 창의적인 글에는 약함"
  ],
  "use": "정보 전달형 글, 요약·정리, 구글 문서 작업",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Google AI Plus $7.99 / Pro $19.99 / Ultra $99.99~"
  ],
  "priceNotes": [],
  "minPaidUSD": 7.99,
  "researchedOnly": false
 },
 {
  "id": "qwen-writing",
  "group": "qwen",
  "no": 16,
  "name": "Qwen",
  "category": "글쓰기",
  "desc": "알리바바의 오픈소스 AI",
  "url": "https://chat.qwen.ai/",
  "pros": [
   "무료로 고성능 모델 사용 가능",
   "다국어 지원"
  ],
  "cons": [
   "중국 기업 서비스라 개인정보 주의 필요"
  ],
  "use": "무료로 쓰는 범용 글쓰기",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "무료"
  ],
  "priceNotes": [
   "API는 사용량 과금"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "deepseek-writing",
  "group": "deepseek",
  "no": 17,
  "name": "DeepSeek",
  "category": "글쓰기",
  "desc": "저비용 고성능 추론 AI",
  "url": "https://chat.deepseek.com/",
  "pros": [
   "무료임에도 추론 능력이 좋음"
  ],
  "cons": [
   "중국 서버를 이용해 개인정보 주의 필요",
   "접속 지연이 잦음"
  ],
  "use": "논리적인 글, 수학·코딩 풀이",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "무료"
  ],
  "priceNotes": [
   "API는 사용량 과금"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "lechat-writing",
  "group": "lechat",
  "no": 18,
  "name": "Le Chat",
  "category": "글쓰기",
  "desc": "프랑스 Mistral의 빠른 AI 챗봇",
  "url": "https://chat.mistral.ai/",
  "pros": [
   "답변 속도가 매우 빠름",
   "유럽 기준의 개인정보 보호 적용"
  ],
  "cons": [
   "한국어 품질이 상위 모델보다 낮음"
  ],
  "use": "빠른 초안 작성, 번역",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $14.99 / Team 1인 $24.99"
  ],
  "priceNotes": [
   "학생 $5.99"
  ],
  "minPaidUSD": 14.99,
  "researchedOnly": false
 },
 {
  "id": "copilot-writing",
  "group": "copilot",
  "no": 19,
  "name": "Copilot",
  "category": "글쓰기",
  "desc": "마이크로소프트 오피스와 연동되는 AI",
  "url": "https://copilot.microsoft.com/",
  "pros": [
   "Word·PowerPoint·Outlook과 연동 가능"
  ],
  "cons": [
   "오피스 연동 기능은 유료"
  ],
  "use": "문서·이메일 작성, 오피스 작업",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Microsoft 365 Premium $19.99 (연 $199.99)"
  ],
  "priceNotes": [
   "Copilot Pro 단독 플랜은 판매 종료"
  ],
  "minPaidUSD": 19.99,
  "researchedOnly": false
 },
 {
  "id": "poe-writing",
  "group": "poe",
  "no": 20,
  "name": "Poe",
  "category": "글쓰기",
  "desc": "여러 AI 모델을 한곳에서 쓰는 플랫폼",
  "url": "https://poe.com/",
  "pros": [
   "GPT, Claude, Gemini 등을 하나의 앱에서 비교 사용 가능"
  ],
  "cons": [
   "포인트제라 고급 모델은 금방 소진됨"
  ],
  "use": "여러 모델의 답변 비교",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Starter $4.99 / Premium $19.99 / Premium Plus $49.99 / Pro $99.99 / Pro Max $249.99"
  ],
  "priceNotes": [],
  "minPaidUSD": 4.99,
  "researchedOnly": false
 },
 {
  "id": "clovanote-meeting",
  "group": "clovanote",
  "no": 21,
  "name": "클로바노트",
  "category": "녹음·회의록",
  "desc": "네이버의 한국어 음성 기록 AI",
  "url": "https://clovanote.naver.com/",
  "pros": [
   "한국어 인식률이 최상급임",
   "화자 구분·AI 요약 기능 제공"
  ],
  "cons": [
   "월 무료 사용 시간 제한"
  ],
  "use": "강의·회의 녹음, 한국어 회의록",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "개인 무료 (월 300분, 데이터 활용 동의 시 600분)",
   "기업용 Lite 1인 ₩20,000 (월 6,000분)"
  ],
  "priceNotes": [],
  "minPaidUSD": 14.29,
  "researchedOnly": false
 },
 {
  "id": "tiro-meeting",
  "group": "tiro",
  "no": 22,
  "name": "Tiro",
  "category": "녹음·회의록",
  "desc": "실시간 받아쓰기·회의록 자동 작성 AI",
  "url": "https://tiro.ooo/",
  "pros": [
   "실시간 전사 가능",
   "회의록 양식으로 자동 정리, 다국어 지원"
  ],
  "cons": [
   "무료 사용량이 적음"
  ],
  "use": "회의록, 인터뷰 기록",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Lite $7 (월 300분) / Pro $13 (월 1,000분) / Max $29 (무제한)"
  ],
  "priceNotes": [
   "연 결제 시 2개월 무료"
  ],
  "minPaidUSD": 7.0,
  "researchedOnly": false
 },
 {
  "id": "felo-meeting",
  "group": "felo",
  "no": 23,
  "name": "Felo",
  "category": "녹음·회의록",
  "desc": "실시간 번역·회의 기록 기능 제공",
  "url": "https://felo.ai/",
  "pros": [
   "실시간 통역·자막과 회의 내용 요약 제공"
  ],
  "cons": [
   "순수 녹음 앱보다 기능이 단순함"
  ],
  "use": "외국어 회의·강의",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $14.99"
  ],
  "priceNotes": [
   "연 결제 시 할인"
  ],
  "minPaidUSD": 14.99,
  "researchedOnly": false
 },
 {
  "id": "notta-meeting",
  "group": "notta",
  "no": 24,
  "name": "Notta",
  "category": "녹음·회의록",
  "desc": "줌·구글 미트 회의 자동 기록 AI",
  "url": "https://www.notta.ai/",
  "pros": [
   "온라인 회의에 봇이 들어가 자동 기록함",
   "58개 이상 언어 지원"
  ],
  "cons": [
   "무료는 녹음 시간이 짧음"
  ],
  "use": "화상회의 기록, 외국어 전사",
  "price": "유료",
  "priceDetail": "유료",
  "plans": [
   "Pro $13.61 (월 1,800분) / Business $27.78 (무제한)"
  ],
  "priceNotes": [
   "연 결제 시 Pro $8.17, Business $16.67"
  ],
  "minPaidUSD": 13.61,
  "researchedOnly": false
 },
 {
  "id": "notion-meeting",
  "group": "notion",
  "no": 25,
  "name": "Notion",
  "category": "녹음·회의록",
  "desc": "AI 회의 노트가 들어간 올인원 메모 툴",
  "url": "https://www.notion.so/",
  "pros": [
   "회의 녹음→요약→할 일 정리까지 한 페이지에서 가능"
  ],
  "cons": [
   "AI 회의 노트는 유료 요금제에서만 제공"
  ],
  "use": "팀 회의록, 기록 정리",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus 1인 $10 / Business 1인 $20"
  ],
  "priceNotes": [
   "연 결제 시 Plus $8, Business $16, AI 회의 노트는 Business부터"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "obsidian-meeting",
  "group": "obsidian",
  "no": 26,
  "name": "Obsidian",
  "category": "녹음·회의록",
  "desc": "내 컴퓨터에 저장하는 노트 앱",
  "url": "https://obsidian.md/",
  "pros": [
   "로컬 저장으로 개인정보가 안전함",
   "노트 간 연결 가능"
  ],
  "cons": [
   "녹음 전사 기능은 플러그인 필요"
  ],
  "use": "개인 지식 정리, 녹음 내용 정리",
  "price": "무료",
  "priceDetail": "무료 (동기화 유료)",
  "plans": [
   "Sync $5 / Publish $10"
  ],
  "priceNotes": [
   "연 결제 시 Sync $4, Publish $8"
  ],
  "minPaidUSD": 5.0,
  "researchedOnly": false
 },
 {
  "id": "claude-slides",
  "group": "claude",
  "no": 27,
  "name": "Claude",
  "category": "시각화·PPT",
  "desc": "대화로 글·문서·표를 만들어 주는 AI 챗봇",
  "url": "https://claude.ai",
  "pros": [
   "무료로도 Artifacts(문서·도표 등) 생성 가능",
   "Pro부터 Claude Design·Slides·Docs 사용 가능"
  ],
  "cons": [
   "무료는 사용량 제한이 있음"
  ],
  "use": "발표 대본·구성안 작성, 자료 요약",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $20 (연 결제 시 월 $17)",
   "Max $100~"
  ],
  "priceNotes": [],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "gamma-slides",
  "group": "gamma",
  "no": 28,
  "name": "Gamma",
  "category": "시각화·PPT",
  "desc": "주제를 입력하면 발표 자료를 만들어 주는 AI (웹페이지·문서도 가능)",
  "url": "https://gamma.app",
  "pros": [
   "발표 자료 외에 문서·소셜(캐러셀)·웹페이지·그래픽도 제작 가능",
   "한국어 화면 지원",
   "무료에서도 PNG·PDF·PPTX·Google Slides로 내보내기 가능"
  ],
  "cons": [
   "무료는 크레딧 580개(가입 보너스 500 포함)로 제한",
   "이미지 생성 시에도 크레딧이 소모됨",
   "무료는 'Gamma로 제작' 배지가 붙고, 숨기기는 Plus부터 가능"
  ],
  "use": "발표 PPT 초안 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus $9 (월 1,000크레딧) / Pro $18 (월 4,000) / Ultra $90 (월 20,000)"
  ],
  "priceNotes": [
   "연 결제 기준"
  ],
  "minPaidUSD": 9.0,
  "researchedOnly": false
 },
 {
  "id": "canva-slides",
  "group": "canva",
  "no": 29,
  "name": "Canva",
  "category": "시각화·PPT",
  "desc": "템플릿으로 발표 자료·포스터·SNS 이미지를 만드는 디자인 사이트",
  "url": "https://www.canva.com",
  "pros": [
   "템플릿 160만 개 이상 제공",
   "드래그 앤 드롭 편집, 무료 저장 공간 5GB 제공"
  ],
  "cons": [
   "무료는 AI 기능 20회로 제한",
   "유료 소재·브랜드 키트·AI 확대는 Pro부터 가능"
  ],
  "use": "발표 자료 디자인, 카드뉴스, 포스터",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro 연 $144 (월 약 $12)",
   "Business 1인 연 $250 (월 약 $21)"
  ],
  "priceNotes": [],
  "minPaidUSD": 12.0,
  "researchedOnly": false
 },
 {
  "id": "napkin-slides",
  "group": "napkin",
  "no": 30,
  "name": "Napkin",
  "category": "시각화·PPT",
  "desc": "텍스트를 도식·인포그래픽으로 바꿔 주는 AI",
  "url": "https://www.napkin.ai",
  "pros": [
   "텍스트를 넣으면 시각 자료로 바로 변환됨"
  ],
  "cons": [
   "무료는 PNG·PDF로만 저장되고 로고가 붙음(주 500크레딧)",
   "PPT·SVG 저장과 로고 제거는 Plus부터 가능"
  ],
  "use": "보고서·발표 자료용 도식",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus $9 / Pro $22"
  ],
  "priceNotes": [],
  "minPaidUSD": 9.0,
  "researchedOnly": false
 },
 {
  "id": "felo-slides",
  "group": "felo",
  "no": 31,
  "name": "Felo",
  "category": "시각화·PPT",
  "desc": "AI 검색과 슬라이드·마인드맵·문서·이미지·웹페이지 생성 기능 제공",
  "url": "https://felo.ai",
  "pros": [
   "여러 언어로 검색하고 결과를 슬라이드·마인드맵으로 제작 가능",
   "무료로 이용 가능"
  ],
  "cons": [
   "고급 기능은 유료 플랜 필요"
  ],
  "use": "자료 조사 후 슬라이드·마인드맵 정리",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $14.99"
  ],
  "priceNotes": [
   "연 결제 시 할인"
  ],
  "minPaidUSD": 14.99,
  "researchedOnly": false
 },
 {
  "id": "mapify-slides",
  "group": "mapify",
  "no": 32,
  "name": "Mapify",
  "category": "시각화·PPT",
  "desc": "PDF·유튜브·웹페이지·오디오를 마인드맵으로 바꾸는 도구",
  "url": "https://mapify.so",
  "pros": [
   "웹·확장 프로그램·iOS·안드로이드 모두 이용 가능",
   "학생 30% 할인 제공"
  ],
  "cons": [
   "무료는 크레딧 30개(1회성), PDF·유튜브 각 5개까지만 변환 가능",
   "유료 크레딧은 다음 달로 이월되지 않음"
  ],
  "use": "강의 영상·논문·보고서 요약",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Basic $5.99 / Pro $11.99 / Unlimited $17.99"
  ],
  "priceNotes": [
   "연 결제 기준 월 환산"
  ],
  "minPaidUSD": 5.99,
  "researchedOnly": false
 },
 {
  "id": "aippt-slides",
  "group": "aippt",
  "no": 33,
  "name": "Aippt",
  "category": "시각화·PPT",
  "desc": "주제·문서를 넣으면 PPT로 만들어 주는 AI",
  "url": "https://www.aippt.com",
  "pros": [
   "PDF·Word·Excel·이미지·URL 입력 가능",
   "PPTX·PDF·이미지로 저장 가능, 대화로 수정 가능"
  ],
  "cons": [
   "무료는 크레딧 140개(1회성), AI 생성 10장까지만 가능"
  ],
  "use": "자료를 PPT로 변환",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus (월 600크레딧) / Pro (월 1,200크레딧)"
  ],
  "priceNotes": [
   "금액 표기 없음"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "anifusion-comic",
  "group": "anifusion",
  "no": 34,
  "name": "Anifusion",
  "category": "AI 만화·스토리보드",
  "desc": "컷 틀·말풍선 기능을 갖춘 AI 만화·웹툰 제작 도구",
  "url": "https://anifusion.ai",
  "pros": [
   "2·3·4컷 틀과 말풍선 도구 제공",
   "가입 시 100크레딧 지급(카드 불필요), 안 쓴 크레딧은 유지됨"
  ],
  "cons": [
   "영어 사이트라 번역 필요",
   "100크레딧은 가입 시 1회 지급되며 갱신 안내 없음",
   "저장(내보내기)은 유료"
  ],
  "use": "웹툰·만화 샘플 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Creator $9 (2,000크레딧)",
   "Pro $24 (10,000크레딧)"
  ],
  "priceNotes": [
   "연 결제 시 17% 할인"
  ],
  "minPaidUSD": 9.0,
  "researchedOnly": false
 },
 {
  "id": "novelai-comic",
  "group": "novelai",
  "no": 35,
  "name": "Novel AI",
  "category": "AI 만화·스토리보드",
  "desc": "애니풍 이미지·소설 생성 AI",
  "url": "https://novelai.net",
  "pros": [
   "애니풍 그림에 특화됨",
   "이미지 무료 체험 30회 제공",
   "캐릭터 유지·부분 수정 기능 제공"
  ],
  "cons": [
   "영어 사이트라 번역 필요",
   "체험 후에는 구독이나 Anlas 구매 필요(4장 생성에 104 Anlas, Tablet 월 1,000 Anlas로 약 9회)",
   "단어(태그) 형식 프롬프트만 잘 반영됨",
   "한 장에 여러 컷을 넣으면 그림이 뭉개지고 글자가 깨져 장면을 하나씩 생성해야 함"
  ],
  "use": "애니풍 일러스트·캐릭터 그림",
  "price": "유료",
  "priceDetail": "유료",
  "plans": [
   "Tablet $10 (월 1,000 Anlas) / Scroll $15 / Opus $25 (월 10,000 Anlas, 이미지 무제한)"
  ],
  "priceNotes": [
   "구독 없이 Anlas만 구매 가능"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "storytribe-comic",
  "group": "storytribe",
  "no": 36,
  "name": "StoryTribe",
  "category": "AI 만화·스토리보드",
  "desc": "아이디어·대본을 컷별 스토리보드로 나눠 주는 사이트",
  "url": "https://www.storytribeapp.com",
  "pros": [
   "아이디어·장면·대본을 넣고 'Break it down'을 누르면 컷으로 나뉨",
   "스타일 28개 제공",
   "캐릭터·장소를 저장해 재사용 가능"
  ],
  "cons": [
   "영어 사이트라 번역 필요",
   "컷당 20크레딧 소모(무료 100크레딧으로 약 5컷)",
   "무료는 프로젝트당 10컷까지, 저장 시 워터마크가 붙음",
   "크레딧 추가 구매는 Pro부터 가능"
  ],
  "use": "영상·광고 콘티, 캐릭터 컷 구성",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $12.99 (월 1,500크레딧) / Studio 1인 $23 (월 2,500크레딧)",
   "추가 크레딧 $30에 3,500개"
  ],
  "priceNotes": [
   "연 결제 기준"
  ],
  "minPaidUSD": 12.99,
  "researchedOnly": false
 },
 {
  "id": "figma-webdesign",
  "group": "figma",
  "no": 37,
  "name": "Figma",
  "category": "웹·UI/UX 디자인",
  "desc": "실시간 협업 기반의 대표 UI/UX 디자인·프로토타이핑 플랫폼",
  "url": "https://www.figma.com/",
  "pros": [
   "방대한 플러그인 생태계와 직관적인 인터페이스",
   "웹 기반으로 실시간 협업 환경이 뛰어남"
  ],
  "cons": [
   "오프라인 사용 불가",
   "프로젝트 규모가 커질수록 브라우저 메모리 관리 필요"
  ],
  "use": "UI 레이아웃 설계, 3D 에셋 연동·애니메이션 트리거를 활용한 인터랙티브 프로토타이핑",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Professional 1인 $15 / Organization 1인 $45~"
  ],
  "priceNotes": [
   "연 결제 시 Professional $12"
  ],
  "minPaidUSD": 15.0,
  "researchedOnly": false
 },
 {
  "id": "ugic-webdesign",
  "group": "ugic",
  "no": 38,
  "name": "Ugic",
  "category": "웹·UI/UX 디자인",
  "desc": "Figma 안에서 프롬프트로 편집 가능한 UI 초안을 생성하는 AI 플러그인",
  "url": "https://ugic.ai/",
  "pros": [
   "기존 디자인 시스템(컴포넌트 라이브러리)을 유지한 채 일관성 있는 초안을 빠르게 생성함"
  ],
  "cons": [
   "Figma 환경에서만 사용 가능",
   "생성 후 디자이너의 레이아웃 검수·세부 수정 필수"
  ],
  "use": "초기 화면 구조 설계, 앱·웹 UI 초안의 빠른 생성",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "공식 가격 미공개"
  ],
  "priceNotes": [
   "사이트에서 직접 확인 필요"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "creatie-webdesign",
  "group": "creatie",
  "no": 39,
  "name": "Creatie",
  "category": "웹·UI/UX 디자인",
  "desc": "Figma와 유사한 환경에 AI를 결합해 스타일 가이드 구축·3D 아이콘 생성을 돕는 툴",
  "url": "https://creatie.ai/",
  "pros": [
   "파일 호환성이 뛰어남",
   "더미 데이터 삽입·디자인 가이드 구축 등 반복 작업을 AI로 크게 단축함"
  ],
  "cons": [
   "선두 툴에 비해 서드파티 생태계·플러그인 커뮤니티가 부족함"
  ],
  "use": "새 프로젝트의 스타일 가이드 구축, 아이콘 대량 생성",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "공식 가격 미공개"
  ],
  "priceNotes": [
   "사이트에서 직접 확인 필요",
   "베타·프로모션 기간 무료 제공"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "wegic-webdesign",
  "group": "wegic",
  "no": 40,
  "name": "Wegic",
  "category": "웹·UI/UX 디자인",
  "desc": "대화(프롬프트)만으로 맞춤형 웹사이트를 몇 분 만에 구축하는 AI 웹 팀",
  "url": "https://wegic.ai/",
  "pros": [
   "코딩·디자인 지식 없이 대화만으로 반응형 웹사이트 구축 가능"
  ],
  "cons": [
   "복잡한 기능 연동이나 세밀한 백엔드 코딩이 필요한 대형 플랫폼 개발에는 한계가 있음"
  ],
  "use": "브랜드 랜딩 페이지, 포트폴리오, 행사 홍보 페이지의 빠른 오픈",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Starter $39.90 / Premium $69.90"
  ],
  "priceNotes": [
   "연 결제 시 Starter $23.90, Premium $41.90, 체험팩 $2.99"
  ],
  "minPaidUSD": 39.9,
  "researchedOnly": false
 },
 {
  "id": "framer-webdesign",
  "group": "framer",
  "no": 41,
  "name": "Framer",
  "category": "웹·UI/UX 디자인",
  "desc": "디자인한 캔버스를 코딩 없이 반응형 웹사이트로 바로 발행하는 노코드 빌더",
  "url": "https://www.framer.com/",
  "pros": [
   "시각적 디자인만으로 즉시 웹 호스팅 가능",
   "부드러운 애니메이션 구현에 탁월함"
  ],
  "cons": [
   "데이터베이스 기반의 복잡한 백엔드보다 프론트엔드 비주얼에 기능이 치중됨"
  ],
  "use": "인터랙션·애니메이션 중심의 마케팅 웹사이트, 반응형 포트폴리오 사이트",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Basic $10 / Pro $30"
  ],
  "priceNotes": [
   "연 결제 시 무료 도메인 제공"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "dora-webdesign",
  "group": "dora",
  "no": 42,
  "name": "Dora",
  "category": "웹·UI/UX 디자인",
  "desc": "코딩 없이 3D 애니메이션·스크롤 인터랙션 중심 웹사이트를 만드는 디자인 툴",
  "url": "https://dora.run/",
  "pros": [
   "WebGL 코딩 없이 3D 에셋을 웹에 올리고 화려한 스크롤 애니메이션 구현 가능"
  ],
  "cons": [
   "3D·인터랙션에 특화되어 텍스트 위주 블로그나 정보 대시보드 제작에는 부적합함"
  ],
  "use": "3D 모델을 활용한 몰입형 제품 소개 페이지, 스크롤 인터랙션 중심 프로모션 사이트",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "공식 가격 미공개"
  ],
  "priceNotes": [
   "사이트에서 직접 확인 필요",
   "알파 버전 무료 제공 중"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "uizard-webdesign",
  "group": "uizard",
  "no": 43,
  "name": "Uizard",
  "category": "웹·UI/UX 디자인",
  "desc": "손 스케치나 프롬프트를 편집 가능한 UI 와이어프레임으로 변환하는 툴",
  "url": "https://uizard.io/",
  "pros": [
   "아이디어 스케치를 촬영만 해도 디지털 와이어프레임으로 변환되어 진입 장벽이 낮음"
  ],
  "cons": [
   "결과물이 다소 정형화(템플릿화)되어 최종 상용 디자인 품질에는 부족할 수 있음"
  ],
  "use": "비디자이너의 아이디어 시각화, 회의 스케치 기반의 빠른 와이어프레임 도출",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $12 / Business $39"
  ],
  "priceNotes": [
   "연 결제 기준"
  ],
  "minPaidUSD": 12.0,
  "researchedOnly": false
 },
 {
  "id": "galileoai-webdesign",
  "group": "galileoai",
  "no": 44,
  "name": "Galileo AI",
  "category": "웹·UI/UX 디자인",
  "desc": "텍스트 설명만으로 UI 시안을 Figma 형태로 자동 생성하는 AI",
  "url": "https://www.usegalileo.ai/",
  "pros": [
   "텍스트로 여러 대안 시안을 빠르게 탐색 가능",
   "Figma로 가져와 직접 수정 가능"
  ],
  "cons": [
   "생성 결과를 완전히 제어하기 어려움",
   "단일 화면 단위 구성에 강점이 치중됨"
  ],
  "use": "새 서비스의 초기 UI/UX 레퍼런스 시안 탐색",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "무료 (일일 크레딧 제한)"
  ],
  "priceNotes": [
   "현재 Google Stitch로 전환, 유료 플랜 없음"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "midjourney-image",
  "group": "midjourney",
  "no": 45,
  "name": "미드저니 (Midjourney)",
  "category": "이미지 생성",
  "desc": "압도적인 예술적 품질과 실사 이미지를 자랑하는 이미지 생성 AI",
  "url": "https://www.midjourney.com/",
  "pros": [
   "예술적이고 사실적인 고품질 이미지 생성 능력이 독보적임"
  ],
  "cons": [
   "디스코드 중심으로 운영되어 진입 장벽이 다소 높음",
   "완전 유료화됨"
  ],
  "use": "고품질 일러스트, 콘셉트 아트, 실사 수준의 상업용 이미지 제작",
  "price": "유료",
  "priceDetail": "유료",
  "plans": [
   "Basic $10 / Standard $30 / Pro $60 / Mega $120"
  ],
  "priceNotes": [
   "연 결제 시 20% 할인"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "leonardoai-image",
  "group": "leonardoai",
  "no": 46,
  "name": "Leonardo AI",
  "category": "이미지 생성",
  "desc": "세밀한 프롬프트 제어로 창의적인 일러스트·아트워크를 생성하는 AI 플랫폼",
  "url": "https://www.leonardo.ai/",
  "pros": [
   "창의적인 이미지 생성 가능"
  ],
  "cons": [
   "원하는 결과를 얻으려면 프롬프트를 상당히 정확하게 입력해야 함"
  ],
  "use": "일러스트레이션·삽화 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Essential $12 / Premium $30 / Ultimate $60"
  ],
  "priceNotes": [
   "연 결제 시 20% 할인"
  ],
  "minPaidUSD": 12.0,
  "researchedOnly": false
 },
 {
  "id": "grok-image",
  "group": "grok",
  "no": 47,
  "name": "Grok",
  "category": "이미지 생성",
  "desc": "X(트위터) 실시간 데이터와 이미지 생성 모델을 결합해 자유로운 창작을 지원하는 AI",
  "url": "https://grok.com/",
  "pros": [
   "검열 기준이 낮아 표현의 자유도가 매우 높음",
   "사실적인 고품질 이미지나 밈 생성에 탁월함"
  ],
  "cons": [
   "토큰 소모 속도가 매우 빠름",
   "대부분의 기능이 유료 버전에서만 사용 가능"
  ],
  "use": "트렌디한 밈 제작, 사실적인 인물·배경 이미지 생성, 자유로운 아이디어 시각화",
  "price": "유료",
  "priceDetail": "유료",
  "plans": [
   "SuperGrok Lite $10 / SuperGrok $30 / Heavy $300"
  ],
  "priceNotes": [
   "연 결제 시 약 17% 할인, X Premium+($40)에도 포함"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "imagefx-image",
  "group": "imagefx",
  "no": 48,
  "name": "ImageFX",
  "category": "이미지 생성",
  "desc": "구글 Imagen 모델 기반으로 텍스트를 고품질 이미지로 변환하는 도구",
  "url": "https://aitestkitchen.withgoogle.com/tools/image-fx",
  "pros": [
   "프롬프트의 특정 단어를 드롭다운으로 바꾸는 '표현 칩' 기능 제공",
   "고품질 실사화 지원"
  ],
  "cons": [
   "구글 계정 필요",
   "세밀한 스타일 조정 기능은 상대적으로 부족함"
  ],
  "use": "프롬프트 변형을 통한 빠른 아이디어 스케치, 고화질 실사 이미지 생성",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "무료"
  ],
  "priceNotes": [
   "구글 계정 필요"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "recraft-image",
  "group": "recraft",
  "no": 49,
  "name": "Recraft",
  "category": "이미지 생성",
  "desc": "벡터 그래픽·아이콘·3D 이미지 등 디자인 에셋을 일관된 스타일로 생성하는 AI",
  "url": "https://www.recraft.ai/",
  "pros": [
   "무한 캔버스와 벡터(SVG) 내보내기를 지원해 디자인 실무에 매우 유용함"
  ],
  "cons": [
   "실사 풍경보다는 일러스트·디자인 요소에 기능이 치중됨"
  ],
  "use": "로고, 아이콘, 벡터 그래픽, 브랜드 디자인, 일러스트 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Basic $10 / Pro $16~"
  ],
  "priceNotes": [
   "연 결제 기준, 월 크레딧은 이월되지 않음"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": false
 },
 {
  "id": "ideogram-image",
  "group": "ideogram",
  "no": 50,
  "name": "Ideogram",
  "category": "이미지 생성",
  "desc": "이미지 안에 정확하고 자연스러운 텍스트(타이포그래피)를 넣는 데 특화된 AI",
  "url": "https://ideogram.ai/",
  "pros": [
   "이미지 속 영어 문구를 철자 오류 없이 자연스럽게 합성하는 능력이 뛰어남"
  ],
  "cons": [
   "인물·실사 이미지의 디테일은 최상위 모델보다 다소 떨어질 수 있음"
  ],
  "use": "포스터, 타이포그래피 아트, 로고, 텍스트가 들어간 밈·섬네일 제작",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus $20 / Pro $60"
  ],
  "priceNotes": [
   "연 결제 시 Plus $15, Pro $42"
  ],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "freepik-image",
  "group": "freepik",
  "no": 51,
  "name": "Freepik",
  "category": "이미지 생성",
  "desc": "스톡 이미지 플랫폼에서 제공하는 실시간 AI 이미지 생성·편집 도구",
  "url": "https://www.freepik.com/ai/image-generator",
  "pros": [
   "기존 스톡 이미지 에셋과 함께 사용 가능",
   "실시간 생성(Real-time) 기능 지원"
  ],
  "cons": [
   "전문 생성형 AI 플랫폼보다 세밀한 프롬프트 제어가 제한적일 수 있음"
  ],
  "use": "프레젠테이션, 마케팅 자료, 디자인 초안 등 상업용 스톡 이미지 대체",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Premium $20 / Premium+ $45 / Pro Starter $110"
  ],
  "priceNotes": [
   "연 결제 시 약 25% 할인, 현재 Magnific으로 리브랜딩"
  ],
  "minPaidUSD": 20.0,
  "researchedOnly": false
 },
 {
  "id": "genspark-image",
  "group": "genspark",
  "no": 52,
  "name": "Genspark",
  "category": "이미지 생성",
  "desc": "AI 요약 검색(Sparkpage)과 이미지 생성 기능을 함께 제공하는 검색 엔진",
  "url": "https://www.genspark.ai/",
  "pros": [
   "검색·정보 수집과 동시에 관련 이미지를 쉽고 빠르게 생성 가능"
  ],
  "cons": [
   "이미지 생성 전문 도구가 아니라 세밀한 화풍 조절·고급 기능이 부족함"
  ],
  "use": "정보 검색 기반 문서 작성, 블로그 삽화, 빠른 자료 화면 생성",
  "price": "무료",
  "priceDetail": "무료",
  "plans": [
   "Plus $24.99 / Pro $249.99"
  ],
  "priceNotes": [
   "연 결제 시 Plus $19.99, Pro $199.99",
   "이미지 생성은 2026.12.31까지 무료 프로모션"
  ],
  "minPaidUSD": 24.99,
  "researchedOnly": false
 },
 {
  "id": "flux-image",
  "group": "flux",
  "no": 53,
  "name": "Flux",
  "category": "이미지 생성",
  "desc": "최고 수준의 사실성과 프롬프트 이해도를 갖춘 오픈소스 이미지 생성 모델",
  "url": "https://blackforestlabs.ai/",
  "pros": [
   "미드저니에 필적하는 고화질 실사 품질을 오픈소스로 제공해 확장성이 뛰어남"
  ],
  "cons": [
   "로컬 구동 시 매우 높은 PC 사양 필요",
   "웹 서비스 이용 시 플랫폼마다 요금이 다름"
  ],
  "use": "극사실적 인물·풍경 사진, 복잡한 지시가 담긴 고품질 일러스트 생성",
  "price": "무료",
  "priceDetail": "무료 (오픈소스)",
  "plans": [
   "오픈소스 모델 무료"
  ],
  "priceNotes": [
   "공식 API는 사용량 과금 (이미지당 약 $0.02~)"
  ],
  "minPaidUSD": null,
  "researchedOnly": false
 },
 {
  "id": "higgsfield-video",
  "group": "higgsfield",
  "no": 54,
  "name": "Higgsfield",
  "category": "영상",
  "desc": "Veo·Kling 등 여러 영상 AI를 한곳에서 쓰는 스튜디오",
  "url": "https://higgsfield.ai",
  "pros": [
   "30여 개 모델을 한 구독으로 비교 가능",
   "카메라 무빙 프리셋이 많음"
  ],
  "cons": [
   "사실상 모든 기능이 유료임",
   "무료 '인플루언서 캐릭터'는 프롬프트 입력 불가",
   "프리미엄 모델은 크레딧 소모가 큼"
  ],
  "use": "SNS·홍보용 짧은 영상, 캐릭터 영상",
  "price": "유료",
  "priceDetail": "유료",
  "plans": [
   "Starter $15 (200크레딧) / Plus $39~49 (1,000) / Ultra $99~129 (3,000)"
  ],
  "priceNotes": [
   "해지 시 구독 크레딧은 결제 기간 종료 후 소멸"
  ],
  "minPaidUSD": 15.0,
  "researchedOnly": false
 },
 {
  "id": "hedra-video",
  "group": "hedra",
  "no": 55,
  "name": "Hedra",
  "category": "영상",
  "desc": "사진 한 장과 음성으로 말하는 캐릭터 영상을 만드는 비디오 AI",
  "url": "https://www.hedra.com",
  "pros": [
   "이미지 한 장으로 말하는 영상 제작 가능",
   "립싱크·표정 표현이 강함(Character-3)"
  ],
  "cons": [
   "결과물 확인에 결제 필요",
   "크레딧이 매달 소멸되고 소모가 큼"
  ],
  "use": "말하는 아바타, 인플루언서형 쇼츠",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Free 100크레딧 (워터마크, 비상업) / Basic $15 (1,500, 워터마크 제거·상업 이용) / Creator $30 (5,400) / Pro $75 (14,400)"
  ],
  "priceNotes": [],
  "minPaidUSD": 15.0,
  "researchedOnly": false
 },
 {
  "id": "runway-video",
  "group": "runway",
  "no": 56,
  "name": "Runway",
  "category": "영상",
  "desc": "영상 생성과 편집(그린스크린·립싱크)을 한곳에서 하는 영상 AI",
  "url": "https://runwayml.com",
  "pros": [
   "Gen-4 품질이 최상급으로 평가됨",
   "모션 브러시·카메라 컨트롤 기능 제공"
  ],
  "cons": [
   "요금이 빨리 불어남",
   "프리랜서·소규모 사용자에게는 비용 부담이 큼"
  ],
  "use": "광고·영화풍 컷, 영상 편집",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Standard $15 (625크레딧) / Pro $35 (2,250) / Max $95 (9,500)"
  ],
  "priceNotes": [
   "연 결제 시 20% 할인"
  ],
  "minPaidUSD": 15.0,
  "researchedOnly": true
 },
 {
  "id": "kling-video",
  "group": "kling",
  "no": 57,
  "name": "Kling",
  "category": "영상",
  "desc": "사실적인 움직임에 강한 영상 AI",
  "url": "https://klingai.com",
  "pros": [
   "가격 대비 품질이 좋다는 평이 많음",
   "물리적으로 자연스러운 움직임 구현"
  ],
  "cons": [
   "길이·해상도에 따라 크레딧 비용이 증가함(8초 1080p 약 20크레딧, Higgsfield 기준)"
  ],
  "use": "실사풍 SNS·광고 영상",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Standard $10 (660크레딧) / Pro $37 (3,000) / Premier $92 (8,000) / Ultra $180 (26,000)"
  ],
  "priceNotes": [
   "연 결제 시 약 34% 할인 (Ultra 제외)"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": true
 },
 {
  "id": "lumadreammachine-video",
  "group": "lumadreammachine",
  "no": 58,
  "name": "Luma Dream Machine",
  "category": "영상",
  "desc": "이미지를 영상으로 바꾸는 데 강한 영상 AI",
  "url": "https://lumalabs.ai/dream-machine",
  "pros": [
   "이미지→영상 변환 충실도가 높음",
   "카메라 움직임·프레임 일관성이 좋음"
  ],
  "cons": [
   "리뷰상 뚜렷한 단점은 확인되지 않음(추가 확인 필요)"
  ],
  "use": "제품 사진·일러스트의 영상화",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Plus $30 (10,000크레딧) / Pro $90 (40,000) / Ultra $300 (150,000)"
  ],
  "priceNotes": [
   "연 결제 시 약 17% 할인"
  ],
  "minPaidUSD": 30.0,
  "researchedOnly": true
 },
 {
  "id": "pika-video",
  "group": "pika",
  "no": 59,
  "name": "Pika",
  "category": "영상",
  "desc": "스타일·효과 중심으로 가볍게 쓰는 영상 AI",
  "url": "https://pika.art",
  "pros": [
   "진입 장벽이 낮고 커뮤니티가 활발함",
   "창의적인 효과·스타일 영상 제작 가능"
  ],
  "cons": [
   "사실적인 영상 품질은 약함"
  ],
  "use": "밈·숏폼, 스타일 영상",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Starter $10 (900크레딧) / Creator $35 (3,150) / Fancy $95~"
  ],
  "priceNotes": [
   "연 결제 시 20% 할인"
  ],
  "minPaidUSD": 10.0,
  "researchedOnly": true
 },
 {
  "id": "elevenlabs-audio",
  "group": "elevenlabs",
  "no": 60,
  "name": "ElevenLabs",
  "category": "음성·음악",
  "desc": "글을 사람 같은 목소리로 읽어 주고 복제·더빙·음악까지 하는 음성 AI",
  "url": "https://elevenlabs.io",
  "pros": [
   "억양이 자연스럽고 5,000개 이상의 음성 제공",
   "TTS·음성 복제·더빙·음악을 한곳에서 이용 가능"
  ],
  "cons": [
   "체험 시 대부분의 기능에 결제 필요",
   "크레딧이 빨리 소모됨",
   "한국어 품질은 확인되지 않음"
  ],
  "use": "내레이션, 유튜브·광고 성우, 더빙",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Free 월 10,000크레딧 (상업 이용 불가) / Starter $6 / Creator $22 / Pro $99"
  ],
  "priceNotes": [],
  "minPaidUSD": 6.0,
  "researchedOnly": false
 },
 {
  "id": "fishaudio-audio",
  "group": "fishaudio",
  "no": 61,
  "name": "Fish Audio",
  "category": "음성·음악",
  "desc": "약 15초 음성으로 목소리를 복제하는 TTS·음성 AI",
  "url": "https://fish.audio",
  "pros": [
   "짧은 샘플만으로 음성 복제 가능",
   "커뮤니티 음성이 풍부하고 다국어 지원"
  ],
  "cons": [
   "결과물 확인에 결제 필요",
   "무료로는 품질 비교가 어려움"
  ],
  "use": "캐릭터 보이스, 내레이션, 음성 복제 실험",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Free 월 8,000크레딧 (상업 이용 불가, 생성당 500자) / Plus $15 / Pro $100"
  ],
  "priceNotes": [
   "프로모션이 잦음"
  ],
  "minPaidUSD": 15.0,
  "researchedOnly": false
 },
 {
  "id": "suno-audio",
  "group": "suno",
  "no": 62,
  "name": "Suno",
  "category": "음성·음악",
  "desc": "분위기만 말하면 노래를 만들어 주는 음악 AI",
  "url": "https://suno.com",
  "pros": [
   "프롬프트만으로 몇십 초 만에 곡 완성",
   "앱 평점이 높음"
  ],
  "cons": [
   "구독·결제 분쟁이 있고 상업 이용 범위가 혼란스러움",
   "저작권 소송이 진행 중임"
  ],
  "use": "배경음악, 영상용 BGM",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Pro $8 (월 2,500크레딧) / Premier $24 (월 10,000크레딧)"
  ],
  "priceNotes": [
   "연 결제 시 20% 할인"
  ],
  "minPaidUSD": 8.0,
  "researchedOnly": true
 },
 {
  "id": "typecast-audio",
  "group": "typecast",
  "no": 63,
  "name": "Typecast",
  "category": "음성·음악",
  "desc": "캐릭터 목소리로 한국어 더빙을 만드는 국산 TTS",
  "url": "https://typecast.ai/kr",
  "pros": [
   "한국어 발음이 자연스러움",
   "캐릭터·성우가 다양하고 감정·속도 조절 가능"
  ],
  "cons": [
   "감정을 세게 주면 한국어가 부자연스러울 수 있음"
  ],
  "use": "한국어 내레이션, 유튜브 더빙",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "베이직 ₩9,900 / 플러스 ₩29,000 / 프로 ₩39,000 / 비즈니스 ₩99,000"
  ],
  "priceNotes": [
   "연 결제 시 10% 할인"
  ],
  "minPaidUSD": 7.07,
  "researchedOnly": true
 },
 {
  "id": "make-automation",
  "group": "make",
  "no": 64,
  "name": "Make",
  "category": "업무 자동화",
  "desc": "여러 앱을 연결하고 작업 흐름을 시각적으로 설계하는 자동화 서비스",
  "url": "https://www.make.com",
  "pros": [
   "작업 흐름을 한눈에 확인 가능",
   "복잡한 조건과 여러 단계의 자동화 구성 가능"
  ],
  "cons": [
   "단계가 늘어날수록 설정이 복잡해짐",
   "사용량 증가에 따른 비용 증가 우려"
  ],
  "use": "주문 데이터 정리, 이메일 알림, 앱 간 데이터 전달 자동화",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Core $12 / Pro $21 / Teams $38"
  ],
  "priceNotes": [
   "연 결제 시 15% 이상 할인"
  ],
  "minPaidUSD": 12.0,
  "researchedOnly": false
 },
 {
  "id": "dify-automation",
  "group": "dify",
  "no": 65,
  "name": "Dify",
  "category": "업무 자동화",
  "desc": "문서 기반 챗봇과 AI 작업 흐름을 시각적으로 만드는 AI 앱 개발 플랫폼",
  "url": "https://dify.ai",
  "pros": [
   "문서 기반 챗봇 제작 가능",
   "AI 작업 흐름을 시각적으로 구성 가능"
  ],
  "cons": [
   "AI 모델 연결과 데이터 설정에 대한 이해 필요",
   "모델 사용료가 별도로 발생할 수 있음"
  ],
  "use": "사내 문서 질의응답, 고객 상담 챗봇, 무역 서류 요약·분류",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Professional $49 / Team $133"
  ],
  "priceNotes": [
   "연 결제 기준(월 환산)"
  ],
  "minPaidUSD": 49.0,
  "researchedOnly": false
 },
 {
  "id": "n8n-automation",
  "group": "n8n",
  "no": 66,
  "name": "n8n",
  "category": "업무 자동화",
  "desc": "다양한 앱과 API를 연결해 맞춤형 자동화 흐름을 만드는 도구",
  "url": "https://n8n.io",
  "pros": [
   "코드와 시각적 설정을 함께 활용해 세밀한 자동화 구성 가능",
   "자체 서버 설치 가능"
  ],
  "cons": [
   "복잡한 시스템 연결과 직접 운영에 기술 지식 필요",
   "서버 관리 부담 발생"
  ],
  "use": "기업 내부 시스템 연동, 데이터 수집·가공, AI 기반 반복 업무 처리",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Starter €24 / Pro €60"
  ],
  "priceNotes": [
   "연 결제 시 Starter €20, Pro €50, 자체 서버 설치(Community)는 무료"
  ],
  "minPaidUSD": 25.92,
  "researchedOnly": false
 },
 {
  "id": "zapier-automation",
  "group": "zapier",
  "no": 67,
  "name": "Zapier",
  "category": "업무 자동화",
  "desc": "특정 조건이 충족되면 다른 앱에서 정해진 작업을 실행하는 노코드 자동화 서비스",
  "url": "https://zapier.com",
  "pros": [
   "코딩 없이 다양한 앱 연결 가능",
   "간단한 반복 업무 자동화 설정이 쉬움"
  ],
  "cons": [
   "무료 플랜은 작업 수와 기능이 제한됨",
   "사용량 증가에 따른 비용 증가 우려"
  ],
  "use": "주문 진행 상태 변경 알림, 신청 접수 메일 발송, 반복 데이터 입력 자동화",
  "price": "무료+유료",
  "priceDetail": "무료+유료",
  "plans": [
   "Professional $19.99~ / Team $69~"
  ],
  "priceNotes": [
   "연 결제 기준, 작업 수에 따라 가격 상승"
  ],
  "minPaidUSD": 19.99,
  "researchedOnly": false
 }
];
