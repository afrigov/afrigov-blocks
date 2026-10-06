import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { MediaField } from "../shared/media-field";

const TYPES = ["application", "text"];

/** One document. Its type and size are read from the file when the page is shown. */
export default function Edit({ attributes, setAttributes, isSelected }) {
  const { file, label, note, url, fileType, fileSize } = attributes;
  const blockProps = useBlockProps({ className: "ag-list__item" });
  const picker = (
    <MediaField
      label={__("The file", "afrigov-blocks")}
      help={__("Upload it to the media library, or choose one there. PDF, Word, Excel and other documents.", "afrigov-blocks")}
      image={file}
      allowedTypes={TYPES}
      onChange={(value) => setAttributes({ file: value, label: label || value?.title || "" })}
    />
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("File", "afrigov-blocks")}>{picker}</PanelBody>
        <PanelBody title={__("Or a document kept elsewhere", "afrigov-blocks")} initialOpen={!file?.id && !!url}>
          <TextControl label={__("Its address", "afrigov-blocks")} value={url} onChange={(value) => setAttributes({ url: value })} __nextHasNoMarginBottom />
          <TextControl label={__("Type", "afrigov-blocks")} help={__("Such as: PDF, Word document", "afrigov-blocks")} value={fileType} onChange={(value) => setAttributes({ fileType: value })} __nextHasNoMarginBottom />
          <TextControl label={__("Size", "afrigov-blocks")} help={__("Such as: 2.4 MB", "afrigov-blocks")} value={fileSize} onChange={(value) => setAttributes({ fileSize: value })} __nextHasNoMarginBottom />
        </PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        <span className="ag-download ag-list__link">
          <RichText tagName="span" value={label} allowedFormats={[]} onChange={(value) => setAttributes({ label: value })} placeholder={__("Document name, such as: Annual report 2025", "afrigov-blocks")} />{" "}
          <span className="ag-download__meta">{file?.id ? __("(type and size added on the page)", "afrigov-blocks") : url ? `(${[fileType, fileSize].filter(Boolean).join(", ")})` : __("(no file yet)", "afrigov-blocks")}</span>
        </span>
        <RichText tagName="p" className="ag-list__text afrigov-blocks-optional" value={note} allowedFormats={[]} onChange={(value) => setAttributes({ note: value })} placeholder={__("A line about it (optional), such as the year", "afrigov-blocks")} />
        {isSelected && <div className="afrigov-blocks-fields">{picker}</div>}
      </li>
    </>
  );
}
