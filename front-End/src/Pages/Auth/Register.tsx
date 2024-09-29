import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import React from 'react';
import { useAuth } from './hooks/useAuth';
import { RegisterUserData } from '../../Interfaces/IUserData';
import { Navbar } from '../../components/navbar';
import { useToast } from '@/components/ui/use-toast';
import useFormData from './hooks/useFormData';
import { AuthInput } from '@/components/auth-input';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/api/requests';


export const Register = () => {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState<boolean>(false);
    const authenticateUser = useAuth();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            toast({
                title: 'You are already logged in',
            })
        }
    }, [isAuth, navigate]);
    const [loginData, handleInputChange] = useFormData<RegisterUserData>({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (loginData.password !== loginData.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            setLoading(true);
            const response = await registerUser(loginData.firstName, loginData.lastName, loginData.password);
            await authenticateUser(response);
            navigate('/');
        } catch (err: any) {
            toast({
                title: err.message
            })
        }
        setLoading(false);
    };

    return (
        <div className='h-screen bg-white flex justify-center items-center pt-[40%] md:pt-[0]'>
            <Navbar></Navbar>
            <div className='mt-8 w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between'>
                <div className='mx-auto'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AuthInput
                            type='text'
                            text='Име'
                            id='firstName'
                            onChange={handleInputChange}
                        />
                        <AuthInput
                            type='text'
                            text='Фамилия'
                            id='lastName'
                            onChange={handleInputChange}
                        />
                        <AuthInput
                            type='password'
                            text='Парола'
                            id='password'
                            onChange={handleInputChange}
                        />
                        <AuthInput
                            type='password'
                            text='Повтори паролата'
                            id='confirmPassword'
                            onChange={handleInputChange}
                        />
                        <div className='text-black text-left'>
                            Имате профил?{' '}
                            <Link to='/auth/login' className='font-bold '>
                                Влез
                            </Link>
                        </div>
                    </div>
                    <Button
                        className='shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100'
                        type='submit'
                        id='registerButton'
                        disabled={loading}
                        variant={'ghost'}

                    >
                        {loading ? 'Зареждане...' : 'Регистрация'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
