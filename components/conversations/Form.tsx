'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import { useConversation } from '@/hooks/useConversation';
import { Icons } from '@/components/Icons';
import { MessageInput } from '@/components/MessageInput';
import { Button } from '@/components/ui/button';

export const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
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
            <Button onClick={handleOnClick} variant={'ghost'} size={'icon'}>
              <Icons.imagePlus />
            </Button>
          );
        }}
      </CldUploadWidget>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <Button type="submit" variant={'ghost'} size={'icon'}>
          <Icons.send />
        </Button>
      </form>
    </div>
  );
};
