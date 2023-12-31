import React, { ReactNode } from 'react';

type ReactHTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = ReactHTMLButtonProps & {
  children: ReactNode;
};

function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`px-4 h-12 rounded-md font-bold bg-zinc-500 text-black hover:bg-neutral-700 transition-all ${props.className} ${props.disabled ? 'opacity-10 pointer-events-none' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
