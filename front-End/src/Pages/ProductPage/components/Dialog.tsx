import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { buyTicket } from '@/api/requests';
import { toast } from '@/components/ui/use-toast';
import { useAuthUser } from 'react-auth-kit';
import { DialogClose } from '@radix-ui/react-dialog';

export const DialogProduct: React.FC<{ selectedType: string }> = ({
    selectedType,
}) => {
    const auth = useAuthUser();
    let user;
    if(auth){
        user = auth();
    }
    const handleSubmit = async () => {
        if (!name || !lastName) {
            toast({ title: 'Моля въведете име и фамилия' });
            return;
        }
        if (!selectedType) {
            toast({ title: 'Моля изберете тип билет' });
            return;
        }
        const result = await buyTicket({
            name,
            lastName,
            ticketType: selectedType,
        });
        console.log(result);
        toast({ title: 'Успешно закупен билет! ', description: 'Благодарим ви за закупуването на билет от нас! Тип: ' + selectedType + " QR Code: " + result.qrCode});
        
    };
    const [name, setName] = useState<string>('Peter');
    const [lastName, setLastName] = useState<string>('Petrov');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Купи</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Въведете данните си</DialogTitle>
                    <DialogDescription>
                        Въведете данните за билета си
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Име
                        </Label>
                        <Input
                            id='name'
                            className='col-span-3'
                            defaultValue={user?.firstName}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='lastName' className='text-right'>
                            Фамилия
                        </Label>
                        <Input
                            id='lastName'
                            defaultValue={user?.lastName}

                            className='col-span-3'
                            onChange={(e: any) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type='submit' onClick={handleSubmit}>
                        Купи
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
