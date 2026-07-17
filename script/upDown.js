/* ============================================================
   [과제] Up-Down 숫자 맞추기 게임
   요구: 1~50 난수 / prompt 입력 / while 반복 / Up·Down 알림 / 횟수 표시
   ============================================================ */

// [기본] 게임 전체를 함수로 포장 → 버튼 클릭 시에만 실행 (자동 실행 방지)
function startUpDownGame() {
  // [기본] 컴퓨터의 비밀 숫자: 0~49 난수에 +1 → 1~50
  let computerNum = Math.floor(Math.random() * 50) + 1;

  let tryCount = 0;      // [기본] 시도 횟수 카운터
  let isCorrect = false; // 정답 여부 플래그 (while 종료 조건)

  // [기본] 맞출 때까지 반복 (while 실습)
  while (!isCorrect) {
    let input = prompt("1부터 50 사이의 숫자 중 컴퓨터가 생각한 숫자는 무엇일까요?");

    // [추가 실습] 취소(null) 처리 — 없으면 prompt 무한 반복 발생!
    if (input === null) {
      alert("게임을 중단했습니다. 다음에 다시 도전하세요! 🎮");
      return;   // 함수 자체를 종료
    }

    // [기본+추가] prompt는 문자열 반환 → 숫자로 명시 변환
    let userNum = parseInt(input, 10);

    // [추가 실습] 숫자가 아닌 입력(빈값, 문자) 방어
    if (isNaN(userNum)) {
      alert("숫자를 입력해 주세요!");
      continue;   // 이번 회차는 무효, 카운트 없이 다시 입력받기
    }

    tryCount++;   // 유효한 시도만 카운트

    // [기본] 비교 후 힌트 알림
    if (userNum > computerNum) {
      alert("Down! ⬇️");
    } else if (userNum < computerNum) {
      alert("Up! ⬆️");
    } else {
      // [기본] 정답: 횟수와 함께 축하 메시지
      alert("축하합니다! " + tryCount + "번 만에 맞추셨습니다. 🎉");
      isCorrect = true;   // while 탈출
    }
  }
}