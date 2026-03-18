import { describe, it, expect } from "vitest";
import { Dynamicbot } from "../src/core.js";
describe("Dynamicbot", () => {
  it("init", () => { expect(new Dynamicbot().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Dynamicbot(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Dynamicbot(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
