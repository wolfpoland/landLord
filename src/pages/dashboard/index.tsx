import { trpc } from '../../utils/trpc';
import ApartmentList from './(components)/apartment-list';

import React from 'react';

import { NextPage } from 'next';
import { GetSessionParams, getSession } from 'next-auth/react';

const Dashboard: NextPage = () => {
  const apartments = trpc.apartment.getApartments.useQuery();

  if (apartments.data) {
    return <ApartmentList apartments={apartments.data} />;
  } else {
    return null;
  }
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Dashboard;
