import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps({ className: "ag-steps__item" });
  return (
    <li {...blockProps}>
      <RichText tagName={context["afrigov/stepHeading"] === 2 ? "h2" : "h3"} className="ag-steps__title" value={attributes.title} allowedFormats={[]} onChange={(title) => setAttributes({ title })} placeholder={__("What happens, such as: An inspector visits", "afrigov-blocks")} />
      <RichText tagName="p" value={attributes.text} allowedFormats={["core/bold", "core/link"]} onChange={(text) => setAttributes({ text })} placeholder={__("A sentence or two: when, and what the person does.", "afrigov-blocks")} />
    </li>
  );
}
