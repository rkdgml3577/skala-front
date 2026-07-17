/* ============================================================
   [과제] 내 가방 보기
   요구: 객체 배열(myBag) / showMyBag() / 반복문 출력
   ============================================================ */

function showMyBag() {
  // [기본] 소지품 객체 배열 — 각 원소가 { 이름, 개수 } 서랍
  // 데이터는 본인 소지품으로 바꿔서 실습 흔적 남기기!
  let myBag = [
    { name: "여권 ✈️",    count: 1 },
    { name: "스마트폰 📱", count: 2 },
    { name: "지갑 💳",     count: 1 }
  ];

  // [기본] 반복문으로 목록 문자열 누적 (alert 여러 번 X, 한 번에 출력)
  let message = "🎒 [내 가방 속 물품 목록]\n";
  message += "------------------------\n";

  for (let i = 0; i < myBag.length; i++) {
    // 점 표기법: myBag[i]라는 서랍장에서 name/count 서랍 열기
    message += "· " + myBag[i].name + " : " + myBag[i].count + "개\n";
  }
    // [추가 실습] 총 수량 합계 (종류 수와 별개)
  let totalCount = 0;
  for (let i = 0; i < myBag.length; i++) {
    totalCount += myBag[i].count;
  }
  message += "\n총 수량: " + totalCount + "개";

  message += "------------------------\n";
  message += "총 물품 종류: " + myBag.length + "가지";

  alert(message);   // [기본] 완성된 목록을 한 번에 표시
}