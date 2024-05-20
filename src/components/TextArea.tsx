import { forwardRef } from 'react';
import { sharedInputSx } from '../consts';

type Props = Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'> & {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
    return (
        <textarea
            {...props}
            ref={ref}
            className={`${sharedInputSx} p-2 ${props.className ?? ''}`}
        />
    );
});
