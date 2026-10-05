import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { LinkField, NoLink } from "../shared/link-field";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** One event. The date block is drawn from the date chosen in the sidebar. */
export default function Edit({ attributes, setAttributes, context, isSelected }) {
  const { title, url, date, time, tbc, meta, text } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const [y, m, d] = (date || "").split("-").map(Number);
  const hasDate = !tbc && y && m && d;
  const today = new Date().toISOString().slice(0, 10);
  const past = hasDate && date < today;
  const blockProps = useBlockProps({ className: ["ag-event", past && "ag-event--past"].filter(Boolean).join(" ") });
  const when = (
    <>
      <ToggleControl label={__("Date to be confirmed", "afrigov-blocks")} checked={tbc} onChange={set("tbc")} />
      {!tbc && <TextControl type="date" label={__("Date", "afrigov-blocks")} value={date} onChange={set("date")} __nextHasNoMarginBottom />}
      {!tbc && <TextControl type="time" label={__("Start time (optional)", "afrigov-blocks")} value={time} onChange={set("time")} __nextHasNoMarginBottom />}
    </>
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("When", "afrigov-blocks")}>{when}</PanelBody>
        <PanelBody title={__("Link", "afrigov-blocks")}>
          <LinkField label={__("The event's page", "afrigov-blocks")} value={url} onChange={set("url")} />
        </PanelBody>
      </InspectorControls>
      <li {...blockProps}>
        {hasDate ? (
          <span className="ag-event__date">
            <span className="ag-event__day">{d}</span>
            <span className="ag-event__month">{MONTHS[m - 1]}</span>
          </span>
        ) : (
          <span className="ag-event__date ag-event__date--tbc">TBC</span>
        )}
        <div className="ag-event__body">
          <RichText tagName={context["afrigov/eventHeading"] === 2 ? "h2" : "h3"} className="ag-event__title" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("Event title", "afrigov-blocks")} />
          <RichText tagName="p" className="ag-event__meta" value={meta} allowedFormats={[]} onChange={set("meta")} placeholder={__("When and where, such as: 10am to 1pm, Kumasi City Hall", "afrigov-blocks")} />
          <RichText tagName="p" className="ag-event__text afrigov-blocks-optional" value={text} allowedFormats={["core/bold"]} onChange={set("text")} placeholder={__("A sentence about it (optional)", "afrigov-blocks")} />
          {isSelected && (
            <div className="afrigov-blocks-fields">
              {when}
              <LinkField label={__("The event's page", "afrigov-blocks")} value={url} onChange={set("url")} />
            </div>
          )}
          {!isSelected && title && !url && <NoLink what={__("This event", "afrigov-blocks")} />}
        </div>
      </li>
    </>
  );
}
