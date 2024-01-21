import { ChangeEvent } from 'react';
import { State } from './AdressesModal';

type SelectFieldProps = {
    id: string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
    isError?: boolean | undefined,
    label: string,
    errorMessage?: string
    className?: string,
    labelClassName?: string
    disabled?: boolean
    data: State[]
};

export default function SelectField({ 
    id, 
    placeholder, 
    value, 
    isError, 
    label, 
    errorMessage, 
    className, 
    labelClassName, 
    disabled,
    data,
    onChange
}: SelectFieldProps) {
    return (
        <div className={`w-1/2 flex flex-col gap-1 ${className}`}>
            <label className={`flex items-start ${labelClassName}`} htmlFor={id}>
                {label}
            </label>
            <select
                disabled={disabled}
                className={`p-3 w-full text-white ${isError && "border-red-500"} border-[1px] outline-none rounded-lg`}
                id={id}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled selected>{placeholder}</option>
                {
                    data.map((item) => (
                        <option key={item.id} value={item.nome}>{item.nome}</option>
                    ))
                
                }
            </select>
            {isError && <p className="text-red-500 mt-1 text-sm flex justify-end">{errorMessage}</p>}
        </div>
    )
}