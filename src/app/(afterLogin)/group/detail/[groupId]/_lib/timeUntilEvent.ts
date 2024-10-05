export function timeUntilEvent(eventTimeStr: string): string {
  let result = '';
  // 현재 시간 가져오기
  const now: Date = new Date();

  // 이벤트 시간 파싱
  const eventTime: Date = new Date(eventTimeStr);

  // 시간 차이 계산 (밀리초 단위)
  const timeDiff: number = eventTime.getTime() - now.getTime();

  // 시간 차이가 음수이면 이미 시간이 지난 것
  if (timeDiff <= 0) {
    return '';
  }

  // 밀리초 단위를 일, 시간, 분으로 변환
  const days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor(
    (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
  );

  // 조건에 따라 출력
  if (days > 0) {
    result =  `${days}일 ${hours}시간 ${minutes}분`;
  } else if (hours > 0) {
    result =  `${hours}시간 ${minutes}분`;
  } else {
    result =  `${minutes}분`;
  }
  return `${result}`
}
