import {
  Card,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SetStateAction } from 'react';
import { addressInfo } from '@/app/_types/Map';
import { DialogClose } from '@/components/ui/dialog';

interface InfoCardProps {
  selectedMarker: {
    position: {
      lat: number;
      lng: number;
    };
    content: string;
    address: string;
  };
  setAddressInfo: React.Dispatch<SetStateAction<addressInfo>>;
}
export default function InfoCard({
  selectedMarker,
  setAddressInfo,
}: InfoCardProps) {
  return (
    <Card className="z-30 w-[328px] absolute bottom-6 left-1/2 right-1/2 -translate-x-1/2">
      <CardHeader>
        <CardTitle className="text-center underline text-title">
          {selectedMarker.content}
        </CardTitle>
        <CardDescription className="text-center">
          {selectedMarker.address}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <DialogClose>
          <Button
          onClick={() => {
            setAddressInfo({
              latitude: selectedMarker.position.lat,
              longitude: selectedMarker.position.lng,
              address: selectedMarker.address,
              content: selectedMarker.content
            });
          }}
        >
          선택
        </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
}
