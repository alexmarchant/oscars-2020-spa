import React, { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mode, FormData } from './interface'
import { Button, FormGroup } from 'react-bootstrap'

interface Props {
  mode: Mode
  onSubmit: (data: FormData, event?: BaseSyntheticEvent) => Promise<void>
}

const Signup: React.FC<Props> = ({ mode, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <>
      <h1 className="display-4 text-center mb-3">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            ref={register({ required: true })}
            placeholder="First Last"
          />
          {errors.name && <span>Name is required</span>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            ref={register({ required: true })}
            placeholder="name@address.com"
          />
          {errors.email && <span>Email is required</span>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="name">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            ref={register({ required: true })}
            placeholder="Enter your password"
          />
          {errors.password && <span>Password is required</span>}
        </FormGroup>
        <Button className="mb-3" variant="primary" block={true}>
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        <small className="text-muted text-center">
          Already have an account?&nbsp;
          <Link to="/login">Log In</Link>
        </small>
      </div>
    </>
  )
}

export default Signup
