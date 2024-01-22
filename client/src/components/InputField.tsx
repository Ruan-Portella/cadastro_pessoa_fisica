import { ChangeEvent } from 'react';

type InputFieldProps = {
    id: string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    isError?: string | undefined,
    label: string,
    className?: string,
    labelClassName?: string
    disabled?: boolean
};

type ErrorMessages = {
    [key: string]: string
};

const translateErrors: ErrorMessages = {
    'Name is required': 'Nome é obrigatório',
    'Name must be at least 3 characters': 'Nome deve ter pelo menos 3 caracteres',
    'Middle name is required': 'Sobrenome é obrigatório',
    'Middle name must be at least 3 characters': 'Sobrenome deve ter pelo menos 3 caracteres',
    'Date of birth is required': 'Data de nascimento é obrigatório',
    'Date of birth must be in the format DD/MM/YYYY': 'Data de nascimento deve estar no formato DD/MM/YYYY',
    'Email is required': 'Email é obrigatório',
    'Email must be in the format correct': 'Email deve estar no formato correto',
    'CPF is required': 'CPF é obrigatório',
    'CPF must be in the format 000.000.000-00': 'CPF deve estar no formato correto',
    'RG is required': 'RG é obrigatório',
    'RG must be in the format 00.000.000-0': 'RG deve estar no formato correto',
    'Street is required': 'Rua é obrigatório',
    'Complement is required': 'Complemento é obrigatório',
    'City is required': 'Cidade é obrigatório',
    'State is required': 'Estado é obrigatório',
    'Zip code is required': 'CEP é obrigatório',
    'Zip code must be in the format 00000-000': 'CEP deve estar no formato correto',
    'Type contact is required': 'Tipo de contato é obrigatório',
    'Contact is required': 'Contato é obrigatório',
    'Telephone is required': 'Telefone é obrigatório',
    'Password is required': 'Senha é obrigatório',
    'User already exists': "Usuário já existe",
};

export default function InputField({ 
    id, 
    type, 
    placeholder, 
    value, 
    onChange, 
    isError, 
    label, 
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
            {isError && <p className="text-red-500 mt-1 text-sm flex justify-end">{translateErrors[isError]}</p>}
        </div>
    )
}