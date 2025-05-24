import { Button } from "~/components/ui/Button";

// thi is the first page of the app
export default function Home() {
  return (
    <div className="flex-1">
      <p className="text-red-300 text-6xl w-full mx-auto text-center">
        This is Next app
      </p>
      <Button>Click me</Button>
    </div>
  );
}
