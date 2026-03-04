"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { trpc } from "@/services/trpc";

export default function Dashboard() {
  const privateData = useQuery(trpc.privateData.queryOptions());
  const toggleMutation = useMutation(
    trpc.invite.send.mutationOptions({
      onSuccess: (data) => {
        console.log("sent", data);
      },
      onError: (err) => {
        console.error("send email error", err);
      },
    })
  );

  return (
    <>
      <p>API: {privateData.data?.message}</p>
      <button
        className="cursor-pointer rounded-md bg-blue-500 p-2 text-white transition-all duration-300 hover:bg-blue-600"
        onClick={() => toggleMutation.mutate({})}
        type="button"
      >
        send email
      </button>
    </>
  );
}
