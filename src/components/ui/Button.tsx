import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cx } from "../../utils/classNames";

type CommonProps = PropsWithChildren<{
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}>;

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const classes = cx("button", `button--${variant}`, className);

  if ("href" in props) {
    const anchorProps = props as AnchorButtonProps;
    const { href, ...rest } = anchorProps;

    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
