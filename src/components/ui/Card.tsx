import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "../../utils/classNames";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cx("card", className)} {...props}>
      {children}
    </div>
  );
}
