import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { LinkField, NoLink } from "../shared/link-field";

export default function Edit({ attributes, setAttributes, isSelected }) {
  return (
    <div {...useBlockProps()}>
      <RichText tagName="span" className="ag-back-link" value={attributes.label} allowedFormats={[]} withoutInteractiveFormatting onChange={(label) => setAttributes({ label })} placeholder={__("Back", "afrigov-blocks")} />
      {isSelected && <LinkField label={__("Goes back to", "afrigov-blocks")} value={attributes.url} onChange={(url) => setAttributes({ url })} />}
      {!isSelected && !attributes.url && <NoLink hidden what={__("The back link", "afrigov-blocks")} />}
    </div>
  );
}
