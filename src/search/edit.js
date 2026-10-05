import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <ToggleControl label={__("Large", "afrigov-blocks")} help={__("For a page where the search is the point, such as a list of publications.", "afrigov-blocks")} checked={attributes.large} onChange={(large) => setAttributes({ large })} />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps({ className: ["ag-search", attributes.large && "ag-search--lg"].filter(Boolean).join(" ") })}>
        <RichText tagName="p" className="ag-search__label" value={attributes.label} allowedFormats={[]} onChange={(label) => setAttributes({ label })} placeholder={__("Search this site", "afrigov-blocks")} />
        <div className="ag-search__row">
          <span className="ag-search__input" aria-hidden="true" />
          <span className="ag-search__button">
            <span className="ag-search__icon" aria-hidden="true" />
            {__("Search", "afrigov-blocks")}
          </span>
        </div>
      </div>
    </>
  );
}
