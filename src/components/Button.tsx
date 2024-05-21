type Props = {
    size?: 'sm' | 'md';
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const smSx = 'h-6 px-3 py-1 text-xs';
const mdSx = 'px-10 py-3 h-10 text-sm';

export function Button({ size = 'md', className, ...rest }: Props) {
    return (
        <button
            {...rest}
            className={`${
                size === 'sm' ? smSx : mdSx
            } font-bold border text-white bg-button-default rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                className ?? ''
            }`}
        />
    );
}
