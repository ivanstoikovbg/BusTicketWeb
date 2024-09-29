import { Navbar } from '@/components/navbar';
import { DialogProduct } from './components/Dialog';
import { SelectForm } from './components/Select';
import { ProfitsDrawer } from './components/Drawer';
import { useState } from 'react';

export const ProductPage = () => {
    const [selectedType, setSelectedType] = useState<string>('');


    return (
        <div className='h-screen w-screen bg-slate-100 flex flex-col items-center justify-center'>
            <Navbar />
            <div>
                <div className=' text-center'>

            <h1 className=' text-lg'>Купи своя билет сега!</h1>
                </div>
                <div className='flex items-center space-y-2 mt-10 space-x-4'>
                    <h2 className=''>Изберете вида билет</h2>
                    <SelectForm setSelectedType={setSelectedType}/>
                    <DialogProduct selectedType={selectedType} />
                </div>
            </div>
            <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100 text-center">
                <ProfitsDrawer></ProfitsDrawer>
            </div>
        </div>
    );
};
