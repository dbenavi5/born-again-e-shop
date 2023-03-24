import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();

  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const submitHandler = async ({email, password}) => {
        try {
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          if (result.error) {
            toast.error(result.error);
          }
        } catch (err) {
          toast.error(getError(err))
        }
    }

  return (
    <div title="Login">
      <form
        className="mx-auto md:max-w-screen p-5 md:px-24 lg:px-52"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-indigo-600">Login</h1>
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
          <Link href={`/register?redirect=${redirect || "/"}`}>
            <b>Register</b>
          </Link>
        </div>
      </form>
    </div>
  );
}
