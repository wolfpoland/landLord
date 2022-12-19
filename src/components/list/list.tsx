import React, { useRef } from 'react';

export type ListProps = {
  title?: string;
  header?: JSX.Element;
  children: JSX.Element[] | JSX.Element;
  onInputChange?: (text: string) => void;
};

export default function List(props: ListProps) {
  const { title, onInputChange } = props;
  const input = useRef<HTMLInputElement>(null);
  let childrenList;

  if (props.children instanceof Array) {
    childrenList = props.children.map((child, index) => {
      return (
        <div key={index} className="p-1">
          {child}
        </div>
      );
    });
  } else {
    childrenList = <div className="p-1">{props.children}</div>;
  }

  return (
    <div className="w-96 mx-2 bg-neutral p-3 rounded-md shadow-xl">
      <div className="border-b-2 p-1 flex items-center justify-between">
        <span className="mx-1.5">{title}</span>

        <input
          type="text"
          placeholder="Type here"
          ref={input}
          onInput={() =>
            input.current && onInputChange && onInputChange(input.current.value)
          }
          className="input input-ghost input-sm w-40 max-w-xs !border-x-0 !border-t-0"
        />

        {props?.header}
      </div>

      {childrenList}
    </div>
  );
}
