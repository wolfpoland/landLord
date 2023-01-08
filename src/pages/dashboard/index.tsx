import { trpc } from '../../utils/trpc';
import ApartmentList from './(components)/apartment-list';

import React from 'react';

import { NextPage } from 'next';
import { GetSessionParams, getSession } from 'next-auth/react';
import Link from 'next/link';

const Dashboard: NextPage = () => {
  const apartments = trpc.apartment.getApartments.useQuery();

  return (
    <div className="">
      <div className="width-100 mb-1 p-5">
        <Link
          href={{
            pathname: '/rent',
          }}>
          <button className="btn btn-sm">Add new rent</button>
        </Link>
      </div>
      <div className="bg-primary-content py-5">
        <ApartmentList apartments={apartments.data} />
      </div>
    </div>
  );
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
