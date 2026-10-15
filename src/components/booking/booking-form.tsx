"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { Checkbox, RadioGroup } from "radix-ui";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Send,
} from "lucide-react";
import { ApproximateNote, DualPrice, useDualPriceText } from "@/components/currency/price";
import { Button } from "@/components/ui/button";
import { RouteLabel, routeText } from "@/components/ui/route-label";
import { site } from "@/content/site";
import type { Trip } from "@/content/types";
import { useI18n } from "@/i18n/client";
import { localeInfo } from "@/i18n/config";
import { fmt, plural } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/en";
import { interpolate } from "@/i18n/rich";
import { cn } from "@/lib/cn";
import { estimateTotalUsd, formatCurrency } from "@/lib/currency";
import {
  availableOptions,
  formatWeekdays,
  parseIsoDate,
  upcomingDepartures,
} from "@/lib/departures";
import {
  buildInquiryMessage,
  mailtoUrl,
  validateInquiry,
  whatsappUrl,
  type InquiryErrors,
} from "@/lib/inquiry";
import { useToday } from "@/lib/use-today";

const FLEXIBLE = "flexible";
const MAX_TRAVELLERS = 40;

const noopSubscribe = () => () => {};
/** `?option=le-grande` preselects a package (links from the package cards). */
function useOptionFromUrl(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("option"),
    () => null,
  );
}

const LONG_DATE: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
const dateLabel = (iso: string, intl: string) =>
  new Intl.DateTimeFormat(intl, LONG_DATE).format(parseIsoDate(iso));

interface BookingFormProps {
  trips: Trip[];
  defaultTrip?: string;
  /** Hide the trip selector (used on a trip's own page). */
  lockTrip?: boolean;
  /** Extra content under the summary card, e.g. a review. */
  asideFooter?: ReactNode;
  /** Form copy in the page's language (`booking` in the translation files). */
  copy: Messages["booking"];
  replyPromise: string;
}

