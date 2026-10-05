import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { LinkField, NoLink } from "../shared/link-field";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { title, text, buttonLabel, buttonUrl } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <div {...useBlockProps({ className: "ag-empty" })}>
      <RichText tagName="h2" className="ag-empty__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("What is missing, such as: No events are scheduled", "afrigov-blocks")} />
      <RichText tagName="p" value={text} allowedFormats={["core/link"]} onChange={set("text")} placeholder={__("Where to look instead.", "afrigov-blocks")} />
      <RichText tagName="span" className="ag-button ag-button--secondary afrigov-blocks-optional" value={buttonLabel} allowedFormats={[]} withoutInteractiveFormatting onChange={set("buttonLabel")} placeholder={__("A button (optional)", "afrigov-blocks")} />
      {isSelected && buttonLabel && <LinkField label={__("The button goes to", "afrigov-blocks")} value={buttonUrl} onChange={set("buttonUrl")} />}
      {!isSelected && buttonLabel && !buttonUrl && <NoLink hidden what={__("The button", "afrigov-blocks")} />}
    </div>
  );
}
