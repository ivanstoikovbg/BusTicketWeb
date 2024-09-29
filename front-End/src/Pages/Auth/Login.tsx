import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { loginUser } from '../../api/requests';
import { LoginUserData } from '../../Interfaces/IUserData';
import { useAuth } from './hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import useFormData from './hooks/useFormData';
import { AuthInput } from '@/components/auth-input';
import { Navbar } from '@/components/navbar';
import { Logo } from '@/components/logo';


export const Login = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const authenticateUser = useAuth();
    const { toast } = useToast()

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            toast({
                title: 'Вече сте логнат',
            })
        }
    }, [isAuth, navigate]);
    const [loginData, handleInputChange] = useFormData<LoginUserData>({
        firstName: '',
        password: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginData?.firstName || !loginData?.password)
                throw new Error('Моля попълнете всички полета!');
            setLoading(true);
            const response = await loginUser(loginData!.firstName, loginData!.password);
            await authenticateUser(response);
            navigate('/');
        } catch (err: any) {
            toast({
                title: err.message,
            })
        }
        setLoading(false);
    };

    return (
        <div className='h-screen bg-white flex justify-center items-center'>
            <Navbar></Navbar>
            <div className='w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between'>
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
                            type='password'
                            text='Парола'
                            id='password'
                            onChange={handleInputChange}
                        />
                        <div className='text-black text-left'>
                            Не сте регистриран?{' '}
                            <Link to={'/auth/register'} className='font-semibold'>
                                Регистрация
                            </Link>
                        </div>
                    </div>
                    <Button
                        className='shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100'
                        type='submit'
                        variant={'ghost'}
                        id='registerButton'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
