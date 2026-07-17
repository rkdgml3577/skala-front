/* ============================================================
   [과제] realtimeInfo.js — "화면" 책임 모듈
   weatherAPI에서 데이터를 import 받아 DOM에 그리는 일만 담당
   ============================================================ */

// [기본] import: 확장자 .js까지 필수! (브라우저 ES 모듈 규칙)
import { cities, fetchWeather } from "./weatherAPI.js";

let citySelect = document.getElementById("citySelect");
let weatherBox = document.getElementById("weather-box");

// [유지] 레이스 방어 번호표
let requestId = 0;

// [유지] WMO 코드 번역 — "숫자를 사람 말로"는 표시 로직이므로 화면 모듈 소속
function getWeatherIcon(code) {
  if (code === 0)                 return "☀️ 맑음";
  if (code >= 1 && code <= 3)     return "⛅ 구름 조금";
  if (code === 45 || code === 48) return "🌫️ 안개";
  if (code >= 51 && code <= 57)   return "🌦️ 이슬비";
  if (code >= 61 && code <= 67)   return "🌧️ 비";
  if (code >= 71 && code <= 77)   return "🌨️ 눈";
  if (code >= 80 && code <= 82)   return "🌧️ 소나기";
  if (code >= 95)                 return "⛈️ 뇌우";
  return "🌡️ 알 수 없음 (code " + code + ")";
}

// [기본] 화면 갱신 흐름: 로딩 → (import한 함수로 데이터 요청) → 그리기/에러
async function showWeather(city) {
  let myId = ++requestId;
  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  try {
    // 주방(weatherAPI)에 주문 — 어떻게 조리하는지 홀은 모름
    let weather = await fetchWeather(city);

    if (myId !== requestId) return;   // 유통기한 지난 응답 폐기

    weatherBox.innerHTML =
      "<p>🌏 <strong>" + city.flag + " " + city.name + "</strong> 실시간 날씨</p>" +
      "<p>" + getWeatherIcon(weather.code) + "</p>" +
      "<p>🌡️ 기온: <strong>" + weather.temp + weather.tempUnit + "</strong></p>" +
      "<p>💧 습도: <strong>" + weather.humidity + weather.humidityUnit + "</strong></p>";

  } catch (error) {
    if (myId !== requestId) return;
    weatherBox.innerHTML = "<p>⚠️ 날씨를 불러오지 못했습니다.<br>잠시 후 다시 시도해 주세요.</p>";
    console.error("날씨 오류:", error);
  }
}

// [추가 실습] select 옵션을 cities 데이터로 자동 생성
// → HTML 하드코딩 제거: 도시 추가는 이제 weatherAPI.js 한 곳만 고치면 됨
for (let i = 0; i < cities.length; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = cities[i].flag + " " + cities[i].name;
  citySelect.appendChild(option);
}

citySelect.addEventListener("change", function () {
  let index = parseInt(citySelect.value, 10);
  if (isNaN(index)) {
    requestId++;
    weatherBox.innerHTML = '<p class="weather-hint">도시를 선택하면 정보가 표시됩니다.</p>';
    return;
  }
  showWeather(cities[index]);
});