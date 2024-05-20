type Props = React.PropsWithChildren<{ for: string; label: string; className?: string }>;

export function FormGroup({ for: htmlFor, label, className, children }: Props) {
    return (
        <div className={`flex flex-col gap-1 ${className ?? ''}`}>
            <div>
                <label htmlFor={htmlFor} className="font-bold">
                    {label}
                </label>
            </div>
            {children}
        </div>
    );
}
