import { render, screen } from "@testing-library/react";
import Page from "../page";
import { describe, expect, test, vi } from "vitest";

// mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => vi.fn()),
}));

// this is the tets case for the app landing page
describe("landing page", () => {
  test("renders correctly", () => {
    render(<Page />);
    expect(screen.getByText("OverView"));
    expect(screen.getByText("Task"));
  });
});
