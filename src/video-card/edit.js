import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";
import { MediaField } from "../shared/media-field";

const BLANK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23c7d6e3'/%3E%3C/svg%3E";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { title, url, duration, meta, poster } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const link = <LinkField label={__("The video's page", "afrigov-blocks")} value={url} onChange={set("url")} />;
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Video", "afrigov-blocks")}>
          {link}
          <TextControl label={__("Length", "afrigov-blocks")} help={__("Such as: 2:30", "afrigov-blocks")} value={duration} onChange={set("duration")} __nextHasNoMarginBottom />
          <MediaField label={__("Still", "afrigov-blocks")} help={__("Under 40 KB.", "afrigov-blocks")} image={poster} onChange={set("poster")} />
        </PanelBody>
      </InspectorControls>
      <li {...useBlockProps({ className: "ag-card ag-card--video" })}>
        <div className="ag-card__image">
          <img src={poster?.url || BLANK} alt="" />
          {duration && <span className="ag-card__duration">{duration}</span>}
        </div>
        <RichText tagName="h3" className="ag-card__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Video title", "afrigov-blocks")} />
        <RichText tagName="p" className="ag-card__text" value={meta} allowedFormats={[]} onChange={set("meta")} placeholder={__("Kind and date, such as: Explainer · 2 October 2026", "afrigov-blocks")} />
        {isSelected && link}
        {!isSelected && title && !url && <NoLink what={__("This video", "afrigov-blocks")} />}
      </li>
    </>
  );
}
