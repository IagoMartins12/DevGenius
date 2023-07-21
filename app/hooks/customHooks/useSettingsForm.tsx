import { useGlobalContext } from '@/app/context/store';
import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useSettingsForm = () => {
  const [isActive, setIsActive] = useState<number>(0);
  const { setCurrentUserState } = useGlobalContext();

  const accountSubmit: SubmitHandler<FieldValues> = async data => {
    const object = {
      bio: data.bio,
      username: data.username,
    };

    try {
      await axios.patch('/api/account', object);
      toast.success('Dados atualizados!');
      setCurrentUserState(prevState => {
        if (prevState) {
          return {
            ...prevState,
            bio: object.bio,
            username: object.username,
          };
        }
        return null; // If prevState is null, return null to keep the state as null
      });
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
      await axios.patch('/api/account', object);
      setCurrentUserState(prevState => {
        if (prevState) {
          return {
            ...prevState,
            firstName: object.firstName,
            secondName: object.secondName,
            birthday: object.birthday,
            gender: object.gender,
          };
        }
        return null; // If prevState is null, return null to keep the state as null
      });
      toast.success('Dados atualizados!');
    } catch (err) {
      toast.error('Algo deu errado, tente novamente :(');
      console.log(err);
    }
  };

  const addressSubmit = async (uf: string, city: string) => {
    const state = document.getElementById('state')?.innerText;
    console.log('chamou');
    if (!state) return;

    const object = {
      uf,
      state,
      city,
    };

    try {
      await axios.patch('/api/account', object);
      setCurrentUserState(prevState => {
        if (prevState) {
          return {
            ...prevState,
            uf,
            city,
            state,
          };
        }
        return null; // If prevState is null, return null to keep the state as null
      });
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
      await axios.put('/api/password', object);
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
      await axios.patch('/api/account', object);
      setCurrentUserState(prevState => {
        if (prevState) {
          return {
            ...prevState,
            website: object.website,
            github: object.github,
            instagram: object.instagram,
            facebook: object.facebook,
            twitter: object.twitter,
            youtube: object.youtube,
          };
        }
        return null; // If prevState is null, return null to keep the state as null
      });

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
    accountSubmit,
    personalSubmit,
    addressSubmit,
    passwordSubmit,
    SocialNetworkSubmit,
    register,
    handleSubmit,
  };
};
