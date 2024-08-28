export default function GroupTime ({beginAtDate,endAtDate}:{beginAtDate:Date; endAtDate: Date}) {
  return (
    <div className="flex justify-between items-center w-full h-10">
          <div>모임 시간</div>
          <div className="font-thin text-xl">
            {`${beginAtDate.getHours()}:${beginAtDate.getMinutes()}`}~
            {`${endAtDate.getHours()}:${endAtDate.getMinutes()}`}
          </div>
        </div>
  )
}