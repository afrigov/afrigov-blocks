import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { ListEdit } from "../shared/list-block";

export default function Edit({ attributes, setAttributes, clientId }) {
  return (
    <>
    <InspectorControls>
      <PanelBody title={__("Heading", "afrigov-blocks")}>
        <TextControl
          label={__("Heading for screen readers (optional)", "afrigov-blocks")}
          help={__("Not shown on the page. Read out before the figures, such as: The ministry in numbers. Use it when there is no heading above.", "afrigov-blocks")}
          value={attributes.hiddenHeading}
          onChange={(hiddenHeading) => setAttributes({ hiddenHeading })}
          __nextHasNoMarginBottom
        />
      </PanelBody>
    </InspectorControls>
    <ListEdit
      clientId={clientId}
      child="afrigov/key-figure"
      tagName="dl"
      className="ag-stats"
      orientation="horizontal"
      addLabel={__("Add figure", "afrigov-blocks")}
      after={
        <RichText tagName="p" className="ag-caption afrigov-blocks-optional" value={attributes.asAt} allowedFormats={[]} onChange={(asAt) => setAttributes({ asAt })} placeholder={__("When the figures are from, such as: Figures as at 30 September 2026.", "afrigov-blocks")} />
      }
    />
    </>
  );
}
