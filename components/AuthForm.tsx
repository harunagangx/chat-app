'use client';

import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/Icons';
import { useToast } from '@/hooks/use-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface VariantProps {
  variant: string;
}

export const AuthForm = ({ variant }: VariantProps) => {
  const { toast } = useToast();

  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch((error) =>
          toast({
            title: 'Error',
            description: `${error.message}`,
          })
        )
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              title: 'Error',
              description: 'Invalid Credentials',
            });
          }

          if (callback?.ok && !callback?.error) {
            router.push('/users');
            toast({
              title: 'Success',
              description: 'Login successfully',
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: 'Error',
            description: 'Invalid Credentials',
          });

          if (callback?.ok && !callback?.error) {
            toast({
              title: 'Success',
              description: 'Login successfully',
            });
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md"
    >
      <div
        className="bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10"
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                disabled={isLoading}
                {...register('name', {
                  required: 'Name is required',
                  validate: (value) => {
                    if (value.length < 5) {
                      return 'Name must be at least 5 characters';
                    }
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message as string}
                </p>
              )}
            </div>
          )}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              disabled={isLoading}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div>
            <Label>Password</Label>

            {variant === 'REGISTER' ? (
              <Input
                type="password"
                disabled={isLoading}
                {...register('password', {
                  required: 'Password is required',
                  validate: (value) => {
                    if (value.length < 5) {
                      return 'Password must be at least 5 characters';
                    }
                  },
                })}
              />
            ) : (
              <Input
                type="password"
                disabled={isLoading}
                {...register('password', {
                  required: 'Password is required',
                })}
              />
            )}

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={isLoading}
          >
            {variant === 'LOGIN' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <Separator />
            </div>
            <div
              className="
              relative 
              flex 
              justify-center 
              text-xs
            "
            >
              <span
                className="
                bg-white 
                px-2 
                text-gray-500"
              >
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-x-4">
          <Button
            variant={'outline'}
            className="w-full"
            onClick={() => socialAction('google')}
          >
            <Icons.google />
          </Button>
          <Button className="w-full" onClick={() => socialAction('github')}>
            <Icons.gitHub />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-1 text-xs text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <Link
            href={variant === 'LOGIN' ? '/sign-up' : '/sign-in'}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Sign up' : 'Login'}
          </Link>
        </div>
      </div>
    </div>
  );
};
