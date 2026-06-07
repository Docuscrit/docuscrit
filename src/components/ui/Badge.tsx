import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "../../utils/classNames";

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: "teal" | "cream" | "blue" | "ink";
  }
>;

export function Badge({ children, className, tone = "teal", ...props }: BadgeProps) {
  return (
    <span className={cx("badge", `badge--${tone}`, className)} {...props}>
      {children}
    </span>
  );
}
