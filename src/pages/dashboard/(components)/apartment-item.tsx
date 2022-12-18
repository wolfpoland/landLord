import ListItem from '../../../components/list/list-item';

import React from 'react';
import { RxPencil1 } from 'react-icons/rx';

import { Apartment } from '@prisma/client';
import * as Tooltip from '@radix-ui/react-tooltip';

type ApartmentItemProps = {
  apartment: Apartment;
};

export default function ApartmentItem(props: ApartmentItemProps) {
  const [hovered, setHovered] = React.useState(false);
  const { apartment } = props;
  const toggleHover = () => setHovered(!hovered);

  const editPencil = (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className='block'>
          <RxPencil1 className={hovered ? '' : 'hidden'} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div
          className='bg-info-content tooltip tooltip-open tooltip-info'
          data-tip='Click to edit'
        />
      </Tooltip.Content>
    </Tooltip.Root>
  );

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className='block w-full'>
          <ListItem
            trackKey={apartment.id}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className='flex justify-between'>
            <span>{apartment.name}</span>

            {editPencil}
          </ListItem>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content align='center'>
        <div
          className='bg-info-content tooltip tooltip-open tooltip-info'
          data-tip='Click to see details'
        />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
