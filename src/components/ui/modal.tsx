import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogOverlay } from "./dialog";

export default function Modal({children}: {children:React.ReactNode}) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  }
  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogOverlay className='flex justify-center items-center'>
        <DialogContent className = 'overflow-y-hidden'>
        {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
