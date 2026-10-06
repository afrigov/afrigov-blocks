import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Edit({ attributes, setAttributes }) {
  const { title, lead, date, time, tbc } = attributes;
  const set = (key) => (value) => setAttributes({ [key]: value });
  const [y, m, d] = (date || "").split("-").map(Number);
  const has = !tbc && y && m && d;
  const past = has && date < new Date().toISOString().slice(0, 10);
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("When", "afrigov-blocks")}>
          <ToggleControl label={__("Date to be confirmed", "afrigov-blocks")} checked={tbc} onChange={set("tbc")} />
          {!tbc && <TextControl type="date" label={__("Date", "afrigov-blocks")} value={date} onChange={set("date")} __nextHasNoMarginBottom />}
          {!tbc && <TextControl type="time" label={__("Start time (optional)", "afrigov-blocks")} value={time} onChange={set("time")} __nextHasNoMarginBottom />}
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps({ className: "ag-event" })}>
        {has ? (
          <span className="ag-event__date ag-event__date--lg"><span className="ag-event__day">{d}</span><span className="ag-event__month">{MONTHS[m - 1]}</span></span>
        ) : (
          <span className="ag-event__date ag-event__date--tbc ag-event__date--lg">TBC</span>
        )}
        <div className="ag-event__body">
          <p className="ag-caption">{past ? __("Event, past", "afrigov-blocks") : __("Event, upcoming", "afrigov-blocks")}</p>
          <RichText tagName="h1" className="ag-heading-xl" value={title} allowedFormats={[]} onChange={set("title")} placeholder={__("The event's name", "afrigov-blocks")} />
          <RichText tagName="p" className="ag-lead" value={lead} allowedFormats={[]} onChange={set("lead")} placeholder={__("What it is, in a sentence.", "afrigov-blocks")} />
        </div>
      </div>
    </>
  );
}
