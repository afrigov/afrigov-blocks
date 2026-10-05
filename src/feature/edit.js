import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, ToggleControl } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";
import { MediaField } from "../shared/media-field";
import { VariantMenu } from "../shared/variant-menu";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { image, title, text, points, linkLabel, linkUrl, reverse } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const setPoint = (i, value) => setAttributes({ points: points.map((p, j) => (j === i ? value : p)) });
  const blockProps = useBlockProps({ className: ["ag-feature", reverse && "ag-feature--reverse"].filter(Boolean).join(" ") });
  return (
    <>
      <VariantMenu
        label={__("Picture", "afrigov-blocks")}
        icon="align-pull-left"
        value={reverse ? "after" : "before"}
        options={[{ value: "before", label: __("First", "afrigov-blocks") }, { value: "after", label: __("After the text", "afrigov-blocks") }]}
        onChange={(v) => setAttributes({ reverse: v === "after" })}
      />
      <InspectorControls>
        <PanelBody title={__("Picture", "afrigov-blocks")}>
          <MediaField label={__("Picture", "afrigov-blocks")} help={__("Under 80 KB. Describe it in the media library if it shows something the text does not say.", "afrigov-blocks")} image={image} onChange={set("image")} />
          <ToggleControl label={__("Picture after the text", "afrigov-blocks")} checked={reverse} onChange={set("reverse")} />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <figure className="ag-figure ag-feature__media">
          {image?.url ? <img className="ag-figure__image" src={image.url} alt="" /> : <div className="afrigov-blocks-empty-picture">{__("Choose a picture in the sidebar", "afrigov-blocks")}</div>}
        </figure>
        <div className="ag-feature__body">
          <RichText tagName="h2" className="ag-feature__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Title", "afrigov-blocks")} />
          <RichText tagName="p" value={text} allowedFormats={["core/bold", "core/link"]} onChange={set("text")} placeholder={__("A sentence or two about it.", "afrigov-blocks")} />
          {(points.length > 0 || isSelected) && (
            <ul className="ag-feature__list">
              {points.map((point, i) => (
                <RichText key={i} tagName="li" value={point} allowedFormats={[]} onChange={(value) => setPoint(i, value)} placeholder={__("A point. Leave it empty to remove it.", "afrigov-blocks")} />
              ))}
            </ul>
          )}
          {isSelected && (
            <Button variant="secondary" icon="plus" className="afrigov-blocks-add" onClick={() => setAttributes({ points: [...points, ""] })}>
              {__("Add point", "afrigov-blocks")}
            </Button>
          )}
          <RichText tagName="p" className="afrigov-blocks-optional" value={linkLabel} allowedFormats={[]} onChange={set("linkLabel")} placeholder={__("A link (optional), such as: Check a certificate", "afrigov-blocks")} />
          {isSelected && linkLabel && <LinkField label={__("The link goes to", "afrigov-blocks")} value={linkUrl} onChange={set("linkUrl")} />}
          {!isSelected && linkLabel && !linkUrl && <NoLink hidden what={__("The link", "afrigov-blocks")} />}
        </div>
      </div>
    </>
  );
}
