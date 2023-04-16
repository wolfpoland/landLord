import CardPage from '../../components/card-page';
import Form from '../../components/form/form';
import FormCombobox, {
  FormComboboxItem,
} from '../../components/form/form-combobox';
import FormDatepickerInput from '../../components/form/form-datepicker-input';
import FormInput from '../../components/form/form-input';
import FormSelect, { FormSelectItem } from '../../components/form/form-select';
import GridColsTwo from '../../components/layout/grid-cols-two';
import { trpc } from '../../utils/trpc';
import TenantPersonal from './(components)/tenant-personal';

import React, { ReactElement, useEffect, useRef, useState } from 'react';

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
  const [tenantElements, setTenantsElements] = useState<Array<ReactElement>>(
    []
  );
  const [selectItems, setSelectItems] = useState<FormSelectItem[]>([]);
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

  const onComboboxOptionClick = (id: string) => {
    const apartment = apartments?.data?.find(
      (apartment) => apartment.id === id
    );

    if (!apartment || !apartment?.numberOfTenants) {
      return;
    }

    const array = Array(apartment.numberOfTenants)
      .fill(0)
      .map((_, index) => {
        return {
          value: (index + 1).toString(),
          key: (index + 1).toString(),
        };
      });

    setSelectItems(array);
  };

  const onSelectChange = (value: string) => {
    const paredQuery: number = parseInt(value);

    if (isNaN(paredQuery)) {
      return;
    }

    setTenantsElements(
      Array(paredQuery)
        .fill(null)
        .map((_, index) => {
          const title = `Tenant ${index + 1}`;

          return (
            <TenantPersonal key={index} title={title} collapsable={true} />
          );
        })
    );
  };

  return (
    <CardPage title="Add new Rent">
      <Form title="Apartment">
        <div className="py-5">
          <GridColsTwo>
            <FormCombobox
              items={apartmentsForCombobox}
              onComboBoxOptionClick={onComboboxOptionClick}
              label="Apartment"
            />
          </GridColsTwo>
        </div>

        <GridColsTwo>
          <FormSelect
            onSelectChange={onSelectChange}
            items={selectItems}
            label="Number of tenants"
          />

          <div className="flex">
            <FormDatepickerInput
              className="mr-5"
              fromControlName="Start of rent"
              forwardRef={numberOfTenants}
            />
            <FormDatepickerInput
              fromControlName="End of rent"
              forwardRef={numberOfTenants}
            />
          </div>
        </GridColsTwo>
      </Form>

      <>{tenantElements}</>
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
