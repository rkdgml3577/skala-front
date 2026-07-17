/* ============================================================
   [과제] 실시간 날씨 — DOM/이벤트
   요구: select change 이벤트 → 도시명+위도/경도를 innerHTML로 표시
   ============================================================ */

// [기본] 도시 데이터: 객체 배열 ("내 가방" 패턴 재사용)
// select의 option value가 이 배열의 인덱스와 짝을 이룸
var cities = [
  { name: "대한민국 서울", flag: "🇰🇷", lat: 37.57,  lng: 126.98 },
  { name: "프랑스 파리",   flag: "🇫🇷", lat: 48.85,  lng: 2.35 },
  { name: "일본 도쿄",     flag: "🇯🇵", lat: 35.68,  lng: 139.69 },
  { name: "태국 방콕",     flag: "🇹🇭", lat: 13.76,  lng: 100.50 },
  { name: "캄보디아 씨엠립", flag: "🇰🇭", lat: 13.36, lng: 103.86 }
];

// [기본] DOM에서 요소 붙잡기 — 스크립트가 body 끝에 있어 요소가 이미 존재함
var citySelect = document.getElementById("citySelect");
var weatherBox = document.getElementById("weather-box");

// ✅ 추가 1: async 함수 (새로 등장)
async function loadWeather(city) {
  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";
  try {
    var url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m`;
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }
    var data = await response.json();
    var temp = data.current.temperature_2m;
    var humidity = data.current.relative_humidity_2m;
    weatherBox.innerHTML =
      "<p>🌏 <strong>" + city.flag + " " + city.name + "</strong> 실시간 날씨</p>" +
      "<p>🌡️ 현재 기온: <strong>" + temp + "°C</strong></p>" +
      "<p>💧 현재 습도: <strong>" + humidity + "%</strong></p>" +
      "<p>· 위도 " + city.lat + " / 경도 " + city.lng + "</p>";
  } catch (error) {
    weatherBox.innerHTML = "<p>⚠️ 날씨를 불러오지 못했습니다.<br>잠시 후 다시 시도해 주세요.</p>";
    console.error("날씨 API 오류:", error);
  }
}

// ✅ 추가 2: 새 리스너 (구조는 옛것과 비슷하지만 마지막 줄이 다름)
citySelect.addEventListener("change", function () {
  var index = parseInt(citySelect.value, 10);
  if (isNaN(index)) {
    weatherBox.innerHTML = '<p class="weather-hint">도시를 선택하면 정보가 표시됩니다.</p>';
    return;
  }
  loadWeather(cities[index]);   // ← 좌표 표시 대신 비동기 함수 호출
});