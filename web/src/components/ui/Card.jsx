import React from "react";

export function Card({ className = '', ...props }) {
  return (
    <div className={["rounded-xl border bg-card text-card-foreground shadow", className].join(' ')} {...props} />
  );
}

export function CardHeader({ className = '', ...props }) {
  return <div className={["flex flex-col space-y-1.5 p-6", className].join(' ')} {...props} />;
}

export function CardTitle({ className = '', ...props }) {
  return <h3 className={["text-2xl font-semibold leading-none tracking-tight", className].join(' ')} {...props} />;
}

export function CardDescription({ className = '', ...props }) {
  return <p className={["text-sm text-muted-foreground", className].join(' ')} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={["p-6 pt-0", className].join(' ')} {...props} />;
}

export function CardFooter({ className = '', ...props }) {
  return <div className={["flex items-center p-6 pt-0", className].join(' ')} {...props} />;
} 