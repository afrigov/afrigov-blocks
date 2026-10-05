import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, URLInput, useBlockProps } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

const EDGE = { accent: "ag-card--accent", flag: "ag-card--flag" };

/**
 * One card, typed straight onto the page. Where it links is just under the text, so it is
 * never forgotten, and in the sidebar too.
 */
export default function Edit({ attributes, setAttributes, context, isSelected }) {
  const { title, text, url } = attributes;
  const edge = EDGE[context["afrigov/cardEdge"]] || "";
  const level = context["afrigov/cardHeading"] === 2 ? "h2" : "h3";
  const blockProps = useBlockProps({ className: ["ag-card", edge].filter(Boolean).join(" ") });

  const linkField = (
    <URLInput
      label={__("Card links to", "afrigov-blocks")}
      value={url}
      onChange={(value) => setAttributes({ url: value })}
      placeholder={__("Search pages, or paste an address", "afrigov-blocks")}
    />
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Link", "afrigov-blocks")}>{linkField}</PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        <RichText
          tagName={level}
          className="ag-card__title"
          value={title}
          allowedFormats={[]}
          onChange={(value) => setAttributes({ title: value })}
          placeholder={__("Card title", "afrigov-blocks")}
        />
        <RichText
          tagName="p"
          className="ag-card__text"
          value={text}
          allowedFormats={["core/bold"]}
          onChange={(value) => setAttributes({ text: value })}
          placeholder={__("One sentence about it.", "afrigov-blocks")}
        />
        {isSelected && <div className="afrigov-blocks-link">{linkField}</div>}
        {!isSelected && !url && title && (
          <p className="afrigov-blocks-warning">{__("No link yet. Select the card to add one.", "afrigov-blocks")}</p>
        )}
      </li>
    </>
  );
}
