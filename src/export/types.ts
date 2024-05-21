import { Property } from '../types';

export type ExportProps = {
    subject: Property;
    appraisalComps: Property[];
    rovComps: Property[];
    comments: string;
    apiKey: string;
};
