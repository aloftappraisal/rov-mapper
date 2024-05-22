import { View } from '@react-pdf/renderer';
import { Property } from '../types';
import { formatAddress } from '../utils/formatAddress';
import { Text } from './Text';
import { getDistance } from '../utils/getDistance';
import { formatDistance } from '../utils/formatDistance';

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
                <View style={{ flex: 1 }}>
                    <CompCell subject={subject} comp={appraisalComp} />
                </View>
                <View style={{ flex: 1 }}>
                    <CompCell subject={subject} comp={rovComp} />
                </View>
            </View>
        );

        rows.push(row);
    }

    return rows;
}

function CompCell({ subject, comp }: { subject: Property; comp: Property | undefined }) {
    if (!comp) return null;
    const distance = getDistance(subject.location, comp.location);
    return (
        <View style={{ display: 'flex', gap: 4 }}>
            <Text>{formatAddress(comp.address)}</Text>
            <Text size="sm" color="textSecondary">
                {formatDistance(distance)}
            </Text>
        </View>
    );
}
