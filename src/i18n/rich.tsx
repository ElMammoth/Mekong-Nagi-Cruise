import { Fragment, type ReactNode } from "react";
import { fmt, type Vars } from "./format";

type Tag = (children: ReactNode) => ReactNode;

/**
 * Renders a message with `<tag>text</tag>` markup, e.g. "Read <link>the guide</link>.",
 * mapping each tag to a React element. `{placeholders}` are filled first.
 * Tags can't be nested (keeps translations simple).
 */
export function rich(template: string, tags: Record<string, Tag>, vars: Vars = {}): ReactNode {
  const text = fmt(template, vars);
  const parts: ReactNode[] = [];
  const re = /<(\w+)>(.*?)<\/\1>/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const render = tags[match[1]!];
    parts.push(<Fragment key={match.index}>{render ? render(match[2]) : match[2]}</Fragment>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Same message with the tags removed (plain text: metadata, JSON-LD). */
export function plain(template: string, vars: Vars = {}): string {
  return fmt(template, vars).replace(/<\/?\w+>/g, "");
}

/**
 * Fills `{placeholders}` with React nodes (e.g. a live price) where the word order of the
 * language puts them: interpolate("single supplement {price}", { price: <Price … /> }).
 */
export function interpolate(template: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = template.split(/(\{\w+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const key = /^\{(\w+)\}$/.exec(part)?.[1];
        return <Fragment key={i}>{key && key in nodes ? nodes[key] : part}</Fragment>;
      })}
    </>
  );
}
