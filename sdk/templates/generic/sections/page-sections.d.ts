import type { ReactElement } from "react";
import type { CmsSection } from "@/lib/content/cms-types";
export declare function renderSection(section: CmsSection): ReactElement | null;
export declare function PageSections({ sections }: {
    sections: CmsSection[];
}): import("react").JSX.Element;
