import React, { useState } from 'react';

export type FormProps = {
  title?: string;
  collapsable?: boolean;
  children: JSX.Element | JSX.Element[];
  initialOpened?: boolean;
};

export default function Form(props: FormProps) {
  const { children, title, collapsable = false, initialOpened = true } = props;
  const [detailsOpen, setDetailsOpen] = useState(initialOpened);
  let titleElm = null;

  if (title?.length) {
    titleElm = (
      <div className="collapse-title text-xl font-medium">{title}</div>
    );
  }

  const onFormClick = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <div
      onClick={onFormClick}
      className={`${
        !collapsable || (collapsable && detailsOpen) ? 'collapse-open ' : ''
      }${
        collapsable ? 'collapse-arrow ' : ''
      }collapse border border-base-300 bg-base-100 rounded-box`}>
      {titleElm}
      <div className="collapse-content bg-primary-content">{children}</div>
    </div>
  );
}
