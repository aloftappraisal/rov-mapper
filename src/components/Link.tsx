import { ButtonLikeSize } from '../types';
import { getButtonLikeStyles } from '../utils/getButtonLikeStyles';

type Props = {
    size?: ButtonLikeSize;
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export function Link({ size = 'md', className, ...rest }: Props) {
    const buttonLikeSx = getButtonLikeStyles(size);
    return <a {...rest} className={`${buttonLikeSx} ${className ?? ''}`} />;
}
