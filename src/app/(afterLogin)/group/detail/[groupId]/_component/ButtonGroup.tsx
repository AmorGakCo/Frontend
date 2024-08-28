import { Button } from "@/components/ui/button";

export function ButtonGroup ({name}:{name: string}) {
  return (<div className="flex flex-col gap-4">
    <Button>모임 위치 인증</Button>
    <Button>지각 알림</Button>
    <Button>장소 변경 요청</Button>
    <Button className={`bg-[#FF2950] hover:bg-[#FF2950]/70`}>
      {`'${name}'`} 탈퇴
    </Button>
  </div>)
}