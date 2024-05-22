import { View } from '@react-pdf/renderer';
import { CompMarkerSVG } from '../components/CompMarkerSVG';
import { CompType, Property } from '../types';
import { formatAddress } from '../utils/formatAddress';
import { formatDistance } from '../utils/formatDistance';
import { getDistance } from '../utils/getDistance';
import { Text } from './Text';

type Props = {
    subject: Property;
    appraisalComps: Property[];
    rovComps: Property[];
};

export function CompLists({ subject, appraisalComps, rovComps }: Props) {
    const rows: React.ReactNode[] = [];

    const maxLength = Math.max(appraisalComps.length, rovComps.length);
    for (let i = 0; i < maxLength; i += 1) {
        const appraisalComp = appraisalComps[i];
        const rovComp = rovComps[i];

        const row = (
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }} break>
                <CompCell type="appraisal" index={i} subject={subject} comp={appraisalComp} />
                <CompCell type="rov" index={i} subject={subject} comp={rovComp} />
            </View>
        );

        rows.push(row);
    }

    return rows;
}

function CompCell({
    type,
    index,
    subject,
    comp,
}: {
    type: CompType;
    index: number;
    subject: Property;
    comp: Property | undefined;
}) {
    if (!comp) return null;
    const distance = getDistance(subject.location, comp.location);
    return (
        <View style={{ flex: 1, display: 'flex', gap: 4 }}>
            <View>
                <CompMarkerSVG type={type} index={index} env="export" size="sm" />
            </View>
            <View style={{ display: 'flex', gap: 4 }}>
                <Text>{formatAddress(comp.address)}</Text>
                <Text size="sm" color="textSecondary">
                    {formatDistance(distance)}
                </Text>
            </View>
        </View>
    );
}
