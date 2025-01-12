import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InfoForm } from "./_component/InfoForm";

export async function generateMetadata () {
  return {
    title:'추가 정보 입력 : 아모르각코'
  }
}

export default function Page() {
  return (
    <InfoForm />
  );
}
