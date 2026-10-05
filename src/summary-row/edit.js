import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  return (
    <div {...useBlockProps({ className: "ag-summary__row" })}>
      <RichText tagName="dt" className="ag-summary__key" value={attributes.key} allowedFormats={[]} onChange={(key) => setAttributes({ key })} placeholder={__("Name, such as: Opening hours", "afrigov-blocks")} />
      <RichText tagName="dd" className="ag-summary__value" value={attributes.value} allowedFormats={["core/bold", "core/link"]} onChange={(value) => setAttributes({ value })} placeholder={__("Value, such as: Monday to Friday, 8am to 5pm", "afrigov-blocks")} />
    </div>
  );
}
