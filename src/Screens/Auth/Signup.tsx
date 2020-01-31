import React, { BaseSyntheticEvent } from 'react'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mode, FormData } from './interface'
import { Button, Form, Card } from 'react-bootstrap'
import { emailRegex } from '../../helpers'

interface Props {
  mode: Mode
  onSubmit: (data: FormData, event?: BaseSyntheticEvent) => Promise<void>
}

const Signup: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, formState } = useForm<FormData>()

  return (
    <>
      <h1 className="display-4 text-center mb-3">Sign Up</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Controller
            as={Form.Control}
            type="text"
            name="name"
            placeholder="First Last"
            control={control}
            rules={{
              required: 'Required',
            }}
            isInvalid={formState.isSubmitted && errors.name}
          />
          <Form.Control.Feedback type="invalid">
            <ErrorMessage errors={errors} name="name" />
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Controller
            as={Form.Control}
            type="email"
            name="email"
            placeholder="name@address.com"
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email',
              },
            }}
            isInvalid={formState.isSubmitted && errors.email}
          />
          <Form.Control.Feedback type="invalid">
            <ErrorMessage errors={errors} name="email" />
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Controller
            as={Form.Control}
            type="password"
            name="password"
            placeholder="Enter your password"
            control={control}
            rules={{
              required: 'Required',
              minLength: {
                value: 8,
                message: '8 character minimum',
              },
            }}
            isInvalid={formState.isSubmitted && errors.password}
          />
          <Form.Control.Feedback type="invalid">
            <ErrorMessage errors={errors} name="password" />
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mb-3" variant="primary" block={true} type="submit">
          Sign Up
        </Button>
      </Form>

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
