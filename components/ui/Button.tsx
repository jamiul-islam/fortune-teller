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
    "inline-flex items-center justify-center min-w-[44px] px-6 sm:px-8 rounded-xl font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: "text-cosmic-purple-900 relative overflow-hidden group",
    secondary:
      "bg-transparent border-2 border-mystic-gold text-mystic-gold hover:bg-mystic-gold/10 backdrop-blur-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{
        minHeight: "44px",
        paddingTop: "12px",
        paddingBottom: "12px",
        ...(variant === "primary"
          ? {
              background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
              boxShadow:
                "0 0 40px rgba(255, 215, 0, 0.4), 0 8px 32px rgba(124, 77, 255, 0.2)",
            }
          : {}),
      }}
      {...props}
    >
      {variant === "primary" && (
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)",
          }}
        />
      )}
      <span
        className="relative z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </span>
    </button>
  );
}
