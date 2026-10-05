import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { title, url, date, tag, text } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const fields = (
    <>
      <LinkField label={__("Links to", "afrigov-blocks")} value={url} onChange={set("url")} />
      <TextControl type="date" label={__("Date", "afrigov-blocks")} value={date} onChange={set("date")} __nextHasNoMarginBottom />
    </>
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Link and date", "afrigov-blocks")}>{fields}</PanelBody>
      </InspectorControls>
      <li {...useBlockProps({ className: "ag-list__item" })}>
        <RichText tagName="span" className="ag-list__link" value={title} allowedFormats={[]} withoutInteractiveFormatting onChange={set("title")} placeholder={__("Title, such as: Notice of public hearing", "afrigov-blocks")} />
        <span className="ag-list__meta">
          {date || __("No date", "afrigov-blocks")}
          {" · "}
          <RichText tagName="span" className="afrigov-blocks-optional" value={tag} allowedFormats={[]} onChange={set("tag")} placeholder={__("Kind (optional), such as: Press release", "afrigov-blocks")} />
        </span>
        <RichText tagName="p" className="ag-list__text afrigov-blocks-optional" value={text} allowedFormats={[]} onChange={set("text")} placeholder={__("A line about it (optional)", "afrigov-blocks")} />
        {isSelected && <div className="afrigov-blocks-fields">{fields}</div>}
        {!isSelected && title && !url && <NoLink what={__("This item", "afrigov-blocks")} />}
      </li>
    </>
  );
}
