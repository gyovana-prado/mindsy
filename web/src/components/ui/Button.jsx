import React from "react";

export function Button({ children, className = '', variant = 'default', size = 'md', asChild = false, ...props }) {
  const Comp = asChild ? 'span' : 'button';
  let base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  let variants = {
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  };
  let sizes = {
    lg: 'h-12 px-8 text-lg',
    md: 'h-10 px-6 text-base',
    sm: 'h-8 px-4 text-sm',
  };
  return (
    <Comp
      className={[
        base,
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Comp>
  );
} 