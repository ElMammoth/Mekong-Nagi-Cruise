import { describe, expect, it, vi } from "vitest";
import { createBrevoAdapter, isBrevoFormUrl } from "./brevo";
import { isValidEmail, newsletterAdapter } from "./index";

const FORM = "https://abc123.sibforms.com/serve/MUIFAExample";
const request = { email: "guest@example.com", locale: "fr", source: "/fr/" };
const reply = (body: unknown) =>
  vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(body)));

describe("newsletter", () => {
  it("accepts ordinary addresses and rejects broken ones", () => {
    for (const ok of ["a@b.co", "first.last+trip@mail.example.org", " name@domain.la "])
      expect(isValidEmail(ok), ok).toBe(true);
    for (const bad of ["", "name", "name@", "@domain.com", "name@domain", "a b@c.com", "a@b..com"])
      expect(isValidEmail(bad), bad).toBe(false);
  });

  it("uses the stub until a provider is chosen, and fails loudly on unknown names", async () => {
    expect(newsletterAdapter(undefined).name).toBe("stub");
    expect(() => newsletterAdapter("nope")).toThrow(/Unknown/);
    const stub = newsletterAdapter("stub");
    expect(await stub.subscribe({ email: "bad", locale: "en", source: "/" })).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("selects Brevo only with a real Brevo form URL", () => {
    expect(newsletterAdapter("brevo", FORM).name).toBe("brevo");
    expect(() => newsletterAdapter("brevo", undefined)).toThrow(/NEXT_PUBLIC_BREVO_FORM_URL/);
    for (const bad of [
      "http://abc.sibforms.com/serve/x",
      "https://evil.example.com/serve/x",
      "https://sibforms.com.evil.example/serve/x",
      "https://abc.sibforms.com/other",
      "not a url",
    ])
      expect(isBrevoFormUrl(bad), bad).toBe(false);
    expect(isBrevoFormUrl(FORM)).toBe(true);
  });
});

describe("Brevo adapter", () => {
  it("posts the email, an empty honeypot and the language to <form>?isAjax=1", async () => {
    const fetchMock = reply({ success: true });
    const result = await createBrevoAdapter(FORM, fetchMock).subscribe(request);
    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe(`${FORM}?isAjax=1`);
    expect(init?.method).toBe("POST");
    const body = init?.body as FormData;
    expect(body.get("EMAIL")).toBe("guest@example.com");
    expect(body.get("email_address_check")).toBe("");
    expect(body.get("locale")).toBe("fr");
  });

  it("falls back to English for languages Brevo forms don't speak", async () => {
    const fetchMock = reply({ success: true });
    await createBrevoAdapter(FORM, fetchMock).subscribe({ ...request, locale: "th" });
    expect((fetchMock.mock.calls[0]![1]?.body as FormData).get("locale")).toBe("en");
  });

  it("maps Brevo's answers and network failures to our results", async () => {
    const invalid = reply({ success: false, errors: { EMAIL: "Invalid" } });
    expect(await createBrevoAdapter(FORM, invalid).subscribe(request)).toEqual({
      ok: false,
      reason: "invalid",
    });
    const other = reply({ success: false, message: "Try later" });
    expect(await createBrevoAdapter(FORM, other).subscribe(request)).toEqual({
      ok: false,
      reason: "failed",
    });
    const down = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await createBrevoAdapter(FORM, down).subscribe(request)).toEqual({
      ok: false,
      reason: "failed",
    });
    const html = vi.fn<typeof fetch>().mockResolvedValue(new Response("<html>"));
    expect(await createBrevoAdapter(FORM, html).subscribe(request)).toEqual({
      ok: false,
      reason: "failed",
    });
  });
});
