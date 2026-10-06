import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { LinkField } from "../shared/link-field";
import { MediaField } from "../shared/media-field";
import { PictureSlot } from "../shared/picture-slot";

const BLANK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23dfe6ec'/%3E%3C/svg%3E";

/** The message is ordinary paragraphs, so it can be as long as it needs; nothing else goes in it. */
export default function Edit({ attributes, setAttributes, isSelected }) {
  const { title, name, role, photo, linkLabel, linkUrl } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const blockProps = useBlockProps({ className: "ag-statement" });
  const message = useInnerBlocksProps({}, { allowedBlocks: ["core/paragraph"], template: [["core/paragraph", { placeholder: __("The message, in the person's own words.", "afrigov-blocks") }]] });
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Portrait", "afrigov-blocks")}>
          <MediaField label={__("Portrait", "afrigov-blocks")} help={__("Square, at least 320 pixels.", "afrigov-blocks")} image={photo} onChange={set("photo")} />
        </PanelBody>
      </InspectorControls>
      <section {...blockProps}>
        <figure className="ag-figure ag-statement__media">
          <PictureSlot image={photo} isSelected={isSelected} onChange={set("photo")} label={__("Choose a portrait", "afrigov-blocks")} render={(img) => <img className="ag-figure__image" src={img.url} alt="" width="320" height="320" />} />
        </figure>
        <div className="ag-statement__body">
          <RichText tagName="h2" className="ag-statement__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Title, such as: A message from the Director General", "afrigov-blocks")} />
          <div {...message} />
          <p className="ag-statement__by">
            <RichText tagName="strong" value={name} allowedFormats={[]} onChange={set("name")} placeholder={__("Name", "afrigov-blocks")} />
            <RichText tagName="span" value={role} allowedFormats={[]} onChange={set("role")} placeholder={__("Role and organisation", "afrigov-blocks")} />
          </p>
          <RichText tagName="p" className="afrigov-blocks-optional" value={linkLabel} allowedFormats={[]} onChange={set("linkLabel")} placeholder={__("A link to the full message (optional)", "afrigov-blocks")} />
          {isSelected && linkLabel && <LinkField label={__("The link goes to", "afrigov-blocks")} value={linkUrl} onChange={set("linkUrl")} />}
        </div>
      </section>
    </>
  );
}
