/* ============================================================
   [과제] weatherAPI.js — "데이터" 책임 모듈
   규칙: 이 파일에는 DOM 코드(getElementById, innerHTML)가 없다!
   ============================================================ */

// [기본] export: 도시 데이터도 외부 제공 (realtimeInfo가 select 채우는 데 사용)
export let cities = [
  { name: "대한민국 서울",   flag: "🇰🇷", lat: 37.57, lng: 126.98 },
  { name: "프랑스 파리",     flag: "🇫🇷", lat: 48.85, lng: 2.35 },
  { name: "일본 도쿄",       flag: "🇯🇵", lat: 35.68, lng: 139.69 },
  { name: "태국 방콕",       flag: "🇹🇭", lat: 13.76, lng: 100.50 },
  { name: "캄보디아 씨엠립", flag: "🇰🇭", lat: 13.36, lng: 103.86 }
];

// [기본] export async function: 좌표를 받아 날씨 "데이터만" 반환
// 화면에 어떻게 그릴지는 이 함수의 관심사가 아님 (관심사 분리)
export async function fetchWeather(city) {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,weather_code`;

  let response = await fetch(url);
  if (!response.ok) {
    throw new Error("서버 응답 오류: " + response.status);
    // 주의: 여기서 innerHTML로 에러를 그리지 않는다 —
    // 에러를 "던지기만" 하고, 그리는 건 화면 담당(realtimeInfo)의 몫
  }

  let data = await response.json();

  // 화면이 쓰기 좋게 필요한 값만 골라 정리해서 반환 (데이터 가공도 주방 일)
  return {
    temp: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    code: data.current.weather_code,
    tempUnit: data.current_units.temperature_2m,
    humidityUnit: data.current_units.relative_humidity_2m
  };
}