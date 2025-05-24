"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// initialize the query client
const client = new QueryClient();

export default function Home() {
  // router from next
  const router = useRouter();

  return (
    <div className="flex-1">
      <QueryClientProvider client={client}>
        {/* Navigate on click */}
        <Button onClick={() => router.push("/overview")}>OverView</Button>
        <Button onClick={() => router.push("/task")}>Task</Button>
      </QueryClientProvider>
    </div>
  );
}
