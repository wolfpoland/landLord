import ListItem from '../../../components/list/list-item';

import React from 'react';
import { RxPencil1 } from 'react-icons/rx';

import { Apartment } from '@prisma/client';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useRouter } from 'next/router';

type ApartmentItemProps = {
  apartment: Apartment;
};

export default function ApartmentItem(props: ApartmentItemProps) {
  const [hovered, setHovered] = React.useState(false);
  const { apartment } = props;
  const toggleHover = () => setHovered(!hovered);
  const router = useRouter();

  const editPencil = (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="block">
          <RxPencil1 className={hovered ? '' : 'hidden'} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div
          className="bg-info-content tooltip tooltip-open tooltip-info"
          data-tip="Click to edit"
        />
      </Tooltip.Content>
    </Tooltip.Root>
  );

  const onApartmentClick = (key: string) => {
    console.log('onApartmentClick', key);
    router.push(`/apartment/${key}`);
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className="block w-full">
          <ListItem
            trackKey={apartment.id}
            onClick={onApartmentClick}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className="flex justify-between">
            <span>{apartment.name}</span>

            {editPencil}
          </ListItem>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content align="center">
        <div
          className="bg-info-content tooltip tooltip-open tooltip-info"
          data-tip="Click to see details"
        />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
