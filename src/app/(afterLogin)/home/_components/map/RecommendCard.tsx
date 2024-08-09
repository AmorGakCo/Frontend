import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
interface SelectCardProps {
  address : string;
  title: string;
  setCard: React.Dispatch<React.SetStateAction<string>>;
}
export default function RecommendCard({address, title, setCard}:SelectCardProps) {
  return (
    <Card className="z-30 w-[328px] absolute bottom-6 left-1/2 right-1/2 -translate-x-1/2">
      <CardHeader>
        <CardTitle className="text-center underline text-title">베이커리 카페 아뜨레</CardTitle>
        <CardDescription className="text-center">
          서울 종로구 세종대로
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button onClick={() => {setCard('info')}}>선택</Button>
      </CardFooter>
    </Card>
  );
};
