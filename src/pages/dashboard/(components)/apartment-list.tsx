import List from '../../../components/list/list';
import ApartmentItem from './apartment-item';

import React, { useEffect, useState } from 'react';
import { RxPlus } from 'react-icons/rx';

import { Apartment } from '@prisma/client';
import Link from 'next/link';

type ApartmentListProps = {
  apartments: Array<Apartment>;
};

export default function ApartmentList(props: ApartmentListProps) {
  const { apartments } = props;
  const [items, setItems] = useState<JSX.Element | JSX.Element[]>(
    <>No items!</>
  );

  const header = (
    <Link
      href={{
        pathname: '/apartment',
      }}>
      <RxPlus className="w-4 h-4 inline-block hover:text-primary-focus" />
    </Link>
  );

  const onKeyPress = (text: string) => {
    const filteredApartments = filterApartments(text);

    if (filteredApartments.length > 0) {
      const filteredItems = filteredApartments.map(transformApartmentToItem);

      setItems(filteredItems);
    } else {
      const items = apartments.map(transformApartmentToItem);

      setItems(items);
    }
  };

  const filterApartments = (text: string) => {
    const filteredApartments: Array<Apartment> = [];

    for (let n = 0; n < apartments.length; n++) {
      const apartment = apartments[n];

      if (
        apartment &&
        apartment.name
          .toLocaleLowerCase()
          .trim()
          .includes(text.trim().toLocaleLowerCase())
      ) {
        filteredApartments.push(apartment);
      }
    }

    return filteredApartments;
  };

  useEffect(() => {
    if (apartments?.length) {
      const items = apartments.map(transformApartmentToItem);

      setItems(items);
    }
  }, [apartments]);

  return (
    <List onInputChange={onKeyPress} header={header} title="Apartment list">
      {items}
    </List>
  );
}

function transformApartmentToItem(apartment: Apartment): JSX.Element {
  return <ApartmentItem key={apartment.id} apartment={apartment} />;
}
