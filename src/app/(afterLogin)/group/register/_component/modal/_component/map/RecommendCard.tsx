import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SelectCardProps {
  selectedMarker: {position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string;
}
}
export default function RecommendCard({selectedMarker}:SelectCardProps) {
  return (
    <Card className="z-30 w-[328px] absolute bottom-6 left-1/2 right-1/2 -translate-x-1/2">
      <CardHeader>
        <CardTitle className="text-center underline text-title">{selectedMarker.content}</CardTitle>
        <CardDescription className="text-center">
          {selectedMarker.address}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button>선택</Button>
      </CardFooter>
    </Card>
  );
};
