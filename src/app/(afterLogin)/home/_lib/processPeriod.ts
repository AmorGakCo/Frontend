export default function processPeriod(beginAt: string, endAt: string) {
  const startTime = new Date(beginAt);
  const endTime = new Date(endAt);

  const startFormatted = `${startTime.getFullYear()}/${(
    '0' +
    (startTime.getMonth() + 1)
  ).slice(-2)}/${('0' + startTime.getDate()).slice(-2)} ${(
    '0' + startTime.getHours()
  ).slice(-2)}:${('0' + startTime.getMinutes()).slice(-2)}`;
  const endFormatted = `${('0' + endTime.getHours()).slice(-2)}:${(
    '0' + endTime.getMinutes()
  ).slice(-2)}`;

  return `${startFormatted} ~ ${endFormatted}`;
}
