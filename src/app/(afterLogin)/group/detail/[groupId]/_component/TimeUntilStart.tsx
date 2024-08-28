import { timeUntilEvent } from "../_lib/timeUntilEvent";

const TimeUntilStart = ({beginAt}: {beginAt: string}) => {
  return (
    <div className="w-full flex justify-end mt-2">
            {timeUntilEvent(beginAt) == '' ? (
              <div>모임 시간이 지났습니다.</div>
            ) : (
              <div>
                시작까지{' '}
                <span className="font-bold">
                  {timeUntilEvent(beginAt)}
                </span>{' '}
                남았습니다.
              </div>
            )}
          </div>
  );
};
export default TimeUntilStart;
