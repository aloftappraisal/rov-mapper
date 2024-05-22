import { Document, View } from '@react-pdf/renderer';
import { formatAddress } from '../utils/formatAddress';
import { CompLists } from './CompLists';
import { Page } from './Page';
import { StaticMap } from './StaticMap';
import { Text } from './Text';
import { ExportProps } from './types';

export function Export({ subject, appraisalComps, rovComps, comments, apiKey }: ExportProps) {
    return (
        <Document>
            <Page>
                <View
                    style={{
                        alignSelf: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    <Text size="xl" style={{ fontWeight: 'bold' }}>
                        ROV Mapper
                    </Text>
                    {/* TODO: Handle subject overflow */}
                    <Text>
                        Subject:
                        {formatAddress(subject.address)}
                    </Text>
                </View>
                <View style={{ flexGrow: 1 }}>
                    <StaticMap
                        subject={subject}
                        appraisalComps={appraisalComps}
                        rovComps={rovComps}
                        width="535" // NOTE: Width and height need to be updated if the layout of the page changes
                        height="627"
                        apiKey={apiKey}
                    />
                </View>
            </Page>
            <Page>
                <View style={{ display: 'flex', gap: 16 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text size="lg">Appraisal Comps</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text size="lg">ROV Comps</Text>
                        </View>
                    </View>
                    <CompLists
                        subject={subject}
                        appraisalComps={appraisalComps}
                        rovComps={rovComps}
                    />
                </View>
                <View break style={{ display: 'flex', gap: 16 }}>
                    <Text size="lg">Comments</Text>
                    <Text style={{ lineHeight: 1.75 }}>{comments}</Text>
                </View>
            </Page>
        </Document>
    );
}
