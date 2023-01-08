import CardPage from '../../../components/card-page';
import Form from '../../../components/form/form';
import FormInput from '../../../components/form/form-input';
import GridColsTwo from '../../../components/layout/grid-cols-two';
import { trpc } from '../../../utils/trpc';

import React, { useRef } from 'react';

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import { getSession } from 'next-auth/react';

const Apartment: NextPage = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const addApartment = trpc.apartment.addApartment.useMutation();

  const onSubmit = async () => {
    if (!nameInput.current?.value || !addressInput.current?.value) {
      return;
    }

    addApartment.mutate({
      name: nameInput.current.value,
      address: addressInput.current.value,
    });
  };

  return (
    <CardPage title="Add apartment">
      <Form>
        <GridColsTwo>
          <FormInput forwardRef={nameInput} fromControlName="Name" />
          <FormInput forwardRef={addressInput} fromControlName="Addres" />
        </GridColsTwo>
      </Form>

      <div className="w-full flex justify-end">
        <button onClick={onSubmit} className="btn">
          Add
        </button>
      </div>
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

export default Apartment;
