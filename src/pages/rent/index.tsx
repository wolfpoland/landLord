import CardPage from '../../components/card-page';
import Form from '../../components/form/form';
import FormCombobox, {
  FormComboboxItem,
} from '../../components/form/form-combobox';
import FormInput from '../../components/form/form-input';
import FormSelect, { FormSelectItem } from '../../components/form/form-select';
import FormTextArea from '../../components/form/form-textarea';
import Center from '../../components/layout/center';
import GridColsTwo from '../../components/layout/grid-cols-two';
import { trpc } from '../../utils/trpc';
import TenantPersonal from './(components)/tenant-personal';

import React, { useEffect, useRef, useState } from 'react';

import { Apartment } from '@prisma/client';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { getSession } from 'next-auth/react';

const Rent: NextPage = () => {
  const [apartmentsForCombobox, setApartmentsForCombobox] = useState<
    FormComboboxItem[]
  >([]);
  const numberOfTenants = useRef<HTMLInputElement>(null);
  const apartments = trpc.apartment.getApartments.useQuery();

  useEffect(() => {
    if (!apartments?.data) {
      return;
    }

    setApartmentsForCombobox(
      apartments.data?.map((apartment: Apartment) => {
        return {
          key: apartment.id,
          value: `${apartment.name} - ${apartment.address}`,
        };
      })
    );
  }, [apartments.status]);

  const items: FormSelectItem[] = [
    { value: 'odin', key: '1' },
    { value: '2', key: '2' },
    { value: '3', key: '3' },
  ];

  return (
    <CardPage title="Add new Rent">
      <Form title="Select Apartment">
        <div className="py-5">
          <Center>
            <FormCombobox items={apartmentsForCombobox} label="Apartment" />
          </Center>
        </div>

        <GridColsTwo>
          <FormSelect items={items} label="Number of tenants" />
          <div className="flex">
            <FormInput
              className="mr-5"
              fromControlName="Start of rent"
              forwardRef={numberOfTenants}
            />
            <FormInput
              fromControlName="End of rent"
              forwardRef={numberOfTenants}
            />
          </div>
        </GridColsTwo>
      </Form>

      <TenantPersonal title="Tenant personal data" collapsable={false} />
      <TenantPersonal
        title="Another Tenant personal data"
        collapsable={true}
        initialOpened={false}
      />
    </CardPage>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
};

export default Rent;
