import React from 'react';

export type GridColsTwoProps = {
  children: JSX.Element | JSX.Element[];
};

export default function Center({ children }: GridColsTwoProps) {
  return <div className="flex align-items justify-center ">{children}</div>;
}
