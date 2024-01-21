import { ChangeEvent } from 'react';

type InputFieldProps = {
    id: string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    isError?: boolean | undefined,
    label: string,
    errorMessage?: string
    className?: string,
    labelClassName?: string
    disabled?: boolean
};

export default function InputField({ 
    id, 
    type, 
    placeholder, 
    value, 
    onChange, 
    isError, 
    label, 
    errorMessage, 
    className, 
    labelClassName, 
    disabled 
}: InputFieldProps) {
    return (
        <div className={`w-1/2 flex flex-col gap-1 ${className}`}>
            <label className={`flex items-start ${labelClassName}`} htmlFor={id}>
                {label}
            </label>
            <input
                disabled={disabled}
                className={`p-3 w-full text-white ${isError && "border-red-500"} border-[1px] outline-none rounded-lg`}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {isError && <p className="text-red-500 mt-1 text-sm flex justify-end">{errorMessage}</p>}
        </div>
    )
}