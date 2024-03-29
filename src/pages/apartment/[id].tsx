import CardPage from '../../components/card-page';
import Details, { DetailItem } from '../../components/details';
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
    { value: apartment.state || '', label: 'State' },
    { value: apartment.city || '', label: 'City' },
    { value: apartment.street || '', label: 'Street' },
    { value: apartment.buildingNumber || '', label: 'Building number' },
    { value: apartment.apartmentNumber || '', label: 'Apartment number' },
    { value: apartment.postalCode || '', label: 'Postal code' },
    { value: apartment.notes || '', label: 'Description' },
    {
      value: apartment.numberOfTenants?.toString() || '',
      label: 'Number of tenants',
    },
    { value: apartment.country || '', label: 'Country' },
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
    <CardPage title="Details">
      <Details title="Apartment Details" detailItems={apartmentsDetailItems} />
      <Details title="Owner" detailItems={ownerItemsDetails} />
    </CardPage>
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
