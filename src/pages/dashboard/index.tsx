import { trpc } from '../../utils/trpc';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ApartmentList from './(components)/apartment-list';

const Dashboard: NextPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const [id, setId] = useState<string | undefined>(undefined);
  const apartments = trpc.apartment.getApartment.useQuery({ id });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    if (data?.user) {
      setId(data.user.id);
    }
  }, [status]);

  if (apartments.data) {
    return <ApartmentList apartments={apartments.data} />;
  } else {
    return null;
  }

};

function getServerSideProps () {

}

export default Dashboard;
