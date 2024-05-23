import { pdf } from '@react-pdf/renderer';
import LogRocket from 'logrocket';
import { PDF_FILENAME_PREFIX } from '../consts';
import { Export } from '../export/Export';
import { Property } from '../types';
import { formatAddress } from '../utils/formatAddress';

type Props = {
    subject: Property | null;
    appraisalComps: Property[];
    rovComps: Property[];
    comments: string;
    apiKey: string;
};

export function useExport(props: Props) {
    const { subject, appraisalComps, rovComps, comments, apiKey } = props;

    const isReady = !!subject && !!appraisalComps.length && !!rovComps.length;

    const downloadPDF = async () => {
        if (!subject) return;

        const blob = await pdf(
            <Export
                subject={subject}
                appraisalComps={appraisalComps}
                rovComps={rovComps}
                comments={comments}
                apiKey={apiKey}
            />
        ).toBlob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;

        const date = new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const fileName = `${PDF_FILENAME_PREFIX} ${date.toString()} - ${formatAddress(
            subject.address
        )}`;

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        LogRocket.track('ExportComplete', {
            subject: JSON.stringify(subject),
            appraisalComps: JSON.stringify(appraisalComps),
            rovComps: JSON.stringify(rovComps),
            comments: JSON.stringify(comments),
        });
    };

    return {
        isReady,
        downloadPDF,
    };
}
