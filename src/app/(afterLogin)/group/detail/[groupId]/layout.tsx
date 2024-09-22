import GroupDescription from './_component/GroupDescription';
import GroupAddress from './_component/GroupAddress';
import TimeUntilStart from './_component/TimeUntilStart';
import GroupTime from './_component/GroupTime';
import { ButtonGroup } from './_component/ButtonGroup';
import GroupMembers from './_component/GroupMembers';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { fetchGroupData } from './_lib/fetchGroupData';
export async function generateMetadata({params}: {params: {groupId: string}}) {
  const response = await fetchGroupData({queryKey: ['groupDetail',Number(params.groupId)]});
  return {
    title: `${response.name}`,
    description: `${response.description}`,
  }
}
export default async function RootLayout({
  children,
  location,
  params
}: Readonly<{
  children: React.ReactNode,
  location: React.ReactNode;
  params: {groupId:string}
}>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['groupDetail',Number(params.groupId)], queryFn: fetchGroupData})
  const dehydratedState = dehydrate(queryClient)
  const groupId = Number(params.groupId)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-w-[312px] w-full max-w-96 py-6 gap-6 mb-0.5">
      <HydrationBoundary state={dehydratedState}>
        <GroupDescription groupId = {groupId} />
        <GroupAddress groupId = {groupId} />
        {children}
        {location}
        <GroupMembers groupId = {groupId} />
        <TimeUntilStart groupId = {groupId} />
        <GroupTime groupId = {groupId}/>
        <ButtonGroup groupId = {groupId} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
