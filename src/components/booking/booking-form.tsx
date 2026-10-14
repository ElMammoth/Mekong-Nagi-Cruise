"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { RadioGroup } from "radix-ui";
import { CalendarDays, Mail, MessageCircle, Minus, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import type { Trip } from "@/content/types";
import { cn } from "@/lib/cn";
import {
  availableOptions,
  formatWeekdays,
  parseIsoDate,
  toIsoDate,
  upcomingDepartures,
} from "@/lib/departures";
import {
  buildInquiryMessage,
  mailtoUrl,
  validateInquiry,
  whatsappUrl,
  type InquiryErrors,
} from "@/lib/inquiry";
import { estimateTotal, formatAmount, formatMoney } from "@/lib/money";

const FLEXIBLE = "flexible";
const MAX_TRAVELLERS = 40;

const noopSubscribe = () => () => {};
/** Today's date on the client only, so static HTML never shows stale departures. */
function useToday(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => toIsoDate(new Date()),
    () => null,
  );
}

const dateLabel = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseIsoDate(iso));

interface BookingFormProps {
  trips: Trip[];
  defaultTrip?: string;
  /** Hide the trip selector (used on a trip's own page). */
  lockTrip?: boolean;
}

export function BookingForm({ trips, defaultTrip, lockTrip = false }: BookingFormProps) {
  const id = useId();
  const today = useToday();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const [tripSlug, setTripSlug] = useState(defaultTrip ?? trips[0]?.slug ?? "");
  const [date, setDate] = useState<string>("");
  const [travellers, setTravellers] = useState(2);
  const [optionId, setOptionId] = useState<string>("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);

  const trip = trips.find((t) => t.slug === tripSlug) ?? trips[0];
  const options = useMemo(
    () => (trip && today ? availableOptions(trip.options, today) : []),
    [trip, today],
  );
  const departures = useMemo(
    () =>
      trip && today ? upcomingDepartures(trip.departures.weekdays, parseIsoDate(today), 6) : [],
    [trip, today],
  );

  const option = options.find((o) => o.id === optionId) ?? options[0];
  const total = option ? estimateTotal(option, travellers) : undefined;
  const estimate =
    total !== undefined
      ? `${formatAmount(total, "USD")} for ${travellers} ${travellers === 1 ? "traveller" : "travellers"}`
      : undefined;

  if (!trip) return null;

  function changeTrip(slug: string) {
    setTripSlug(slug);
    setDate("");
    setOptionId("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "email" ? "email" : "whatsapp";
    const data = new FormData(event.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "").trim();

    const input = {
      name: text("name"),
      email: text("email") || undefined,
      phone: text("phone") || undefined,
      trip: trip!.name,
      date: date && date !== FLEXIBLE ? date : undefined,
      dateLabel: date && date !== FLEXIBLE ? dateLabel(date) : undefined,
      travellers,
      option: option ? `${option.label} (${formatMoney(option.perPerson)} per person)` : undefined,
      estimate,
      diet: text("diet") || undefined,
      message: text("message") || undefined,
    };

    const found = validateInquiry(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSentVia(null);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    const body = buildInquiryMessage(input);
    if (channel === "whatsapp") {
      window.open(whatsappUrl(body), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoUrl(`Booking request: ${trip!.shortName}`, body);
    }
    setSentVia(channel);
  }

  const errorList = Object.entries(errors);
  const fieldId = (name: string) => `${id}-${name}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-10">
        {errorList.length > 0 ? (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            className="rounded-xl border-2 border-lantern bg-paper p-5 focus:outline-none"
          >
            <h3 className="font-sans text-base font-semibold text-lantern">
              Please check {errorList.length === 1 ? "one detail" : `${errorList.length} details`}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${fieldId(field)}`} className="text-lantern underline">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* 1. Trip */}
        <fieldset className="space-y-4">
          <legend className="font-display text-h3 font-semibold text-maroon">
            <StepNumber n={1} /> Your trip
          </legend>
          {lockTrip ? (
            <p className="rounded-xl border border-silt bg-paper p-4 font-semibold text-maroon">
              {trip.name}
            </p>
          ) : (
            <Field label="Cruise or journey" htmlFor={fieldId("trip")} error={errors.trip}>
              {(d) => (
                <>
                  <select
                    aria-describedby={d}
                    id={fieldId("trip")}
                    name="trip"
                    value={tripSlug}
                    onChange={(e) => changeTrip(e.target.value)}
                    className={inputClass(Boolean(errors.trip))}
                  >
                    {trips.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.shortName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </Field>
          )}
        </fieldset>

        {/* 2. Date */}
        <fieldset className="space-y-4">
          <legend className="font-display text-h3 font-semibold text-maroon">
            <StepNumber n={2} /> {trip.departures.label}
          </legend>
          <p className="-mt-2 text-muted">
            {formatWeekdays(trip.departures.weekdays)}.{" "}
            {trip.departures.note ?? "Pick a date or tell us you’re flexible."}
          </p>
          {today ? (
            <RadioGroup.Root
              value={date}
              onValueChange={setDate}
              aria-label={`${trip.departures.label}: choose a date`}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {departures.map((iso) => {
                const d = parseIsoDate(iso);
                return (
                  <ChoiceCard key={iso} value={iso} ariaLabel={dateLabel(iso)}>
                    <span className="block text-sm font-semibold text-muted">
                      {d.toLocaleDateString("en-GB", { weekday: "long" })}
                    </span>
                    <span className="block font-display text-xl font-semibold text-maroon">
                      {d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </ChoiceCard>
                );
              })}
              <ChoiceCard value={FLEXIBLE} ariaLabel="Another date or I’m flexible">
                <span className="block text-sm font-semibold text-muted">Another date</span>
                <span className="block font-display text-xl font-semibold text-maroon">
                  I’m flexible
                </span>
              </ChoiceCard>
            </RadioGroup.Root>
          ) : (
            <p className="flex items-center gap-2 rounded-xl border border-silt bg-paper p-4 text-muted">
              <CalendarDays aria-hidden="true" className="size-5" />
              Loading the next departures…
            </p>
          )}
        </fieldset>

        {/* 3. Travellers & option */}
        <fieldset className="space-y-5">
          <legend className="font-display text-h3 font-semibold text-maroon">
            <StepNumber n={3} /> Travellers & stay
          </legend>
          <Field
            label="Number of travellers"
            htmlFor={fieldId("travellers")}
            error={errors.travellers}
            hint={trip.minimum}
          >
            {(d) => (
              <>
                <div className="inline-flex items-center rounded-full border border-maroon/25 bg-paper">
                  <button
                    type="button"
                    onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                    disabled={travellers <= 1}
                    aria-label="One traveller fewer"
                    className="grid size-11 place-items-center rounded-full text-maroon hover:bg-sand disabled:opacity-40"
                  >
                    <Minus aria-hidden="true" className="size-4" />
                  </button>
                  <input
                    aria-describedby={d}
                    id={fieldId("travellers")}
                    name="travellers"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_TRAVELLERS}
                    value={travellers}
                    onChange={(e) =>
                      setTravellers(
                        Math.min(MAX_TRAVELLERS, Math.max(1, Number(e.target.value) || 1)),
                      )
                    }
                    aria-invalid={Boolean(errors.travellers) || undefined}
                    className="w-14 [appearance:textfield] bg-transparent text-center text-lg font-semibold text-maroon focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTravellers((n) => Math.min(MAX_TRAVELLERS, n + 1))}
                    disabled={travellers >= MAX_TRAVELLERS}
                    aria-label="One more traveller"
                    className="grid size-11 place-items-center rounded-full text-maroon hover:bg-sand disabled:opacity-40"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </>
            )}
          </Field>

          {options.length > 1 ? (
            <div>
              <p id={fieldId("option-label")} className="mb-2 font-semibold text-ink">
                Night in Pak Beng
              </p>
              <RadioGroup.Root
                value={option?.id}
                onValueChange={setOptionId}
                aria-labelledby={fieldId("option-label")}
                className="grid gap-3 sm:grid-cols-2"
              >
                {options.map((o) => (
                  <ChoiceCard
                    key={o.id}
                    value={o.id}
                    ariaLabel={`${o.label}, ${formatMoney(o.perPerson)} per person`}
                  >
                    <span className="block font-semibold text-maroon">{o.label}</span>
                    <span className="block text-sm text-muted">
                      {formatMoney(o.perPerson)} per person
                    </span>
                  </ChoiceCard>
                ))}
              </RadioGroup.Root>
            </div>
          ) : null}
        </fieldset>

        {/* 4. Contact */}
        <fieldset className="space-y-5">
          <legend className="font-display text-h3 font-semibold text-maroon">
            <StepNumber n={4} /> Your details
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor={fieldId("name")} error={errors.name} required>
              {(d) => (
                <>
                  <input
                    aria-describedby={d}
                    id={fieldId("name")}
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name) || undefined}
                    className={inputClass(Boolean(errors.name))}
                  />
                </>
              )}
            </Field>
            <Field label="Email" htmlFor={fieldId("email")} error={errors.email} optional>
              {(d) => (
                <>
                  <input
                    aria-describedby={d}
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email) || undefined}
                    className={inputClass(Boolean(errors.email))}
                  />
                </>
              )}
            </Field>
            <Field label="Phone or WhatsApp" htmlFor={fieldId("phone")} optional>
              {(d) => (
                <>
                  <input
                    aria-describedby={d}
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass(false)}
                  />
                </>
              )}
            </Field>
            <Field
              label="Dietary needs"
              htmlFor={fieldId("diet")}
              hint="Vegan, vegetarian and halal available"
            >
              {(d) => (
                <>
                  <input
                    aria-describedby={d}
                    id={fieldId("diet")}
                    name="diet"
                    className={inputClass(false)}
                  />
                </>
              )}
            </Field>
          </div>
          <Field label="Anything else?" htmlFor={fieldId("message")} optional>
            {(d) => (
              <>
                <textarea
                  aria-describedby={d}
                  id={fieldId("message")}
                  name="message"
                  rows={4}
                  className={cn(inputClass(false), "min-h-28 py-3")}
                />
              </>
            )}
          </Field>
        </fieldset>
      </div>

      {/* Summary */}
      <aside aria-label="Booking summary" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-card border border-silt bg-paper p-6 shadow-card">
          <h3 className="text-h3">Your request</h3>
          <dl className="mt-4 space-y-3 text-[0.9375rem]">
            <SummaryRow term="Trip" value={trip.shortName} />
            <SummaryRow
              term="Date"
              value={date === FLEXIBLE ? "Flexible" : date ? dateLabel(date) : "Not chosen yet"}
            />
            <SummaryRow term="Travellers" value={String(travellers)} />
            {option ? <SummaryRow term="Option" value={option.label} /> : null}
          </dl>
          <div className="mt-5 border-t border-silt pt-5" aria-live="polite">
            {estimate ? (
              <>
                <p className="text-sm text-muted">Estimated total</p>
                <p className="font-display text-3xl font-semibold text-maroon">
                  {formatAmount(total!, "USD")}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Based on published prices
                  {travellers === 1 && option?.singleSupplement ? ", incl. single supplement" : ""}.
                  We confirm the final price.
                </p>
              </>
            ) : (
              <p className="text-muted">{trip.priceOnRequest ?? "We’ll send you a quote."}</p>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Button type="submit" name="channel" value="whatsapp" size="lg" className="w-full">
              <MessageCircle aria-hidden="true" />
              Send on WhatsApp
            </Button>
            <Button
              type="submit"
              name="channel"
              value="email"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              <Mail aria-hidden="true" />
              Send by email
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            Nothing is charged online. Your message opens in WhatsApp or your email app, ready to
            send. {site.contact.replyPromise}
          </p>

          <div role="status" aria-live="polite">
            {sentVia ? (
              <p className="mt-4 flex gap-2 rounded-xl bg-river p-4 text-sm text-sand">
                <Send aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  Your request is ready in {sentVia === "whatsapp" ? "WhatsApp" : "your email app"}.
                  Press send there. Nothing opened? Write to{" "}
                  <a href={`mailto:${site.contact.email}`} className="font-semibold underline">
                    {site.contact.email}
                  </a>{" "}
                  or call {site.contact.phoneDisplay}.
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </aside>
    </form>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="mr-2 inline-grid size-8 place-items-center rounded-full bg-vermilion/10 align-middle font-sans text-base text-lantern"
    >
      {n}
    </span>
  );
}

function ChoiceCard({
  value,
  ariaLabel,
  children,
}: {
  value: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <RadioGroup.Item
      value={value}
      aria-label={ariaLabel}
      className="rounded-xl border border-silt bg-paper p-4 text-left transition-colors hover:border-maroon/40 data-[state=checked]:border-lantern data-[state=checked]:bg-vermilion/5 data-[state=checked]:shadow-[inset_0_0_0_1px_var(--color-lantern)]"
    >
      {children}
    </RadioGroup.Item>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  children: (describedBy: string | undefined) => React.ReactNode;
}) {
  const describedBy =
    [error ? `${htmlFor}-error` : null, hint ? `${htmlFor}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-lantern" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {children(describedBy)}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm font-semibold text-lantern">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SummaryRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{term}</dt>
      <dd className="text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block min-h-12 w-full rounded-control border bg-paper px-4 text-base text-ink transition-colors placeholder:text-muted/70 focus:border-lantern focus:outline-2 focus:outline-offset-0 focus:outline-lantern/30",
    invalid ? "border-lantern" : "border-maroon/25 hover:border-maroon/45",
  );
}
