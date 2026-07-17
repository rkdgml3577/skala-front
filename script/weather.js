/* ============================================================
   [과제] 실시간 날씨 — 비동기 호출 (fetch + async/await)
   기본: 로딩 표시 → Open-Meteo 온도·습도 표시
   확장(하): 단위를 API 응답에서 동적으로 (current_units)
   확장(중): weather_code → 날씨 상태 이모지 매핑
   확장(중): 요청 레이스 방어 (연타 시 최신 요청만 반영)
   ============================================================ */

// [기본] 도시 데이터: 객체 배열 (좌표가 API 파라미터로 직행)
let cities = [
  { name: "대한민국 서울",   flag: "🇰🇷", lat: 37.57, lng: 126.98 },
  { name: "프랑스 파리",     flag: "🇫🇷", lat: 48.85, lng: 2.35 },
  { name: "일본 도쿄",       flag: "🇯🇵", lat: 35.68, lng: 139.69 },
  { name: "태국 방콕",       flag: "🇹🇭", lat: 13.76, lng: 100.50 },
  { name: "캄보디아 씨엠립", flag: "🇰🇭", lat: 13.36, lng: 103.86 }
];

// [기본] DOM 붙잡기 (스크립트가 body 끝에 있어 요소가 이미 존재)
let citySelect = document.getElementById("citySelect");
let weatherBox = document.getElementById("weather-box");

//   요청 번호표: 연타 시 "마지막 주문만 받기" 위한 카운터
let requestId = 0;

//   WMO 날씨 코드 → 상태 이모지/설명 변환
// Open-Meteo는 날씨를 국제 표준 숫자 코드(WMO)로 주므로 사람 말로 번역 필요
function getWeatherIcon(code) {
  if (code === 0)               return "☀️ 맑음";
  if (code >= 1 && code <= 3)   return "⛅ 구름 조금";
  if (code === 45 || code === 48) return "🌫️ 안개";
  if (code >= 51 && code <= 57) return "🌦️ 이슬비";
  if (code >= 61 && code <= 67) return "🌧️ 비";
  if (code >= 71 && code <= 77) return "🌨️ 눈";
  if (code >= 80 && code <= 82) return "🌧️ 소나기";
  if (code >= 95)               return "⛈️ 뇌우";
  return "🌡️ 알 수 없음 (code " + code + ")";   // 방어: 미정의 코드
}

// [기본] async 함수: 날씨 데이터를 가져와 그리기
async function loadWeather(city) {
  //   이 요청의 번호표 발급 (전역 카운터 증가)
  let myId = ++requestId;

  // [기본] 1단계: 로딩 표시
  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  try {
    // [기본] 템플릿 리터럴(백틱!)로 URL 조립
    //   weather_code를 요청 목록에 추가
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,weather_code`;

    // [기본] await: 응답 대기 (브라우저는 그동안 멈추지 않음)
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }
    let data = await response.json();

    //   레이스 방어: 기다리는 동안 새 요청이 발급됐다면
    // 이 응답은 유통기한 지난 것 → 화면 갱신 포기
    if (myId !== requestId) return;

    // [기본] 응답에서 값 꺼내기
    let current = data.current;
    let temp = current.temperature_2m;
    let humidity = current.relative_humidity_2m;

    //    단위를 하드코딩(°C) 대신 응답의 current_units에서 동적으로
    // → API 설정이 화씨로 바뀌어도 코드 수정 없이 올바른 단위 표시
    let units = data.current_units;
    let tempUnit = units.temperature_2m;          // "°C"
    let humidityUnit = units.relative_humidity_2m; // "%"

    //   날씨 코드 번역
    let condition = getWeatherIcon(current.weather_code);

    // [기본] 3단계: 결과 그리기
    weatherBox.innerHTML =
      "<p>🌏 <strong>" + city.flag + " " + city.name + "</strong> 실시간 날씨</p>" +
      "<p>" + condition + "</p>" +
      "<p>🌡️ 현재 기온: <strong>" + temp + tempUnit + "</strong></p>" +
      "<p>💧 현재 습도: <strong>" + humidity + humidityUnit + "</strong></p>" +
      "<p class='weather-hint'>위도 " + city.lat + " · 경도 " + city.lng + "</p>";

  } catch (error) {
    // [추가] 실패해도 최신 요청일 때만 에러 표시 (구닥다리 요청의 에러로 화면 덮지 않기)
    if (myId !== requestId) return;
    weatherBox.innerHTML = "<p>⚠️ 날씨를 불러오지 못했습니다.<br>잠시 후 다시 시도해 주세요.</p>";
    console.error("날씨 API 오류:", error);
  }
}

// [기본] change 이벤트 → 선택된 도시로 비동기 로드
citySelect.addEventListener("change", function () {
  let index = parseInt(citySelect.value, 10);

  if (isNaN(index)) {
    // 안내 옵션으로 복귀 시: 진행 중 요청도 무효화 (번호표 갱신)
    requestId++;
    weatherBox.innerHTML = '<p class="weather-hint">도시를 선택하면 정보가 표시됩니다.</p>';
    return;
  }
  loadWeather(cities[index]);
});