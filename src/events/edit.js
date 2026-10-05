import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { ListEdit } from "../shared/list-block";
import { HeadingLevel } from "../shared/heading-level";

export default function Edit({ attributes, setAttributes, clientId }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <HeadingLevel what={__("Event titles", "afrigov-blocks")} value={attributes.headingLevel} onChange={(headingLevel) => setAttributes({ headingLevel })} />
        </PanelBody>
      </InspectorControls>
      <ListEdit clientId={clientId} child="afrigov/event" className="ag-events" count={2} addLabel={__("Add event", "afrigov-blocks")} />
    </>
  );
}
