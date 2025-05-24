"use client";

import { Button } from "~/components/button/button";
import { useRouter } from "next/navigation";

// this is the first screen of the app
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
