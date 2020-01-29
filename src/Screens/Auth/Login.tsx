import React, { BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'
import { Mode, FormData } from './interface'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

interface Props {
  mode: Mode
  onSubmit: (data: FormData, event?: BaseSyntheticEvent) => Promise<void>
}

const Login: React.FC<Props> = ({ mode, onSubmit }, props) => {
  const { register, handleSubmit, errors } = useForm<FormData>()

  return (
    <>
      <h1 className="display-4 text-center mb-3">Log In</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        validated={!!(errors.email || errors.password)}
      >
        <Form.Group>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            ref={register({ required: true })}
            placeholder="name@address.com"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && <span>Email is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <label htmlFor="name">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            ref={register({ required: true })}
            placeholder="Enter your password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && <span>Password is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mb-3" variant="primary" block={true} type="submit">
          Log In
        </Button>
      </Form>

      <div className="text-center">
        <small className="text-muted text-center">
          Don't have an account yet?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </small>
      </div>
    </>
  )
}

export default Login
