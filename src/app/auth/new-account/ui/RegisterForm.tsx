'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from "react-hook-form";

import { login, registerUser } from '@/actions';

type FormInputs = {
    name: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormInputs> = async ({ name, email, password }) => {
        setLoading(false);
        const resp = await registerUser({ name, email, password });

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        const { ok } = await login(email.toLowerCase(), password);
        if (ok) {
            setLoading(true);
            window.location.replace('/');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="name">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                {...register("name", { required: true, min: 6 })}
            />
            {errors.name?.type === 'required' && <span className="text-red-500">This field is required</span>}
            {errors.name?.type === 'min' && <span className="text-red-500">Very short name, minimum 6 letters</span>}

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })}
            />
            {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}
            {errors.email?.type === 'pattern' && <span className="text-red-500">Invalid email</span>}

            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register("password", { required: true, min: 6 })}
            />
            {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
            {errors.password?.type === 'min' && <span className="text-red-500">Invalid password, it is very weak</span>}


            {errorMessage && <span className="text-red-500">{errorMessage}</span>}

            <button
                className="btn-primary"
            >
                {
                    loading ? <span className="loader" ></span>: 'Crear cuenta'
                }
            </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
