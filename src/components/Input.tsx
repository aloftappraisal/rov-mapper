import { forwardRef } from 'react';
import { sharedInputSx } from '../consts';

type Props = React.HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            className={`${sharedInputSx} h-11 px-2 ${props.className ?? ''}`}
        />
    );
});
