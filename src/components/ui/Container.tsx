import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "../../utils/classNames";

type ContainerProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    size?: "default" | "wide" | "narrow";
  }
>;

export function Container({ children, className, size = "default", ...props }: ContainerProps) {
  return (
    <div className={cx("container", size !== "default" && `container--${size}`, className)} {...props}>
      {children}
    </div>
  );
}
