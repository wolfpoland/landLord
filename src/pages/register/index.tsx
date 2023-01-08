import CardPage from '../../components/card-page';
import Form from '../../components/form/form';
import FormInput from '../../components/form/form-input';
import GridColsTwo from '../../components/layout/grid-cols-two';
import { trpc } from '../../utils/trpc';

import React, { useRef } from 'react';

import type { NextPage } from 'next';

const Register: NextPage = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const register = trpc.register.register.useMutation();

  const onSubmit = async () => {
    if (!emailInput.current?.value || !passwordInput.current?.value) {
      return;
    }

    register.mutate({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  return (
    <CardPage title="Register">
      <Form title="">
        <GridColsTwo>
          <FormInput forwardRef={emailInput} fromControlName="Email" />
          <FormInput forwardRef={passwordInput} fromControlName="Password" />
        </GridColsTwo>
      </Form>

      <div className="w-full flex justify-end mt-10 pr-5">
        <button onClick={onSubmit} className="btn">
          Register
        </button>
      </div>
    </CardPage>
  );
};

export default Register;
