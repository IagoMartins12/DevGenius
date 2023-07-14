import { Post, User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useSettingsForm = ({ user }: { user: User | null }) => {
  const [isActive, setIsActive] = useState<number>(0);
  const [username, setUsername] = useState(user?.username);

  const accountSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      bio: data.bio,
      username: data.username,
    };

    try {
      const response: AxiosResponse<Post> = await axios.patch(
        '/api/account',
        object,
      );
      setUsername(object.username);
      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const personalSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      firstName: data.firstName,
      secondName: data.secondName,
      birthday: data.birthday,
      gender: data.gender,
    };

    try {
      const response: AxiosResponse<Post> = await axios.patch(
        '/api/account',
        object,
      );

      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const addressSubmit = async (uf: string, city: string) => {
    const state = document.getElementById('state')?.innerText;

    const object = {
      uf,
      state,
      city,
    };

    try {
      const response: AxiosResponse<Post> = await axios.patch(
        '/api/account',
        object,
      );

      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const passwordSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.newPassword !== data.confirmNewPassword)
      return toast.error('As senhas não conferem!');
    const object = {
      newPassword: data.newPassword,
    };

    try {
      const response: AxiosResponse<Post> = await axios.put(
        '/api/password',
        object,
      );

      console.log(response);
      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const SocialNetworkSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      website: data.website,
      github: data.github,
      instagram: data.instagram,
      facebook: data.facebook,
      twitter: data.twitter,
      youtube: data.youtube,
    };

    try {
      const response: AxiosResponse<Post> = await axios.patch(
        '/api/account',
        object,
      );

      console.log(response);
      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const { register, handleSubmit } = useForm<FieldValues>();

  return {
    isActive,
    setIsActive,
    username,
    setUsername,
    accountSubmit,
    personalSubmit,
    addressSubmit,
    passwordSubmit,
    SocialNetworkSubmit,
    register,
    handleSubmit,
  };
};
