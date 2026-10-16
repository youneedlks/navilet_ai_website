import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import BlogCta from "@/components/blog/BlogCta";
import Note from "@/components/blog/Note";
import { Step, Steps } from "@/components/blog/Steps";
import { reqVersionPublished } from "@/lib/content";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Текст про версию «Заявка» — только когда она опубликована (выключатель в content.ts). */
function IfReq({ children }: { children?: ReactNode }) {
  return reqVersionPublished ? <>{children}</> : null;
}

/** Текст на время, пока «Заявка» скрыта. */
function NoReq({ children }: { children?: ReactNode }) {
  return reqVersionPublished ? null : <>{children}</>;
}

export const mdxComponents = {
  a: MdxLink,
  Cta: BlogCta,
  Note,
  Steps,
  Step,
  IfReq,
  NoReq,
};
