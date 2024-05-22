import { makeColor } from './utils/makeColor';

export const SHARED_INPUT_SX =
    'bg-surface-1 border-stroke-default border rounded hover:border-hover-2 placeholder:text-text-disabled focus:border-selected-2 focus:outline-none focus:shadow-selected-2 shadow-sm focus:shadow-none disabled:hover:border-stroke-default disabled:bg-surface-readonly disabled:cursor-not-allowed';

export const MAX_APPRAISAL_COMPS = 12;
export const MAX_ROV_COMPS = 5;

export const PDF_FILENAME_PREFIX = 'Aloft ROV Mapper';

export const MARKER_SVG_VIEWBOX_DIMENSIONS = {
    width: '19',
    height: '24',
};

export const SUBJECT_MARKER_COLOR = makeColor('FA3C48');
export const APPRAISAL_MARKER_COLOR = makeColor('9552EE');
export const ROV_MARKER_COLOR = makeColor('13B5CB');
