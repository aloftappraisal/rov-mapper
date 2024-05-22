import {
    ClipPath as ReactPDFClipPath,
    Defs as ReactPDFDefs,
    G as ReactPDFG,
    Path as ReactPDFPath,
    Rect as ReactPDFRectElement,
} from '@react-pdf/renderer';
import { SUBJECT_MARKER_COLOR } from '../consts';
import { MapMarkerEnv, MapMarkerSize } from '../types';
import { SVG } from './SVG';

type Props = {
    env: MapMarkerEnv;
    size?: MapMarkerSize;
};

export function SubjectMarkerSVG({ env, size = 'md' }: Props) {
    const PathElement = env === 'web' ? 'path' : ReactPDFPath;
    const GElement = env === 'web' ? 'g' : ReactPDFG;
    const DefsElement = env === 'web' ? 'defs' : ReactPDFDefs;
    const ClipPathElement = env === 'web' ? 'clipPath' : ReactPDFClipPath;
    const RectElement = env === 'web' ? 'rect' : ReactPDFRectElement;

    const clipPathPropertyName = env === 'web' ? 'clipPath' : 'clip-path';

    return (
        <SVG env={env} size={size}>
            <PathElement
                d="M18.5 9.91304C18.5 12.4863 17.3285 14.7245 15.5481 16.9351C14.3446 18.4293 12.9024 19.8671 11.3939 21.371C10.7699 21.9931 10.1345 22.6265 9.5 23.2799C8.86548 22.6265 8.23012 21.9931 7.60611 21.371C6.09757 19.8671 4.65538 18.4293 3.45191 16.9351C1.67154 14.7245 0.5 12.4863 0.5 9.91304C0.5 4.69409 4.54928 0.5 9.5 0.5C14.4507 0.5 18.5 4.69409 18.5 9.91304Z"
                fill={SUBJECT_MARKER_COLOR.toColorCode()}
                stroke="white"
            />
            <GElement
                {...{
                    [clipPathPropertyName]: 'url(#clip0_13620_51483)',
                }}
            >
                <PathElement
                    d="M13.8334 14.4348C13.8334 14.5847 13.7763 14.7285 13.6747 14.8345C13.5731 14.9405 13.4353 15 13.2917 15H5.70835C5.56469 15 5.42692 14.9405 5.32534 14.8345C5.22376 14.7285 5.16669 14.5847 5.16669 14.4348V9.34783H3.54169L9.13548 4.04157C9.2352 3.94688 9.36519 3.89441 9.50002 3.89441C9.63485 3.89441 9.76483 3.94688 9.86456 4.04157L15.4584 9.34783H13.8334V14.4348ZM12.75 13.8696V8.30613L9.50002 5.22344L6.25002 8.30613V13.8696H12.75ZM9.50002 12.7391L7.68056 10.8406C7.56739 10.7225 7.47762 10.5823 7.41637 10.428C7.35512 10.2737 7.3236 10.1083 7.3236 9.94131C7.3236 9.7743 7.35512 9.60893 7.41637 9.45463C7.47762 9.30033 7.56739 9.16014 7.68056 9.04205C7.79373 8.92395 7.92809 8.83028 8.07596 8.76637C8.22382 8.70245 8.3823 8.66956 8.54235 8.66956C8.7024 8.66956 8.86089 8.70245 9.00875 8.76637C9.15662 8.83028 9.29097 8.92395 9.40414 9.04205L9.50002 9.14209L9.59589 9.04205C9.70907 8.92395 9.84342 8.83028 9.99129 8.76637C10.1392 8.70245 10.2976 8.66956 10.4577 8.66956C10.6177 8.66956 10.7762 8.70245 10.9241 8.76637C11.072 8.83028 11.2063 8.92395 11.3195 9.04205C11.4327 9.16014 11.5224 9.30033 11.5837 9.45463C11.6449 9.60893 11.6764 9.7743 11.6764 9.94131C11.6764 10.1083 11.6449 10.2737 11.5837 10.428C11.5224 10.5823 11.4327 10.7225 11.3195 10.8406L9.50002 12.7391Z"
                    fill="white"
                />
            </GElement>
            <DefsElement>
                <ClipPathElement id="clip0_13620_51483">
                    <RectElement
                        width="13"
                        height="13.5652"
                        fill="white"
                        transform="translate(3 3.13043)"
                    />
                </ClipPathElement>
            </DefsElement>
        </SVG>
    );
}
