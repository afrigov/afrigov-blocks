import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

/** Shown open in the editor, so the answer can be written; it opens and closes on the page. */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: "ag-accordion__item" });
  const body = useInnerBlocksProps(
    { className: "ag-accordion__body" },
    { allowedBlocks: ["core/paragraph", "core/list", "core/table"], template: [["core/paragraph", { placeholder: __("The answer.", "afrigov-blocks") }]] },
  );
  return (
    <div {...blockProps}>
      <RichText tagName="p" className="ag-accordion__summary" value={attributes.summary} allowedFormats={[]} onChange={(summary) => setAttributes({ summary })} placeholder={__("The question, such as: How long does it take?", "afrigov-blocks")} />
      <div {...body} />
    </div>
  );
}
