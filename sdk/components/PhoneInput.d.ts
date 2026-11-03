import type { ComponentProps } from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
type PhoneInputProps = Omit<ComponentProps<typeof PhoneInputWithCountry>, "value" | "onChange"> & {
    value?: string | null;
    /** E.164 (e.g. +9779801234567), or "" while empty. Partial input is not yet valid. */
    onChange?: (value: string) => void;
};
/**
 * Phone field with a country selector (flag + dial code). Defaults to Nepal and
 * always reports E.164, so every form submits the same shape. Flags are bundled
 * rather than loaded from the package's CDN default.
 *
 * A stored local-format value (e.g. "01-4000000") is shown parsed as Nepali and
 * is not rewritten until the user edits it. One that cannot be parsed at all is
 * named under the empty field rather than silently hidden.
 */
export declare function PhoneInput({ value, onChange, inputComponent, ...rest }: PhoneInputProps): import("react").JSX.Element;
export {};
