export function formatDistance(distance: number | null): string {
    return distance !== null ? `${distance.toFixed(2)} mi` : 'Unknown proximity';
}
