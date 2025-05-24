"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  // router from next
  const router = useRouter();

  return (
    <div className="flex-1">
      {/* Navigate on click */}
      <Button onClick={() => router.push("/overview")}>OverView</Button>
      <Button onClick={() => router.push("/task")}>Task</Button>
    </div>
  );
}
