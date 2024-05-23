import { ButtonLikeSize } from '../types';
import { getButtonLikeStyles } from '../utils/getButtonLikeStyles';

type Props = {
    size?: ButtonLikeSize;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({ size = 'md', className, ...rest }: Props) {
    const buttonLikeSx = getButtonLikeStyles(size);
    return <button {...rest} className={`${buttonLikeSx} ${className ?? ''}`} />;
}
