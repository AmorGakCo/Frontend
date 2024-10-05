import Modal from '@/components/ui/modal';
import MapContainer from './_component/MapContainer';
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { addressInfo } from '@/app/_types/Map';

interface MapModalProps {
  setAddressInfo: React.Dispatch<React.SetStateAction<addressInfo>>
}
export default function MapModal({setAddressInfo}:MapModalProps) {
  return (
    <DialogContent className="sm:max-w-md md:max-w-screen-md lg:max-w-screen-lg w-full h-modalHeight p-0 rounded-md overflow-hidden">
      <DialogTitle className="hidden">map</DialogTitle>
      <div className="w-full h-full">
        <MapContainer setAddressInfo = {setAddressInfo}
        />
      </div>
      <DialogClose className="absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  );
}
