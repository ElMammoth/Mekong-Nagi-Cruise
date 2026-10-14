import { describe, expect, it } from "vitest";
import { routeText } from "@/components/ui/route-label";

describe("route labels", () => {
  it("spells the arrow out where an icon can't be used", () => {
    expect(routeText("Downstream · Houay Xai → Luang Prabang")).toBe(
      "Downstream · Houay Xai to Luang Prabang",
    );
  });
});
