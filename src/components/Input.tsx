import { forwardRef } from 'react';
import { SHARED_INPUT_SX } from '../consts';

type Props = React.HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            className={`${SHARED_INPUT_SX} h-11 px-2 ${props.className ?? ''}`}
        />
    );
});
