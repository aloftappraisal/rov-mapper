export function CompList({ children }: React.PropsWithChildren) {
    return <ol className="flex flex-col gap-2 max-h-56 overflow-auto">{children}</ol>;
}
