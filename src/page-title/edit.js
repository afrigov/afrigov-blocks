import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <div {...useBlockProps({ className: "ag-prose" })}>
      <RichText tagName="p" className="ag-caption afrigov-blocks-optional" value={attributes.caption} allowedFormats={[]} onChange={set("caption")} placeholder={__("A small line above (optional), such as: Press release · 9 June 2026", "afrigov-blocks")} />
      <RichText tagName="h1" className="ag-heading-xl" value={attributes.title} allowedFormats={[]} onChange={set("title")} placeholder={__("The page's title", "afrigov-blocks")} />
      <RichText tagName="p" className="ag-lead afrigov-blocks-optional" value={attributes.lead} allowedFormats={["core/link"]} onChange={set("lead")} placeholder={__("A sentence under it (optional)", "afrigov-blocks")} />
    </div>
  );
}
