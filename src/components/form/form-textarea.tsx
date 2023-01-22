import React, { useState } from 'react';

// import { Editable, Slate, withReact } from 'slate-react';
import { Descendant, createEditor } from 'slate';
import { withReact } from 'slate-react';

// const slate = dynamic(
//   import('slate-react').then((slate) => slate),
//   { ssr: false }
// );

export type FormTextAreaProps = {
  label: string;
  forwardRef?: React.RefObject<HTMLTextAreaElement>;
};

const initialValue: Array<Descendant> = [{ text: '', children: [] }];

export default function FormTextArea(props: FormTextAreaProps) {
  const { label, forwardRef } = props;
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        onClick={(event) => event.stopPropagation()}
        ref={forwardRef}
        className="textarea textarea-bordered"></textarea>
      <label className="label">
        <span className="label-text-alt">Alt label</span>
      </label>
    </div>
  );
}
