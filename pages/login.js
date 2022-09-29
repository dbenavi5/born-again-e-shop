import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const submitHandler = ({email, password}) => {
        console.log(email, password);
    }

  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-tablet"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 8, message: "password is more than 8 chars" },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div>
          Don&apos;t have an account? &nbsp;
          <Link href="/register">
            <b>Register</b>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
