import { forwardRef } from 'react';
import { SHARED_INPUT_SX } from '../consts';

type Props = Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'> & {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
    return (
        <textarea
            {...props}
            ref={ref}
            className={`${SHARED_INPUT_SX} p-2 ${props.className ?? ''}`}
        />
    );
});
