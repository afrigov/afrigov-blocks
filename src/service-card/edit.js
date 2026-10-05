import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";

const EDGE = { accent: "ag-card--accent", flag: "ag-card--flag" };

/** One card, typed straight onto the page. Its link sits under the text while the card is selected. */
export default function Edit({ attributes, setAttributes, context, isSelected }) {
  const { title, text, url } = attributes;
  const blockProps = useBlockProps({ className: ["ag-card", EDGE[context["afrigov/cardEdge"]]].filter(Boolean).join(" ") });
  const level = context["afrigov/cardHeading"] === 2 ? "h2" : "h3";
  const link = <LinkField label={__("Card links to", "afrigov-blocks")} value={url} onChange={(value) => setAttributes({ url: value })} />;
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Link", "afrigov-blocks")}>{link}</PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        <RichText tagName={level} className="ag-card__title" value={title} allowedFormats={[]} onChange={(value) => setAttributes({ title: value })} placeholder={__("Card title", "afrigov-blocks")} />
        <RichText tagName="p" className="ag-card__text" value={text} allowedFormats={["core/bold"]} onChange={(value) => setAttributes({ text: value })} placeholder={__("One sentence about it.", "afrigov-blocks")} />
        {isSelected && link}
        {!isSelected && title && !url && <NoLink what={__("This card", "afrigov-blocks")} />}
      </li>
    </>
  );
}
