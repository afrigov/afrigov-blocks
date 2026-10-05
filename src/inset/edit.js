import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  return (
    <div {...useBlockProps({ className: "ag-inset" })}>
      <RichText tagName="p" value={attributes.text} allowedFormats={["core/bold", "core/link"]} onChange={(text) => setAttributes({ text })} placeholder={__("Something to set apart, such as: You can apply for someone else with their written consent.", "afrigov-blocks")} />
    </div>
  );
}
