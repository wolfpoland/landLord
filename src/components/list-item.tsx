import React from "react";

export type ListItemProps = {
  children: JSX.Element[] | JSX.Element;
};

export default function ListItem(props: ListItemProps) {
  const { children } = props;

  return <div className="p-1">{children}</div>;
}
