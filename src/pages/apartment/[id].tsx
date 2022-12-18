import Details, { DetailItem } from '../../components/list/details';
import {
  GetUniqueApartmentTuple,
  getUniqueApartment,
} from '../../server/trpc/router/apartment';

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import superjson from 'superjson';

type ApartmentProps = {
  apartmentRaw: string;
};

const ApartmentDetails: NextPage<ApartmentProps> = (props: ApartmentProps) => {
  const { apartmentRaw } = props;
  const [apartment, owner]: GetUniqueApartmentTuple = (!!apartmentRaw &&
    superjson.parse(apartmentRaw)) as GetUniqueApartmentTuple;
  const createdAt = apartment.createdAt;

  if (!apartment) {
    return <h1>Apartment not found</h1>;
  }

  const apartmentsDetailItems: Array<DetailItem> = [
    { value: apartment.name, label: 'Name' },
    { value: apartment.address, label: 'Address' },
    {
      value: `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`,
      label: 'Created At',
    },
  ];

  const ownerItemsDetails: Array<DetailItem> = [
    { value: owner?.user.name || 'Name not provided', label: 'Name' },
    { value: owner?.user.email || '', label: 'Email' },
  ];

  return (
    <div className="container bg-base-100 w-full mx-auto flex align-center justify-center">
      <div className="my-5 w-full h-fit card bg-neutral-content shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-10">Details</h1>

          <Details
            title="Apartment Details"
            detailItems={apartmentsDetailItems}
          />
          <Details title="Owner" detailItems={ownerItemsDetails} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const session = await getSession(context);
  let apartmentRaw;

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (id) {
    apartmentRaw = await getUniqueApartment(id as string);
  }

  return {
    props: { apartmentRaw },
  };
};

export default ApartmentDetails;
