/* ============================================================
   [과제] 성적 계산기
   요구: 배열 / for문 / prompt 연속 입력 / 평균 / 합격 판정 / alert
   ============================================================ */

// [기본] 버튼 클릭 시에만 실행되도록 함수로 포장
function startGradeCalc() {
  // [기본] 과목 배열 + 총점 변수 (과제 제공 코드)
  let subjects = ["HTML", "CSS", "JavaScript"];
  let total = 0;

  // [기본] for문: 배열 길이(subjects.length)만큼 반복
  for (let i = 0; i < subjects.length; i++) {
    let input = prompt(subjects[i] + " 점수를 입력하세요. (0~100)");

    // [추가 실습] 취소 시 전체 중단 (Up-Down에서 배운 null 방어 재사용)
    if (input === null) {
      alert("성적 입력을 중단했습니다.");
      return;
    }

    // [기본+핵심] 문자열 → 숫자 변환. 없으면 "0" + "90" = "090" 문자열 연결 참사!
    let score = parseInt(input, 10);

    // [추가 실습] 숫자 아님 / 범위 밖 방어 → 같은 과목 다시 입력
    if (isNaN(score) || score < 0 || score > 100) {
      alert("0~100 사이의 숫자를 입력해 주세요!");
      i--;        // 인덱스를 되돌려 이번 과목을 재시도
      continue;
    }

    total = total + score;   // [기본] 누적
  }

  // [기본] 평균 계산 — 하드코딩(/3) 대신 length 사용 → 과목 추가에도 자동 대응
  let average = total / subjects.length;

  // [추가 실습] 등급 세분화 (예시 화면의 '우수자' 문구 구현)
  let result;
  if (average >= 90)      result = "🎉 합격입니다! 우수자로 선정되었습니다.";
  else if (average >= 60) result = "🎉 합격입니다!";
  else                    result = "😢 불합격입니다. 다시 도전하세요!";

  // [기본] 결과 alert — toFixed(1)로 소수 첫째 자리까지
  alert(
    "====== 📊 성적 결과표 ======\n" +
    "· 총점: " + total + "점\n" +
    "· 평균: " + average.toFixed(1) + "점\n" +
    "--------------------------\n" +
    "· 결과: " + result
  );
}