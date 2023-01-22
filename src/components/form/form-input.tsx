import React from 'react';

export type FormControlProps = {
  fromControlName: string;
  forwardRef: React.RefObject<HTMLInputElement>;
  className?: string;
};

export default function FormInput(props: FormControlProps) {
  const { fromControlName, forwardRef, className } = props;

  return (
    <div className={`form-control w-full max-w-md ${className}`}>
      <label className="label">
        <span className="label-text">{fromControlName}</span>
      </label>
      <input
        ref={forwardRef}
        onClick={(event) => event.stopPropagation()}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-md"
      />
      <label className="label">
        <span className="label-text-alt">Alt label</span>
      </label>
    </div>
  );
}
