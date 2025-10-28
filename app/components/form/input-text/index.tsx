import React, { FC } from 'react';

interface InputTextProps {
    id?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputText: FC<InputTextProps> = ({
    id,
    name,
    value,
    placeholder,
    disabled = false,
    required = false,
    className = '',
    label,
    onChange,
    onBlur,
}) => {
    return (
        <div className="input-text-container">
            {label && (
                <label htmlFor={id} className="input-text-label">
                    {label}
                </label>
            )}
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`input-text ${className}`}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};
