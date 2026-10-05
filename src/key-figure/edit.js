import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: "ag-stats__item" });
  return (
    <div {...blockProps}>
      <RichText tagName="dt" className="ag-stats__label" value={attributes.label} allowedFormats={[]} onChange={(label) => setAttributes({ label })} placeholder={__("What it counts", "afrigov-blocks")} />
      <RichText tagName="dd" className="ag-stats__value" value={attributes.value} allowedFormats={[]} onChange={(value) => setAttributes({ value })} placeholder={__("2,418,000", "afrigov-blocks")} />
    </div>
  );
}
