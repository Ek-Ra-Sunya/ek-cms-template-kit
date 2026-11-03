import type { ResolvedTemplate, TemplateModule } from './types';
export declare function resolveTemplate(name: string, registry: Record<string, TemplateModule>): ResolvedTemplate | null;
