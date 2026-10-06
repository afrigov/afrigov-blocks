import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <>
    <InspectorControls>
      <PanelBody title={__("Look", "afrigov-blocks")}>
        <ToggleControl label={__("The title is the page's main heading", "afrigov-blocks")} help={__("On when the panel is the top of the page, such as a done page.", "afrigov-blocks")} checked={attributes.isPageTitle} onChange={set("isPageTitle")} />
        <ToggleControl label={__("Neutral", "afrigov-blocks")} help={__("Grey, for a message that is not a success, such as: nothing was sent.", "afrigov-blocks")} checked={attributes.neutral} onChange={set("neutral")} />
      </PanelBody>
    </InspectorControls>
    <div {...useBlockProps({ className: ["ag-panel", attributes.neutral && "ag-panel--neutral"].filter(Boolean).join(" ") })}>
      <RichText tagName={attributes.isPageTitle ? "h1" : "h2"} className="ag-panel__title" value={attributes.title} allowedFormats={[]} onChange={set("title")} placeholder={__("What is done, such as: Application complete", "afrigov-blocks")} />
      <p className="ag-panel__body">
        <RichText tagName="span" value={attributes.body} allowedFormats={[]} onChange={set("body")} placeholder={__("Your reference number", "afrigov-blocks")} />{" "}
        <RichText tagName="span" className="ag-panel__ref afrigov-blocks-optional" value={attributes.reference} allowedFormats={[]} onChange={set("reference")} placeholder={__("REF-0000 (optional)", "afrigov-blocks")} />
      </p>
    </div>
    </>
  );
}
