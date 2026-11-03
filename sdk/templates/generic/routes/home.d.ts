/**
 * `/`: the page with slug `home`, else the first page published. A new tenant
 * with nothing published yet gets a plain notice instead of a 404.
 */
export default function HomePage(): Promise<import("react").JSX.Element>;
