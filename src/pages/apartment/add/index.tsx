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
    <div className="container bg-base-100 w-full mx-auto flex align-center justify-center">
      <div className="my-5 w-full h-fit card bg-neutral-content shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-10">Add apartment</h1>

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
  const apartment = trpc.apartment.getApartment.useQuery({ id: id as string });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session, apartment },
  };
};

export default Apartment;
