/** A free-form JSON item read as a card: the key names vary by tenant. */
export declare function toCard(item: unknown): {
    title: string;
    body: string;
    image: string;
    href: string;
};
export declare function Cards({ items }: {
    items: ReturnType<typeof toCard>[];
}): import("react").JSX.Element | null;
