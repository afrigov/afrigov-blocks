import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";
import { MediaField } from "../shared/media-field";

const EDGE = { accent: "ag-card--accent", flag: "ag-card--flag", tinted: "ag-card--tinted", plain: "ag-card--plain" };

/** One card, typed straight onto the page. Its link sits under the text while the card is selected. */
export default function Edit({ attributes, setAttributes, context, isSelected }) {
  const { title, text, url, image, imageKind, meta } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const horizontal = !!context["afrigov/cardHorizontal"];
  const blockProps = useBlockProps({ className: ["ag-card", EDGE[context["afrigov/cardEdge"]], horizontal && "ag-card--horizontal"].filter(Boolean).join(" ") });
  const level = context["afrigov/cardHeading"] === 2 ? "h2" : "h3";
  const link = <LinkField label={__("Card links to", "afrigov-blocks")} value={url} onChange={set("url")} />;
  const picture = image?.url ? (
    imageKind === "logo" ? (
      <div className="ag-card__logo"><img src={image.url} alt="" /></div>
    ) : (
      <div className="ag-card__image"><img src={image.url} alt="" /></div>
    )
  ) : null;
  const words = (
    <>
      <RichText tagName={level} className="ag-card__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Card title", "afrigov-blocks")} />
      <RichText tagName="p" className="ag-card__text" value={text} allowedFormats={["core/bold"]} onChange={set("text")} placeholder={__("One sentence about it.", "afrigov-blocks")} />
      {(meta || isSelected) && <RichText tagName="p" className="ag-card__meta afrigov-blocks-optional" value={meta} allowedFormats={[]} onChange={set("meta")} placeholder={__("A small line (optional), such as a date or a fee", "afrigov-blocks")} />}
      {isSelected && link}
      {!isSelected && title && !url && <NoLink what={__("This card", "afrigov-blocks")} />}
    </>
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Link", "afrigov-blocks")}>{link}</PanelBody>
        <PanelBody title={__("Picture", "afrigov-blocks")} initialOpen={!!image}>
          <SelectControl
            label={__("Kind", "afrigov-blocks")}
            value={imageKind}
            options={[
              { label: __("A photo across the top", "afrigov-blocks"), value: "photo" },
              { label: __("A logo or mark, fitted in a box", "afrigov-blocks"), value: "logo" },
            ]}
            onChange={set("imageKind")}
          />
          <MediaField label={__("Picture (optional)", "afrigov-blocks")} help={__("A photo under 40 KB, or a logo under 20 KB.", "afrigov-blocks")} image={image} onChange={set("image")} />
        </PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        {picture}
        {horizontal ? <div className="ag-card__body">{words}</div> : words}
      </li>
    </>
  );
}
