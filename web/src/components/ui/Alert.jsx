import React from "react";

export function Alert({ children, variant = 'default', className = '', ...props }) {
  const base = 'relative w-full rounded-lg border p-4';
  const variants = {
    default: 'bg-background text-foreground',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  };
  return (
    <div className={[base, variants[variant] || variants.default, className].join(' ')} {...props}>
      {children}
    </div>
  );
}

export function AlertDescription({ className = '', ...props }) {
  return <div className={["text-sm [&_p]:leading-relaxed", className].join(' ')} {...props} />;
} 