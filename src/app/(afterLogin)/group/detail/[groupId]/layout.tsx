import GroupDescription from './_component/GroupDescription';
import GroupAddress from './_component/GroupAddress';
import TimeUntilStart from './_component/TimeUntilStart';
import GroupTime from './_component/GroupTime';
import { ButtonGroup } from './_component/ButtonGroup';
import GroupMembers from './_component/GroupMembers';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchGroupDataServer } from './_lib/fetchGroupDataServer';
import useRouter, { redirect } from 'next/navigation';
import { ErrorComponent } from './_component/ErrorComponent';
export async function generateMetadata({
  params,
}: {
  params: { groupId: string };
}) {
  try {
    const response = await fetchGroupDataServer({
      queryKey: ['groupDetail', Number(params.groupId)],
    });

    return {
      title: `${response.name} : 아모르각코`,
      description: `${response.description}`,
    };
  } catch (error) {
    console.error(error);
  }
}
export default async function RootLayout({
  children,
  location,
  params,
}: Readonly<{
  children: React.ReactNode;
  location: React.ReactNode;
  params: { groupId: string };
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['groupDetail', Number(params.groupId)],
    queryFn: fetchGroupDataServer,
  });
  const data = queryClient.getQueryData([
    'groupDetail',
    Number(params.groupId),
  ]);

  const dehydratedState = data ? dehydrate(queryClient) : null;
  const groupId = Number(params.groupId);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-w-[312px] w-full max-w-96 py-6 gap-6 mb-0.5">
        <HydrationBoundary state={dehydratedState}>
          {data ? (
            <>
              <GroupDescription groupId={groupId} />
              <GroupAddress groupId={groupId} />
              {children}
              {location}
              <GroupMembers groupId={groupId} />
              <TimeUntilStart groupId={groupId} />
              <GroupTime groupId={groupId} />
              <ButtonGroup groupId={groupId} />
            </>
          ) : (
            <ErrorComponent />
          )}
        </HydrationBoundary>
      </div>
    </div>
  );
}
