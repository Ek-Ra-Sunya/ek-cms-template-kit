/** Site config with the tenant's registered name standing in until one is set. */
export declare function getGenericSite(): Promise<{
    name: string;
    tagline: string;
    phones: string[];
    emails: string[];
    address: string;
    hours: {
        days: string;
        time: string;
    }[];
    social: {
        platform: string;
        url: string;
    }[];
    nav: import("@/lib/content/types").NavItem[];
    footerNav: import("@/lib/content/types").NavItem[];
    credentials: import("@/lib/content/cms-site").Credential[];
}>;
