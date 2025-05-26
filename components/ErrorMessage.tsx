import React from 'react';

interface ErrorMessageProps {
    message?: string;
    show?: boolean;
    className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show = true, className = '' }) => {
    if (!show || !message) return null;

    return (
        <div className={`text-red-600 bg-red-100 border border-red-400 rounded px-4 py-2 text-sm ${className}`}>
            {message}
        </div >
    );
};

export default ErrorMessage;