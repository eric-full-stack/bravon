"use client";

import { getNotificationsFromStudent } from "@/lib/api";
import { useQuery } from "react-query";
import Loading from "@/components/loading";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function NotificationTable({
  studentId,
}: {
  studentId: number;
}) {
  const { data, isLoading, isFetching } = useQuery(
    ["notifications-from-student", studentId],
    () => getNotificationsFromStudent(studentId),
  );

  if (isLoading || isFetching) return <Loading />;
  return (
    <div className="mt-8 pb-12">
      <DataTable data={data || []} columns={columns} columnSearch={"type"} />
    </div>
  );
}
