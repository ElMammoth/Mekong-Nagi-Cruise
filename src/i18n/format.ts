import type { Locale } from "./config";

/*
 * Pure formatting helpers, safe to import from client components (no message files here,
 * so no language's copy is pulled into the browser bundle by accident).
 */

export type Vars = Record<string, string | number>;

/** Fills `{name}` placeholders. Unknown placeholders are left as they are. */
export function fmt(template: string, vars: Vars = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export type PluralForms = { one: string; other: string } & Partial<
  Record<"zero" | "two" | "few" | "many", string>
>;

/** Picks the plural form for `count` with the language's own rules, then fills `{count}`. */
export function plural(locale: Locale, forms: PluralForms, count: number, vars: Vars = {}) {
  const rule = new Intl.PluralRules(locale).select(count) as keyof PluralForms;
  return fmt(forms[rule] ?? forms.other, { count, ...vars });
}
