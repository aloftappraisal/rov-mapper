import { Svg as ReactPDFSvg } from '@react-pdf/renderer';
import { MARKER_SVG_VIEWBOX_DIMENSIONS } from '../consts';
import { MapMarkerEnv, MapMarkerSize } from '../types';
import { getMapMarkerDimensions } from '../utils/getMapMarkerDimensions';

type SVGProps = React.PropsWithChildren<{
    env: MapMarkerEnv;
    size?: MapMarkerSize;
}>;

export function SVG({ env, size = 'md', children }: SVGProps) {
    const SvgElement = env === 'web' ? 'svg' : ReactPDFSvg;
    const { width, height } = getMapMarkerDimensions(size);

    return (
        <SvgElement
            width={width}
            height={height}
            viewBox={`0 0 ${MARKER_SVG_VIEWBOX_DIMENSIONS.width} ${MARKER_SVG_VIEWBOX_DIMENSIONS.height}`}
        >
            {children}
        </SvgElement>
    );
}
