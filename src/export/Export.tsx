import { Document, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ExportProps } from './types';
import { Page } from './Page';
import { formatAddress } from '../utils/formatAddress';
import { StaticMap } from './StaticMap';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 30,
        gap: 16,
    },
    logo: {
        height: 20,
        minHeight: 20,
        maxHeight: 20,
        width: 60,
        minWidth: 60,
        maxWidth: 60,
        flexShrink: 0,
    },
    titleWrapper: {
        alignSelf: 'center',
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    children: {
        flexGrow: 1,
    },
    footerText: {
        flexShrink: 0,
        alignSelf: 'center',
        fontSize: 14,
    },
});

export function Export({ subject, appraisalComps, rovComps, apiKey }: ExportProps) {
    return (
        <Document>
            <Page>
                <View
                    style={{
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    <Text style={styles.titleText}>ROV Mapper</Text>
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
                        apiKey={apiKey}
                    />
                </View>
            </Page>
        </Document>
    );
}
