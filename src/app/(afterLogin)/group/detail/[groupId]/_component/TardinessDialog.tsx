import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { TimePickerInput } from '../../../register/_component/time-picker/time-picker-input';
import { SetStateAction, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchTardiness } from '../_lib/fetchTardiness';

interface TardinessDialogProps {
  groupId: number;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
const TardinessDialog = ({ groupId,open,setOpen }: TardinessDialogProps) => {
  const [minute, setMinute] = useState(0);
  const minuteRange = Array.from({ length: 12 }, (_, i) => String((i + 1) * 5));
  return (
    <Dialog open = {open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full">지각 알림</Button>
      </DialogTrigger>
      <DialogContent className="py-12">
        <DialogHeader className="w-full items-center gap-6">
          <DialogTitle>얼만큼 늦으시나요?</DialogTitle>
          <DialogDescription className="w-2/3">
            <Select onValueChange={(value) => {setMinute(Number(value))}}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="5분부터 60분 선택가능" />
              </SelectTrigger>
              <SelectContent className="w-full h-72">
                {minuteRange.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}분
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full sm:justify-center mt-6 px-6">
          <Button
            className="w-2/3"
            onClick={async () => {
              if (minute === 0) {
                alert('지각하는 시간을 선택하세요')
                return;
              }
              if (confirm('지각 요청을 보내시겠습니까?')){
                await fetchTardiness({ groupId, minute });
                setOpen(false)
              }
            }}
          >
            알림 보내기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TardinessDialog;
