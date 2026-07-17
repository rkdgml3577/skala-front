# 🚀 SKALA-FRONT — KangHee's Universe

SK그룹 AI 실무자 양성 과정(SKALA) 프론트엔드 학습 프로젝트입니다.
HTML 기초부터 CSS 레이아웃, JavaScript DOM/비동기/모듈까지의 과제를
하나의 일관된 포트폴리오 사이트로 누적하여 구현했습니다.

- 👤 작성자: [rkdgml3577](https://github.com/rkdgml3577)

---

## 📂 프로젝트 구조
SKALA-FRONT/
├── html/          # 페이지 (index가 Hub 역할)
│   ├── index.html         # 메인 Hub — 인트로, 바로가기, 소식, 사이드바 위젯
│   ├── myProfile.html     # 자기소개 (ul/ol/dl, 시맨틱 태그)
│   ├── myClass.html       # 강의 시간표 (table, rowspan/colspan 병합)
│   ├── myHoliday.html     # 휴일 일과 (타임라인 카드 UI)
│   ├── myTrip.html        # 여행 앨범 (audio/img/video, Grid 갤러리)
│   ├── signUp.html        # 회원가입 폼 (form/fieldset, 실시간 검증)
│   └── signUpResult.html  # 가입 결과 (URLSearchParams로 GET 파라미터 표시)
├── css/
│   └── style.css          # 전역 테마 (디자인 토큰, 태그 선택자, 공통 컴포넌트)
├── script/
│   ├── upDown.js          # 업다운 게임 (while, prompt 방어 로직)
│   ├── grade.js           # 성적 계산기 (for, 배열, 등급 판정)
│   ├── bag.js             # 내 가방 보기 (객체 배열, 통계 집계)
│   ├── weatherAPI.js      # 날씨 데이터 모듈 (export, fetch — DOM 코드 없음)
│   └── realtimeInfo.js    # 날씨 화면 모듈 (import, DOM/이벤트 전담)
└── media/                 # 사진·음악·영상 (H.264 변환본)
---

## 📄 페이지 & 과제 매핑

| 페이지 | 핵심 과제 요소 | 추가 실습 |
|---|---|---|
| index | 시맨틱 구조(nav/main/aside), Flexbox 가로 배치, 반응형(786px) | 3단계 인트로, 타이핑 애니메이션, 다크/라이트 테마, 실시간 시계, `?skipIntro=1` |
| myProfile | ul/ol/dl + 시맨틱 태그 (CSS 금지 차시 → 이후 외부 CSS만으로 스타일) | 목차 앵커 nav, CSS 카운터로 ol 번호 재구현 |
| myClass | table/thead/tbody, rowspan·colspan 셀 병합 | — |
| myHoliday | 전역 CSS만으로 스타일링한 쇼케이스 페이지 | 타임라인 카드 UI |
| myTrip | audio/img/video + source, Grid 3열 바둑판, 786px 반응형 | 커스텀 오디오 플레이어, IntersectionObserver 등장 애니메이션, 라이트박스, 여행 리뷰 카드 |
| signUp / Result | form(GET), fieldset/legend/label, required | 실시간 아이디·비밀번호 검증, URLSearchParams 결과 표시 |

### JavaScript 과제 (script/)

| 파일 | 학습 주제 | 방어 로직 |
|---|---|---|
| upDown.js | while 반복문, 난수 | prompt 취소(null) 무한루프 방지, NaN 재입력 |
| grade.js | for + 배열(length), 평균 | 문자열 덧셈 참사 방지(parseInt), 범위 검증 후 i-- 재시도 |
| bag.js | 객체 배열, 점 표기법 | 합계·최댓값 집계를 단일 순회로 처리 |
| weatherAPI.js + realtimeInfo.js | fetch/async·await, ES 모듈 분리 | 로딩 상태, try/catch, HTTP 상태 검사, 요청 레이스 방어(requestId) |

---

## 🎨 디자인 시스템

모든 페이지가 하나의 톤앤무드를 공유합니다.

- 색상: 딥 네이비 배경 `#0d1117` · 보라 `#7b5cff` → 시안 `#2ee6c6` 그라디언트 · SK 오렌지 액센트 `#ff6a13`
- 토큰: CSS 변수 기반 (`--page-width`로 페이지 폭 일원화, 라이트 테마는 `data-theme` 전환)
- 공통 컴포넌트: surface 카드, `.home-btn`(전 페이지 홈 복귀 버튼), 그라디언트 디바이더
- 모션: hover 리프트 + 그림자, 등장 트랜지션 — `prefers-reduced-motion` 사용자는 인트로 완전 스킵 및 애니메이션 제거 (접근성)

---

## 🔧 실행 방법

1. VS Code에서 SKALA-FRONT 폴더째 열기 (파일 단독 열기 ❌)
2. `html/index.html` 우클릭 → Open with Live Server
3. 주소가 `http://127.0.0.1:5500/...` 인지 확인
   (⚠️ `file://`로 직접 열면 ES 모듈·fetch가 동작하지 않습니다)
4. 인트로 건너뛰기: `index.html?skipIntro=1`

---

## 🐛 트러블슈팅 기록 (직접 겪고 해결한 문제들)

프로젝트를 진행하며 만난 실제 문제와 해결 과정입니다.

1. 아이폰 영상이 크롬에서 재생 안 됨 — 파일은 로드(200)되는데 검은 화면.
   원인: 아이폰 기본 HEVC(H.265) 코덱을 크롬이 미지원. → HandBrake로 H.264 + Web Optimized 변환하여 해결. 확장자 변경만으로는 해결 불가함을 확인.
2. `file://`로 열어서 생긴 정체불명 에러(net::ERR_UNEXPECTED) — Live Server를 쓰는 줄 알았지만 주소창이 `file:///c:/...`였음. → "주소가 http로 시작하지 않으면 화면을 믿지 않는다"는 원칙 수립.
3. CSS가 안 먹는 이유는 대부분 특이성 — `#welcome`(id)이 `.hero`(class)의 패딩을 덮고, 미디어쿼리 속 옛 규칙이 되살아나는 문제를 반복 경험. → F12 Styles의 취소선으로 패배한 규칙을 찾는 습관, 스타일링에 id 선택자 지양.
4. flex 컨테이너 안에서 `margin: 0 auto`가 폭을 축소 — auto 마진이 stretch를 해제해 hero만 fit-content 폭이 됨. → `width: 100%` 명시로 해결. "중앙 정렬엔 폭 명시가 세트"임을 학습.
5. skipIntro 접속 시 인트로가 한 프레임 깜빡임(FOUC) — body 끝 JS 실행 전에 브라우저가 먼저 그림. → `<head>` 선제 스크립트로 첫 페인트 전에 클래스를 부착해 원천 차단.
6. 비동기 연타 시 이전 응답이 화면을 덮는 레이스 컨디션 — 날씨 위젯에서 도시 연속 변경 시 발생. → 요청 번호표(requestId)로 최신 요청만 반영.
7. 과제 슬라이드에서 복사한 API URL의 `¤t` 깨짐 — `&current`가 HTML 엔티티(&curren)로 변환된 것을 발견하여 수정.

---

## 🌐 브라우저 / 환경

- Chrome 기준 개발·테스트, 반응형 브레이크포인트 786px (과제 스펙)
- ES 모듈 사용으로 HTTP 서빙 필수 (Live Server / GitHub Pages)
