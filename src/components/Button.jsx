import { Link } from "react-router-dom";

const baseClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition duration-200";

const variants = {
  primary: "bg-moss text-linen hover:bg-olive",
  secondary: "border border-moss/25 text-moss hover:border-clay hover:text-clay",
  light: "border border-linen/45 text-linen hover:border-oat hover:text-oat",
  clay: "bg-clay text-white hover:bg-ember"
};

export default function Button({ children, href, to, variant = "primary", className = "", ...props }) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
