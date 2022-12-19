import { trpc } from '../../utils/trpc';
import ApartmentList from './(components)/apartment-list';

import React from 'react';

import { NextPage } from 'next';
import { GetSessionParams, getSession } from 'next-auth/react';

const Dashboard: NextPage = () => {
  const apartments = trpc.apartment.getApartments.useQuery();
  let apartmentElement;

  if (apartments.data) {
    apartmentElement = <ApartmentList apartments={apartments.data} />;
  } else {
    return <p>No apartments</p>;
  }

  return (
    <div className="">
      <div className="width-100 mb-1 p-5">
        <button className="btn btn-sm">Add new rent</button>
      </div>
      <div className="bg-primary-content py-5">{apartmentElement}</div>
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
