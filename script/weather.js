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

// [기본] change 이벤트: 사용자가 선택을 "바꿀 때마다" 실행
citySelect.addEventListener("change", function () {
  // select의 value는 항상 문자열 → 숫자 인덱스로 변환 (성적 계산기 교훈!)
  var index = parseInt(citySelect.value, 10);

  // [추가 실습] 안내 옵션(value="")을 다시 고른 경우 → 초기 문구로 복귀
  if (isNaN(index)) {
    weatherBox.innerHTML = '<p class="weather-hint">도시를 선택하면 정보가 표시됩니다.</p>';
    return;
  }

  var city = cities[index];   // 선택된 도시 객체

  // [기본] innerHTML로 결과 영역을 통째로 갈아끼움 (DOM 조작)
  weatherBox.innerHTML =
    "<p>📍 <strong>" + city.flag + " " + city.name + "</strong> 정보</p>" +
    "<p>· 위도(Latitude): " + city.lat + "</p>" +
    "<p>· 경도(Longitude): " + city.lng + "</p>";
});