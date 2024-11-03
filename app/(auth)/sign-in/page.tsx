import React from 'react';
import Image from 'next/image';
import LogoImg from '@/public/images/logo.png';
import { AuthForm } from '@/components/AuthForm';

export default function page() {
  return (
    <div className="flex min-h-full  flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={LogoImg}
          alt="logo"
          height={48}
          width={48}
          className="mx-auto w-auto"
          quality={100}
        />
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      {/* Auth Form */}
      <AuthForm variant="LOGIN" />
    </div>
  );
}
