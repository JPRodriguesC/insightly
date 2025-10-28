import React, { FC } from 'react';

interface TextAreaProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    className?: string;
    name?: string;
    id?: string;
    label?: string;
}

export const TextArea: FC<TextAreaProps> = ({
    value,
    onChange,
    placeholder,
    rows = 4,
    cols,
    disabled = false,
    className = '',
    name,
    id,
    label,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="textarea-container">
            {label && (
                <label htmlFor={id} className="textarea-label">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                disabled={disabled}
                className={className}
            />
        </div>
    );
};