export function BookingForm({
  trips,
  defaultTrip,
  lockTrip = false,
  asideFooter,
  copy: t,
  replyPromise,
}: BookingFormProps) {
  const { locale, intl, m } = useI18n();
  const dualText = useDualPriceText();
  const id = useId();
  const today = useToday();
  const urlOption = useOptionFromUrl();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const [tripSlug, setTripSlug] = useState(defaultTrip ?? trips[0]?.slug ?? "");
  const [date, setDate] = useState<string>("");
  const [travellers, setTravellers] = useState(2);
  const [optionId, setOptionId] = useState<string>("");
  const [extras, setExtras] = useState<string[]>([]);
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

  const option = options.find((o) => o.id === (optionId || urlOption)) ?? options[0];
  const total = option ? estimateTotalUsd(option, travellers) : undefined;
  /** For the operator: always US dollars, in English. */
  const usd = (amount: number) => formatCurrency(amount, "USD", "en-GB");
  const estimate =
    total !== undefined
      ? `${usd(total)} for ${travellers} ${travellers === 1 ? "traveller" : "travellers"}`
      : undefined;

  if (!trip) return null;

  function changeTrip(slug: string) {
    setTripSlug(slug);
    setDate("");
    setOptionId("");
    setExtras([]);
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
      trip: trip!.operator.name,
      date: date && date !== FLEXIBLE ? date : undefined,
      dateLabel: date && date !== FLEXIBLE ? dateLabel(date, "en-GB") : undefined,
      travellers,
      option: option
        ? `${trip!.operator.options[option.id] ?? option.label} (${usd(option.usd)} per person)`
        : undefined,
      estimate,
      extras: extras.length
        ? extras.map((e) => trip!.operator.extras[trip!.extras?.indexOf(e) ?? -1] ?? e)
        : undefined,
      diet: text("diet") || undefined,
      message: text("message") || undefined,
      language: locale === "en" ? undefined : localeInfo[locale].nativeName,
    };

    const found = validateInquiry(input, t.errors);
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
      window.location.href = mailtoUrl(`Booking request: ${routeText(trip!.operator.name)}`, body);
    }
    setSentVia(channel);
  }

  const errorList = Object.entries(errors);
  const fieldId = (name: string) => `${id}-${name}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-sidebar">
      {/* One column of steps, centred in its column and capped (max-w-form) so every field
          shares one left edge at every width. */}
      <div className="mx-auto w-full max-w-form min-w-0 space-y-10">
        {errorList.length > 0 ? (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            className="rounded-sm border-2 border-accent bg-surface p-5 focus:outline-none"
          >
            <h3 className="text-base text-accent">
              {plural(locale, t.checkCount, errorList.length)}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${fieldId(field)}`} className="text-primary underline">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* 1. Trip */}
        <fieldset className="space-y-4">
          <legend className="font-display text-h3 text-heading">
            <StepNumber n={1} /> {t.stepTrip}
          </legend>
          {lockTrip ? (
            <p className="rounded-sm border border-line bg-surface p-4 text-heading">{trip.name}</p>
          ) : (
            <Field label={t.tripField} htmlFor={fieldId("trip")} error={errors.trip}>
              {(d) => (
                <div className="relative">
                  <select
                    aria-describedby={d}
                    id={fieldId("trip")}
                    name="trip"
                    value={tripSlug}
                    onChange={(e) => changeTrip(e.target.value)}
                    className={cn(inputClass(Boolean(errors.trip)), "appearance-none pr-11")}
                  >
                    {trips.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {routeText(option.shortName, m.common.routeTo)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary"
                  />
                </div>
              )}
            </Field>
          )}
        </fieldset>

        {/* 2. Date */}
        <fieldset className="space-y-4">
          <legend className="font-display text-h3 text-heading">
            <StepNumber n={2} /> {trip.departures.label}
          </legend>
          <p className="-mt-2 text-muted">
            {formatWeekdays(trip.departures.weekdays, intl)}. {trip.departures.note ?? t.dateHint}
          </p>
          {today ? (
            <RadioGroup.Root
              value={date}
              onValueChange={setDate}
              aria-label={fmt(t.chooseDate, { label: trip.departures.label })}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {departures.map((iso) => {
                const d = parseIsoDate(iso);
                return (
                  <ChoiceCard key={iso} value={iso} ariaLabel={dateLabel(iso, intl)}>
                    <span className="block text-sm text-muted">
                      {d.toLocaleDateString(intl, { weekday: "long" })}
                    </span>
                    <span className="block font-display text-xl text-heading">
                      {d.toLocaleDateString(intl, { day: "numeric", month: "short" })}
                    </span>
                  </ChoiceCard>
                );
              })}
              <ChoiceCard value={FLEXIBLE} ariaLabel={t.flexibleLabel}>
                <span className="block text-sm text-muted">{t.anotherDate}</span>
                <span className="block font-display text-xl text-heading">{t.flexible}</span>
              </ChoiceCard>
            </RadioGroup.Root>
          ) : (
            <p className="flex items-center gap-2 rounded-sm border border-line bg-surface p-4 text-muted">
              <CalendarDays aria-hidden="true" className="size-5" />
              {t.loadingDates}
            </p>
          )}
        </fieldset>

        {/* 3. Travellers & option */}
        <fieldset className="space-y-5">
          <legend className="font-display text-h3 text-heading">
            <StepNumber n={3} /> {t.stepTravellers}
          </legend>
          <Field
            label={t.travellers}
            htmlFor={fieldId("travellers")}
            error={errors.travellers}
            hint={trip.minimum}
          >
            {(d) => (
              <>
                <div className="inline-flex h-field items-stretch self-start justify-self-start rounded-sm border border-control bg-surface focus-within:border-primary">
                  <button
                    type="button"
                    onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                    disabled={travellers <= 1}
                    aria-label={t.fewer}
                    className="grid w-11 place-items-center rounded-sm text-heading hover:bg-surface-tint disabled:opacity-40"
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
                    className="w-14 appearance-none bg-transparent text-center text-lg text-heading focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTravellers((n) => Math.min(MAX_TRAVELLERS, n + 1))}
                    disabled={travellers >= MAX_TRAVELLERS}
                    aria-label={t.more}
                    className="grid w-11 place-items-center rounded-sm text-heading hover:bg-surface-tint disabled:opacity-40"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </>
            )}
          </Field>

          {options.length > 1 ? (
            <div>
              <p id={fieldId("option-label")} className="mb-2 font-display text-sm text-heading">
                {t.nightIn}
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
                    ariaLabel={`${o.label}, ${dualText(o.usd)} ${m.common.perPerson}`}
                  >
                    <span className="block font-display text-sm text-heading">{o.label}</span>
                    <span className="block text-sm text-muted">
                      <DualPrice usd={o.usd} /> {m.common.perPerson}
                    </span>
                  </ChoiceCard>
                ))}
              </RadioGroup.Root>
            </div>
          ) : null}

          {trip.extras?.length ? (
            <div role="group" aria-labelledby={fieldId("extras-label")}>
              <p id={fieldId("extras-label")} className="font-display text-sm text-heading">
                {t.alsoAsk} <span className="font-sans text-base text-muted">{t.optional}</span>
              </p>
              <p className="text-sm text-muted">{t.alsoAskHint}</p>
              <ul className="mt-3 space-y-2">
                {trip.extras.map((extra, i) => {
                  const extraId = fieldId(`extra-${i}`);
                  const checked = extras.includes(extra);
                  return (
                    <li key={extra} className="flex items-start gap-3">
                      <Checkbox.Root
                        id={extraId}
                        checked={checked}
                        onCheckedChange={(value) =>
                          setExtras((list) =>
                            value === true ? [...list, extra] : list.filter((e) => e !== extra),
                          )
                        }
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-xs border border-control bg-surface data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                      >
                        <Checkbox.Indicator>
                          <Check aria-hidden="true" className="size-4 text-on-primary" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor={extraId} className="cursor-pointer">
                        {extra}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </fieldset>

        {/* 4. Contact */}
        <fieldset className="space-y-5">
          <legend className="font-display text-h3 text-heading">
            <StepNumber n={4} /> {t.stepDetails}
          </legend>
          {/* Two equal columns from `sm`. Each field is a subgrid of three rows (label, control,
              message), so labels, inputs and messages line up across a row even when one label
              wraps in a longer language or an error appears. */}
          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <Field
              label={t.name}
              htmlFor={fieldId("name")}
              error={errors.name}
              required
              requiredLabel={t.required}
              subgrid
            >
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
            <Field
              label={t.email}
              htmlFor={fieldId("email")}
              error={errors.email}
              optional={t.optional}
              subgrid
            >
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
            <Field
              label={t.phone}
              htmlFor={fieldId("phone")}
              optional={t.optional}
              hint={t.phoneHint}
              subgrid
            >
              {(d) => (
                <>
                  <input
                    aria-describedby={d}
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={inputClass(false)}
                  />
                </>
              )}
            </Field>
            <Field
              label={t.diet}
              htmlFor={fieldId("diet")}
              optional={t.optional}
              hint={t.dietHint}
              subgrid
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
          <Field label={t.message} htmlFor={fieldId("message")} optional={t.optional}>
            {(d) => (
              <>
                <textarea
                  aria-describedby={d}
                  id={fieldId("message")}
                  name="message"
                  rows={4}
                  className={cn(inputClass(false), "h-auto min-h-28 py-3")}
                />
              </>
            )}
          </Field>
        </fieldset>
      </div>

      {/* Summary */}
      <aside
        aria-label={t.summary}
        className="mx-auto w-full max-w-form lg:sticky lg:top-24 lg:max-w-none lg:self-start"
      >
        <div className="rounded-md border border-line bg-surface p-6 shadow-sm">
          <h3 className="text-h3">{t.yourRequest}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <SummaryRow term={t.trip} value={<RouteLabel text={trip.shortName} />} />
            <SummaryRow
              term={t.date}
              value={
                date === FLEXIBLE ? t.flexibleShort : date ? dateLabel(date, intl) : t.notChosen
              }
            />
            <SummaryRow term={t.travellersShort} value={travellers.toLocaleString(intl)} />
            {option ? <SummaryRow term={t.option} value={option.label} /> : null}
            {extras.length ? <SummaryRow term={t.alsoAsking} value={extras.join("; ")} /> : null}
          </dl>
          <div className="mt-5 border-t border-line pt-5" aria-live="polite">
            {total !== undefined ? (
              <>
                <p className="text-sm text-muted">
                  {t.estimate} {plural(locale, t.estimateFor, travellers)}
                </p>
                <p>
                  <DualPrice
                    usd={total}
                    className="flex flex-wrap items-baseline gap-x-2"
                    mainClassName="font-display text-3xl text-heading"
                    secondaryClassName="text-sm text-muted"
                  />
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t.basedOn}
                  {travellers === 1 && option?.singleSupplementUsd ? t.inclSupplement : ""}.{" "}
                  {t.weConfirm}
                </p>
                <ApproximateNote className="mt-2" />
              </>
            ) : (
              <p className="text-muted">{trip.priceOnRequest ?? t.quote}</p>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Button
              type="submit"
              name="channel"
              value="whatsapp"
              size="lg"
              variant="cta"
              className="w-full"
            >
              <MessageCircle aria-hidden="true" />
              {t.sendWhatsApp}
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
              {t.sendEmail}
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">{replyPromise}</p>

          <div role="status" aria-live="polite">
            {sentVia ? (
              <p className="mt-4 flex gap-2 rounded-sm bg-primary p-4 text-sm text-on-primary">
                <Send aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-on-primary-muted" />
                <span>
                  {fmt(t.readyIn, {
                    channel: sentVia === "whatsapp" ? t.channelWhatsApp : t.channelEmail,
                  })}{" "}
                  {interpolate(t.nothingOpened, {
                    email: (
                      <a href={`mailto:${site.contact.email}`} className="underline">
                        {site.contact.email}
                      </a>
                    ),
                    phone: site.contact.phoneDisplay,
                  })}
                </span>
              </p>
            ) : null}
          </div>
        </div>
        {asideFooter ? <div className="mt-6">{asideFooter}</div> : null}
      </aside>
    </form>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="mr-2 inline-grid size-8 place-items-center rounded-sm bg-surface-tint align-middle font-display text-sm text-primary"
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
      className="rounded-sm border border-line bg-surface p-4 text-left transition-colors hover:border-primary data-[state=checked]:border-primary data-[state=checked]:bg-surface-tint data-[state=checked]:shadow-ring"
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
  requiredLabel,
  optional,
  subgrid = false,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Screen-reader word for the required asterisk. */
  requiredLabel?: string;
  /** The word for "(optional)" when the field is optional. */
  optional?: string;
  /** Inside a two-column grid: share the parent's rows so fields line up. */
  subgrid?: boolean;
  children: (describedBy: string | undefined) => React.ReactNode;
}) {
  // The message slot shows the error when there is one, otherwise the hint. It always keeps
  // one line of space, so a message appearing never moves the fields below.
  const messageId = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined;
  return (
    <div
      className={cn(
        "grid content-start gap-y-1.5",
        subgrid && "sm:row-span-3 sm:grid-rows-subgrid",
      )}
    >
      <label htmlFor={htmlFor} className="block self-end font-display text-sm text-heading">
        {label}
        {required ? (
          <>
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
            {requiredLabel ? <span className="sr-only"> ({requiredLabel})</span> : null}
          </>
        ) : null}
        {optional ? <span className="font-sans text-sm text-muted"> {optional}</span> : null}
      </label>
      {children(messageId)}
      <p
        id={messageId}
        className={cn("mb-3 min-h-line text-sm", error ? "text-accent" : "text-muted")}
      >
        {error ?? hint}
      </p>
    </div>
  );
}

function SummaryRow({ term, value }: { term: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{term}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block h-field w-full rounded-sm border bg-surface px-4 text-base text-ink transition-colors duration-fast placeholder:text-muted focus:border-primary focus:outline-2 focus:outline-offset-0 focus:outline-focus",
    invalid ? "border-accent" : "border-control hover:border-primary",
  );
}
