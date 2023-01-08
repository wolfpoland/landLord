import Form from '../../../components/form/form';
import FormInput from '../../../components/form/form-input';
import FormTextArea from '../../../components/form/form-textarea';
import GridColsTwo from '../../../components/layout/grid-cols-two';

import React, { useRef } from 'react';

export type TenantPersonalProps = {
  title: string;
  collapsable: boolean;
  initialOpened?: boolean;
};

export default function TenantPersonal(props: TenantPersonalProps) {
  const { title, collapsable, initialOpened } = props;
  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);

  return (
    <Form title={title} collapsable={collapsable} initialOpened={initialOpened}>
      <GridColsTwo>
        <FormInput forwardRef={name} fromControlName="Name" />
        <FormInput forwardRef={surname} fromControlName="Surname" />
        <FormInput forwardRef={email} fromControlName="Email" />
        <FormInput forwardRef={phoneNumber} fromControlName="Phone Number" />
        <FormInput forwardRef={name} fromControlName="Birthday" />
      </GridColsTwo>

      <div className="divider">Tenant Address</div>

      <GridColsTwo>
        <FormInput forwardRef={name} fromControlName="State" />
        <FormInput forwardRef={name} fromControlName="Street" />
        <FormInput forwardRef={name} fromControlName="Country" />
        <FormInput forwardRef={name} fromControlName="Postal code" />
      </GridColsTwo>

      <div className="divider">Rent Period</div>

      <GridColsTwo>
        <FormInput forwardRef={name} fromControlName="Rent Start" />
        <FormInput forwardRef={name} fromControlName="Rent End" />
      </GridColsTwo>

      <div className="divider">Additional</div>

      <GridColsTwo>
        <FormTextArea label="Note" />
      </GridColsTwo>
    </Form>
  );
}
