"use client"

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitProps = {
  children: React.ReactNode,
  className?: string,
} & ComponentProps<'button'>

const FormSubmit = (
  { children, className, ...props }: FormSubmitProps

) => {

  const { pending } = useFormStatus();

  return (
    <button
    {...props}
    className={`btn btn-primary ${className}`}
    type="submit"
    disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {children}
      </button>
  )
}

export default FormSubmit