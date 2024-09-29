import { Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import { Button } from '@/components/ui/button';

export const MarketingPage = () => {
    const isAuth = useIsAuthenticated();

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center flex-col'>
                <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                    <Medal className='h-6 w-6 mr-2' />
                    No 1 transport transaction system
                </div>
                <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
                    Заедно градим
                </h1>
                <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit'>
                    заедно прогресираме.
                </div>
            </div>
            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                Купувай лесно своите билети за градския транспорт
            </div>
            {isAuth() ? (
                <Button size={'lg'} asChild className='mt-2'>
                    <Link to='/products'>Купете своя билет сега</Link>
                </Button>
            ) : (
                <Button size={'lg'} asChild className='mt-2'>
                    <Link to='/products'>Купете своя билет сега</Link>
                </Button>
            )}
        </div>
    );
};
