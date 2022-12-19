import CardPage from '../../../components/card-page';
import { trpc } from '../../../utils/trpc';

import { useRef } from 'react';

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
      <input
        ref={nameInput}
        type="text"
        className="input w-full max-w-xs block mb-3"
        placeholder="name"
      />

      <input
        ref={addressInput}
        type="text"
        className="input w-full max-w-xs block mb-3"
        placeholder="address"
      />

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
