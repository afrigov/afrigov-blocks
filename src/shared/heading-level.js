import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";

/** Which heading level a list's items use: level 3 under a section heading, level 2 when the list is the section. */
export function HeadingLevel({ what, value, onChange }) {
  return (
    <SelectControl
      label={what}
      help={__("Level 3 under a section heading. Level 2 when there is no heading above.", "afrigov-blocks")}
      value={String(value)}
      options={[
        { label: __("Heading level 3", "afrigov-blocks"), value: "3" },
        { label: __("Heading level 2", "afrigov-blocks"), value: "2" },
      ]}
      onChange={(level) => onChange(Number(level))}
    />
  );
}
