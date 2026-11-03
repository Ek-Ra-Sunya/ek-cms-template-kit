import type { CmsForm } from "./cms-types";
/**
 * A form field, narrowed from the CMS's free-form `fields` JSONB.
 *
 * Editors can reshape this at any time, so every field is read defensively and
 * anything unusable is dropped rather than rendered as a broken control.
 */
export interface FormField {
    name: string;
    label: string;
    type: FormFieldType;
    required: boolean;
    options: string[];
    placeholder?: string;
    help?: string;
}
/** Control types the site knows how to render. Anything else falls back to text. */
declare const FIELD_TYPES: readonly ["text", "email", "tel", "number", "date", "textarea", "select", "file"];
export type FormFieldType = (typeof FIELD_TYPES)[number];
/**
 * Reads a CMS form's `fields` into renderable field definitions.
 *
 * A field with no usable `name` is dropped: `name` is the key the answer is
 * stored under, so a nameless field would silently discard whatever the
 * applicant typed into it.
 */
export declare function toFormFields(form: CmsForm | null): FormField[];
export {};
