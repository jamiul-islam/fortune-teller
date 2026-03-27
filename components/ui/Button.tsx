import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "min-w-[44px] min-h-[44px] px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out";

  const variantStyles = {
    primary:
      "bg-[#c0392b] hover:bg-[#922b21] text-[#f5f0eb] active:bg-[#7b241c]",
    secondary:
      "bg-transparent border-2 border-[#c0392b] text-[#c0392b] hover:bg-[#c0392b] hover:text-[#f5f0eb]",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
