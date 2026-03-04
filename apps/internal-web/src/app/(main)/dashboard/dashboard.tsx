"use client";
import { useQuery } from "@tanstack/react-query";

import { trpc } from "@/services/trpc";

export default function Dashboard() {
  const privateData = useQuery(trpc.privateData.queryOptions());

  return <p>API: {privateData.data?.message}</p>;
}
