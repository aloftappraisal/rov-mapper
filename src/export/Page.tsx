import {
    Image,
    PageProps,
    Page as ReactPDFPage,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    children: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    footerText: {
        flexShrink: 0,
        alignSelf: 'center',
        fontSize: 14,
    },
});

export function Page({ children, ...pageProps }: React.PropsWithChildren<PageProps>) {
    const exportDate = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <ReactPDFPage size="A4" style={styles.page} {...pageProps}>
            <View
                fixed
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
                <Image
                    style={styles.logo}
                    src="https://aloft-public-assets.s3.us-west-2.amazonaws.com/Logo%3DTwo+Color%401x.png"
                />
                <View>
                    <Text style={{ fontSize: 14 }}>{exportDate}</Text>
                </View>
            </View>
            <View style={styles.children}>{children}</View>
            <Text
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                style={styles.footerText}
                fixed
            />
        </ReactPDFPage>
    );
}
