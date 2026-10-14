import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import BlogCta from "@/components/blog/BlogCta";
import Note from "@/components/blog/Note";
import { Step, Steps } from "@/components/blog/Steps";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

export const mdxComponents = {
  a: MdxLink,
  Cta: BlogCta,
  Note,
  Steps,
  Step,
};
