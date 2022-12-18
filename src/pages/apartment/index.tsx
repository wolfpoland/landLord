import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Apartment: NextPage = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const addApartment = trpc.apartment.addApartment.useMutation();

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

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

export default Apartment;
