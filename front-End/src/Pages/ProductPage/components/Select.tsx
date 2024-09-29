import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const SelectForm: React.FC<{ setSelectedType: (type: string) => void }> = ({ setSelectedType }) => {
  
    return (
        <Select
            onValueChange={(value) => {
                setSelectedType(value);
            }}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Изберете тип билет' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Типове</SelectLabel>
                    <SelectItem value='student'>Ученически</SelectItem>
                    <SelectItem value='student2'>Студенстки</SelectItem>
                    <SelectItem value='regular'>Стандартен</SelectItem>
                    <SelectItem value='retiree'>За пенсионер</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
