export interface Envelope<T> {
    status: string;
    statusCode: number;
    message: string;
    data: T;
    meta?: PageMeta;
}
export interface PageMeta {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}
export interface ApiError {
    status: 'error';
    statusCode: number;
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
}
/** Keys must match TENANT_THEMES in the backend; the API rejects anything else. */
export declare const TENANT_THEMES: readonly [{
    readonly value: "navy";
    readonly label: "Navy";
    readonly swatch: "#1c4587";
    readonly description: "Professional-services blue. Authoritative and conventional.";
}, {
    readonly value: "emerald";
    readonly label: "Emerald";
    readonly swatch: "#0b6b4f";
    readonly description: "Deep green. Reads growth and advisory rather than audit.";
}, {
    readonly value: "slate";
    readonly label: "Slate";
    readonly swatch: "#33414f";
    readonly description: "Near-monochrome. Quiet and editorial, lets photography lead.";
}, {
    readonly value: "plum";
    readonly label: "Plum";
    readonly swatch: "#5b2a56";
    readonly description: "Deep aubergine. Distinctive without being loud.";
}, {
    readonly value: "sand";
    readonly label: "Sand";
    readonly swatch: "#7a4a24";
    readonly description: "Warm neutral with a bronze accent. Softer, less corporate.";
}];
export type TenantTheme = (typeof TENANT_THEMES)[number]['value'];
/**
 * A feature module as the backend defines it, fetched from GET /tenants/modules.
 *
 * This list is deliberately NOT hard-coded here. It used to be, and it drifted:
 * `media` became a core module in the backend while this copy still offered it
 * as a switch, so toggling it wrote a value the API ignores and now rejects.
 * The registry has one home, and it is the backend.
 *
 * `core` modules are the CMS itself. They are always on, the API rejects an
 * attempt to toggle one, and the UI must render them read-only.
 */
export interface TenantModuleDef {
    key: string;
    label: string;
    surface: 'public' | 'admin' | 'both';
    description: string;
    core: boolean;
}
export type TenantModuleKey = string;
/**
 * A hostname the tenant is reachable on. `admin` is where the white-label CMS
 * dashboard is served (drives GET /public/resolve-domain); `primary` +
 * isPrimary is the tenant's public site, used for resolving legacy asset
 * paths, so there should always be exactly one primary entry.
 */
export interface TenantDomain {
    domain: string;
    type: 'primary' | 'custom' | 'subdomain' | 'admin' | 'redirect';
    isPrimary: boolean;
}
export interface Tenant {
    id: string;
    tenantName: string;
    slug: string;
    schemaName: string;
    status: string;
    fullName?: string;
    domains?: TenantDomain[];
    allowedOrigins?: string[];
    publicBaseUrl?: string;
    formNotifyEmail?: string;
    turnstileSiteKey?: string;
    turnstileSecretSet?: boolean;
    theme?: TenantTheme;
    template?: string | null;
    allowedThemes?: string[];
    allowRegistration?: boolean;
    modules?: Record<string, boolean>;
    suspensionReason?: 'payment_due' | 'other';
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
    createdAt?: string;
}
export interface TenantMetric {
    id: string;
    name: string;
    schemaName: string;
    status: string;
    pages: number;
    posts: number;
    rooms: number;
    bookings: number;
}
export interface PlatformMetrics {
    tenants: {
        total: number;
        active: number;
        suspended: number;
    };
    perTenant: TenantMetric[];
}
export interface SuperadminUser {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    createdAt?: string;
}
/** `emailVerified` is separate from `isActive`: login rejects an unverified
 *  user with a 403 even when they are active, and there is no self-serve
 *  verification, so only a superadmin can clear it. */
export interface TenantUser {
    id: string;
    email: string;
    fullName: string;
    roleName: string | null;
    isActive: boolean;
    emailVerified?: boolean;
    createdAt?: string;
}
export interface ImpersonationSession {
    accessToken: string;
    tenantId: string;
    schemaName: string;
    expiresInSeconds: number;
}
/** Platform-wide settings edited by the superadmin. The Turnstile secret is
 *  never returned — only whether one is stored. */
export interface PlatformSettings {
    turnstileSiteKey?: string;
    turnstileSecretSet: boolean;
    /** Platform SMTP every tenant inherits unless it overrides it on its own dashboard. */
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpFrom?: string;
    /** Whether a password is stored. The password itself is never returned. */
    smtpPassSet: boolean;
    /** True only when host AND from are both set - mail does not send otherwise. */
    smtpActive: boolean;
    /** R2 object storage every tenant inherits unless it overrides storage itself. */
    r2Endpoint?: string;
    r2Bucket?: string;
    r2AccessKeyId?: string;
    /** Whether a secret is stored. The secret itself is never returned. */
    r2SecretSet: boolean;
    r2PublicBaseUrl?: string;
    /**
     * Which config is actually in force. A half-filled row silently falls back to
     * the server's environment variables, so the dashboard has to be able to say
     * "saved but not live" rather than implying the saved values are being used.
     */
    r2Source: 'database' | 'environment';
    /** The bucket the environment variables point at, shown when r2Source is 'environment'. */
    r2EnvFallbackBucket?: string;
    /** EK Payment online checkout. Both secrets are reported only as set/unset. */
    ekpayApiUrl?: string;
    ekpaySecretKeySet?: boolean;
    ekpayWebhookSecretSet?: boolean;
    updatedAt?: string;
}
export type UpgradeRequestStatus = 'pending' | 'approved' | 'rejected';
/** One tenant's request to move to a paid plan, as the superadmin sees it. */
export interface UpgradeRequestRow {
    id: string;
    tenantId: string;
    tenantName: string;
    tenantSlug: string;
    planCode: string;
    months: number;
    paymentReference: string;
    note: string | null;
    requesterEmail: string | null;
    status: UpgradeRequestStatus;
    amountNpr: number | null;
    approvedMonths: number | null;
    rejectReason: string | null;
    decidedAt: string | null;
    createdAt: string;
}
/** A site kit as the superadmin gallery screen lists it; ownerSlug is null for gallery kits. */
export interface SiteKitRow {
    id: string;
    name: string;
    description: string | null;
    visibility: 'private' | 'platform';
    latestVersion: number;
    thumbnailUrl: string | null;
    demoUrl: string | null;
    updatedAt: string;
    ownerSlug: string | null;
    retiredAt: string | null;
}
