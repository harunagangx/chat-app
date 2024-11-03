'use client';

import { Icons } from '@/components/Icons';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

export const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() =>
        toast({
          title: 'Error',
          description: 'Something went wrong',
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your profile
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <div className="mx-auto">
                <CldUploadWidget
                  uploadPreset="itsedakg"
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  onQueuesEnd={(result, { widget }) => {
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    function handleOnClick() {
                      open();
                    }
                    return (
                      <div onClick={handleOnClick} className="cursor-pointer">
                        <Image
                          src={
                            image ||
                            currentUser?.image ||
                            '/images/placeholder.jpg'
                          }
                          width="48"
                          height="48"
                          alt="Avatar"
                          className="rounded-full relative"
                        />
                        <span className="absolute top-[110px] right-[225px] bg-white p-1 rounded-full border border-black">
                          <Icons.edit className="w-4 h-4" />
                        </span>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <div className="mt-2">
                <Label>Name</Label>
                <Input
                  disabled={isLoading}
                  {...register('name', {
                    required: 'Name is required',
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button variant={'secondary'} disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
