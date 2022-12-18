import React, { useState } from 'react';

export type DetailItem = {
  label: string;
  value: string;
};

export type DetailsProps = {
  detailItems: Array<DetailItem>;
  title: string;
};

export default function Details(props: DetailsProps) {
  const { detailItems, title } = props;
  const [detailsOpen, setDetailsOpen] = useState(true);

  const onDetailsClick = () => {
    setDetailsOpen(!detailsOpen);
  };

  const items = detailItems.map(
    ({ value, label }: DetailItem, index: number) => {
      return (
        <label key={index} className="input-group">
          <span className="basis-44 flex-none">{label}</span>
          <p className="p-3 bg-secondary-content">{value}</p>
        </label>
      );
    }
  );

  return (
    <div
      onClick={onDetailsClick}
      className={`
            ${detailsOpen ? 'collapse-open' : ''}
             collapse collapse-arrow border border-base-300 bg-base-100 rounded-box`}>
      <div className="collapse-title text-xl font-medium">{title && title}</div>

      <div onClick={onDetailsClick} className="collapse-content">
        <div className="grid grid-cols-2 gap-4">{items}</div>
      </div>
    </div>
  );
}
