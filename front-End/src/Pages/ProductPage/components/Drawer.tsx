import { getAllProfits } from '@/api/requests';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useEffect, useState } from 'react';

export const ProfitsDrawer = () => {
    const [profits, setProfits] = useState<number>(0);
    const fetchData = async () => {
        const total = await getAllProfits();
        setProfits(total[0].total);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={'secondary'}>
                    Провери приходите от продажба на билети
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className=' justify-center'>
                    <DrawerTitle>ПРИХОДИ</DrawerTitle>
                    <DrawerDescription>
                        приходи от продажба на билети за целия период
                    </DrawerDescription>
                </DrawerHeader>
                <div className='text-center'>
                    <div className='text-6xl font-bold text-neutral-700'>
                        {profits} лв.
                    </div>
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant='outline' type='submit'>Затвори</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
