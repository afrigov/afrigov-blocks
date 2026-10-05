import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { LinkField } from "../shared/link-field";
import { MediaField } from "../shared/media-field";

const BLANK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23dfe6ec'/%3E%3C/svg%3E";

export default function Edit({ attributes, setAttributes, context, isSelected }) {
  const { name, role, url, photo } = attributes;
  const blockProps = useBlockProps({ className: "ag-person" });
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Portrait", "afrigov-blocks")}>
          <MediaField label={__("Portrait", "afrigov-blocks")} help={__("Square, at least 320 pixels. Leave it empty for a plain frame.", "afrigov-blocks")} image={photo} onChange={(value) => setAttributes({ photo: value })} />
        </PanelBody>
        <PanelBody title={__("Link", "afrigov-blocks")}>
          <LinkField label={__("The name links to (optional)", "afrigov-blocks")} value={url} onChange={(value) => setAttributes({ url: value })} />
        </PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        <img className="ag-person__photo" src={photo?.url || BLANK} alt="" width="320" height="320" />
        <div>
          <RichText tagName={context["afrigov/personHeading"] === 2 ? "h2" : "h3"} className="ag-person__name" value={name} allowedFormats={[]} onChange={(value) => setAttributes({ name: value })} placeholder={__("Name, such as: Dr Amina Bello", "afrigov-blocks")} />
          <RichText tagName="p" className="ag-person__role" value={role} allowedFormats={[]} onChange={(value) => setAttributes({ role: value })} placeholder={__("Role", "afrigov-blocks")} />
          {isSelected && <LinkField label={__("The name links to (optional)", "afrigov-blocks")} value={url} onChange={(value) => setAttributes({ url: value })} />}
        </div>
      </li>
    </>
  );
}
