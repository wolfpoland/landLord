import React from "react";

export type ListProps = {
  title?: string;
  children: JSX.Element[] | JSX.Element;
};

export default function List(props: ListProps) {
  const { title } = props;
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
    <div className="w-auto mx-2">
      <div className="border-b-2 p-1">
        <span className="mx-1.5">{title}</span>
      </div>

      {childrenList}
    </div>
  );
}
