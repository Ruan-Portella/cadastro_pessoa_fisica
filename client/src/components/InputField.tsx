import { ChangeEvent } from 'react';

type InputFieldProps = {
    id: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    label: string
};

export default function InputField({ id, type, placeholder, value, onChange, error, label }: InputFieldProps) {
    return (
        <div className="w-1/2 flex flex-col gap-1">
            <label className="flex items-start" htmlFor={id}>
                {label}
            </label>
            <input
                className={`p-3 w-full text-white ${error && "border-red-500"} border-[1px] outline-none rounded-lg`}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {error && <p className="text-red-500 mt-1 text-sm flex justify-end">{error}</p>}
        </div>
    )
}