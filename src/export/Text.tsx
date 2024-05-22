import { Text as ReactPDFText, TextProps as ReactPDFTextProps } from '@react-pdf/renderer';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Color = 'textPrimary' | 'textSecondary';

const sizeToFontSize: Record<Size, number> = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 24,
    xl: 32,
};
const colorToHex: Record<Color, string> = {
    textPrimary: '#072138',
    textSecondary: '#394D60',
};

type Props = React.PropsWithChildren<
    ReactPDFTextProps & {
        size?: Size;
        color?: Color;
    }
>;

export function Text({ size = 'base', color = 'textPrimary', ...props }: Props) {
    return (
        <ReactPDFText
            {...props}
            style={{
                ...props.style,
                color: colorToHex[color],
                fontSize: sizeToFontSize[size],
            }}
        />
    );
}
