import { Document, View } from '@react-pdf/renderer';
import { SubjectMarkerSVG } from '../components/SubjectMarkerSVG';
import { formatAddress } from '../utils/formatAddress';
import { CompLists } from './CompLists';
import { Page } from './Page';
import { StaticMap } from './StaticMap';
import { Text } from './Text';
import { ExportProps } from './types';
import { CompMarkerSVG } from '../components/CompMarkerSVG';

export function Export({ subject, appraisalComps, rovComps, comments, apiKey }: ExportProps) {
    return (
        <Document>
            {/* map page */}
            <Page>
                <View
                    style={{
                        display: 'flex',
                        gap: 16,
                    }}
                >
                    <Text size="xl" style={{ fontWeight: 'bold', alignSelf: 'center' }}>
                        ROV Mapper
                    </Text>
                    <Text>Subject: {formatAddress(subject.address)}</Text>
                </View>
                <View style={{ flexGrow: 1 }}>
                    <StaticMap
                        subject={subject}
                        appraisalComps={appraisalComps}
                        rovComps={rovComps}
                        apiKey={apiKey}
                        // NOTE: Width and height need to be updated if the layout of the page changes.
                        //  535x573 assumes one line for the subject; if there are 2+ lines, the map
                        //  gets slightly squished.
                        width="535"
                        height="573"
                    />
                </View>
                <View
                    style={{
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 16,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <SubjectMarkerSVG env="export" size="sm" showIcon={false} />
                        <Text size="sm" color="textSecondary">
                            = Subject Property
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <CompMarkerSVG type="appraisal" env="export" size="sm" />
                        <Text size="sm" color="textSecondary">
                            = Appraisal Comparables
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <CompMarkerSVG type="rov" env="export" size="sm" />
                        <Text size="sm" color="textSecondary">
                            = ROV Transactions
                        </Text>
                    </View>
                </View>
            </Page>
            {/* comps and comments page */}
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
                <View break style={{ display: 'flex', gap: 16 }} wrap={false}>
                    <Text size="lg">Comments</Text>
                    <Text style={{ lineHeight: 1.75 }}>{comments}</Text>
                </View>
            </Page>
        </Document>
    );
}
