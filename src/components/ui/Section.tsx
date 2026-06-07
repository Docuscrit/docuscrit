import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "../../utils/classNames";

type SectionProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cx("section", className)} {...props}>
      {children}
    </section>
  );
}
