import { GroupForm } from "./_component/GroupForm";
export async function generateMetadata() {
  return {
    title: '그룹 등록 : 아모르각코'
  }
}

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between mt-6">
      <GroupForm />
    </main>
  );
}
