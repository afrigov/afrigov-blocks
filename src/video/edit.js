import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { MediaField } from "../shared/media-field";

const BLANK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23c7d6e3'/%3E%3C/svg%3E";

/** The poster and play button as on the page. The video itself loads only when someone presses play. */
export default function Edit({ attributes, setAttributes, isSelected }) {
  const { url, title, length, poster, caption } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const transcript = useInnerBlocksProps(
    { className: "ag-details__body" },
    { allowedBlocks: ["core/paragraph"], template: [["core/paragraph", { placeholder: __("The transcript: everything said in the video.", "afrigov-blocks") }]] },
  );
  const fields = (
    <>
      <TextControl label={__("YouTube or Vimeo address", "afrigov-blocks")} help={__("Copy it from the video's page.", "afrigov-blocks")} value={url} onChange={set("url")} __nextHasNoMarginBottom />
      <TextControl label={__("Length", "afrigov-blocks")} help={__("Such as: 2 min 30 s", "afrigov-blocks")} value={length} onChange={set("length")} __nextHasNoMarginBottom />
    </>
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Video", "afrigov-blocks")}>
          {fields}
          <MediaField label={__("Still from the video", "afrigov-blocks")} help={__("Shown until play is pressed. Under 40 KB.", "afrigov-blocks")} image={poster} onChange={set("poster")} />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        <figure className="ag-video">
          <span className="ag-video__poster">
            <img src={poster?.url || BLANK} alt="" />
            <span className="ag-video__play" aria-hidden="true" />
            <span className="ag-video__label">
              {__("Play video:", "afrigov-blocks")}{" "}
              <RichText tagName="span" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Title of the video", "afrigov-blocks")} />
              {length && <span className="ag-video__length">{length}</span>}
            </span>
          </span>
          <RichText tagName="figcaption" className="ag-video__caption afrigov-blocks-optional" value={caption} allowedFormats={[]} onChange={set("caption")} placeholder={__("A line under it (optional), such as the date and the languages of the captions", "afrigov-blocks")} />
        </figure>
        {isSelected && <div className="afrigov-blocks-fields">{fields}</div>}
        {!url && <p className="afrigov-blocks-warning">{__("No video address yet, so it will not show on the page.", "afrigov-blocks")}</p>}
        <div className="ag-details">
          <p className="ag-details__summary">{__("Read the transcript", "afrigov-blocks")}</p>
          <div {...transcript} />
        </div>
      </div>
    </>
  );
}
