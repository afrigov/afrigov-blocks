import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <div {...useBlockProps({ className: "ag-panel" })}>
      <RichText tagName="h2" className="ag-panel__title" value={attributes.title} allowedFormats={[]} onChange={set("title")} placeholder={__("What is done, such as: Application complete", "afrigov-blocks")} />
      <p className="ag-panel__body">
        <RichText tagName="span" value={attributes.body} allowedFormats={[]} onChange={set("body")} placeholder={__("Your reference number", "afrigov-blocks")} />{" "}
        <RichText tagName="span" className="ag-panel__ref afrigov-blocks-optional" value={attributes.reference} allowedFormats={[]} onChange={set("reference")} placeholder={__("REF-0000 (optional)", "afrigov-blocks")} />
      </p>
    </div>
  );
}
