import CardPage from '../../../components/card-page';
import Form from '../../../components/form/form';
import FormInput from '../../../components/form/form-input';
import FormSelect from '../../../components/form/form-select';
import FormTextArea from '../../../components/form/form-textarea';
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
  const stateInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const streetInput = useRef<HTMLInputElement>(null);
  const buildingNumberInput = useRef<HTMLInputElement>(null);
  const apartmentNumberInput = useRef<HTMLInputElement>(null);
  const postalCodeInput = useRef<HTMLInputElement>(null);
  const numberOfTenantsInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const addressInput = useRef<HTMLInputElement>(null);
  const addApartment = trpc.apartment.addApartment.useMutation();

  const onSubmit = async () => {
    if (
      !nameInput.current?.value ||
      !stateInput.current?.value ||
      !cityInput.current?.value ||
      !streetInput.current?.value ||
      !buildingNumberInput.current?.value ||
      !apartmentNumberInput.current?.value ||
      !postalCodeInput.current?.value ||
      !numberOfTenantsInput.current?.value ||
      !countryInput.current?.value ||
      !descriptionInput.current?.value ||
      !numberOfTenantsInput.current?.value
    ) {
      console.log(
        'nameInput',
        nameInput.current?.value,
        'addressInput',
        addressInput.current?.value,
        'stateInput',
        stateInput.current?.value,
        'cityInput',
        cityInput.current?.value,
        'streetInput',
        streetInput.current?.value,
        'buildingNumberInput',
        buildingNumberInput.current?.value,
        'apartmentNumberInput',
        apartmentNumberInput.current?.value,
        'postalCodeInput',
        postalCodeInput.current?.value,
        'numberOfTenantsInput',
        numberOfTenantsInput.current?.value,
        'countryInput',
        countryInput.current?.value,
        'descriptionInput',
        descriptionInput.current?.value,
        'numberOfTenantsInput',
        numberOfTenantsInput.current?.value
      );
      throw new Error('All fields are required');
    }

    const numberOfTenants = parseInt(numberOfTenantsInput.current?.value);

    addApartment.mutate({
      name: nameInput.current.value,
      state: stateInput.current?.value,
      city: cityInput.current?.value,
      street: streetInput.current?.value,
      buildingNumber: buildingNumberInput.current?.value,
      apartmentNumber: apartmentNumberInput.current?.value,
      postalCode: postalCodeInput.current?.value,
      numberOfTenants,
      country: countryInput.current?.value,
      description: descriptionInput.current?.value,
    });
  };

  return (
    <CardPage title="Add apartment">
      <Form>
        <GridColsTwo>
          <FormInput forwardRef={nameInput} fromControlName="Name" />
        </GridColsTwo>

        <div className="divider">Apartment Address</div>

        <GridColsTwo>
          <FormInput forwardRef={stateInput} fromControlName="State" />
          <FormInput forwardRef={cityInput} fromControlName="City" />
          <FormInput forwardRef={countryInput} fromControlName="Country" />
          <FormInput forwardRef={streetInput} fromControlName="Street" />
          <FormInput
            forwardRef={buildingNumberInput}
            fromControlName="Building Number"
          />
          <FormInput
            forwardRef={apartmentNumberInput}
            fromControlName="Apartment Number"
          />
          <FormInput
            forwardRef={postalCodeInput}
            fromControlName="Postal Code"
          />
        </GridColsTwo>

        <div className="divider">Additional</div>

        <GridColsTwo>
          <FormInput
            forwardRef={numberOfTenantsInput}
            fromControlName="Number of tenants"
          />
          <FormTextArea forwardRef={descriptionInput} label="Note" />
        </GridColsTwo>
      </Form>

      <div className="w-full flex justify-end pt-2 pr-2">
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
