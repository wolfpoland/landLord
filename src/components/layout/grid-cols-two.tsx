import React from 'react';

export type GridColsTwoProps = {
  children: JSX.Element | JSX.Element[];
};

const odd = (index: number) => {
  return index % 2 === 0;
};

export default function GridColsTwo({ children }: GridColsTwoProps) {
  if (!Array.isArray(children)) {
    return <div className="py-5 px-20">{children}</div>;
  }

  return (
    <div className={'grid grid-cols-2 gap-4 py-5 px-20 items-center'}>
      {children?.map((child, index) => {
        return (
          <div
            className={`flex w-full ${
              odd(index) ? 'justify-start' : 'justify-end'
            }`}
            key={index}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
