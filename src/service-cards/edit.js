import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { ListEdit } from "../shared/list-block";
import { HeadingLevel } from "../shared/heading-level";

export default function Edit({ attributes, setAttributes, clientId }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <SelectControl
            label={__("Edge along the top of each card", "afrigov-blocks")}
            value={attributes.edge}
            options={[
              { label: __("Main colour", "afrigov-blocks"), value: "primary" },
              { label: __("Accent colour", "afrigov-blocks"), value: "accent" },
              { label: __("The flag's colours", "afrigov-blocks"), value: "flag" },
            ]}
            onChange={(edge) => setAttributes({ edge })}
          />
          <HeadingLevel what={__("Card titles", "afrigov-blocks")} value={attributes.headingLevel} onChange={(headingLevel) => setAttributes({ headingLevel })} />
        </PanelBody>
      </InspectorControls>
      <ListEdit clientId={clientId} child="afrigov/service-card" className="ag-cards" role="list" orientation="horizontal" addLabel={__("Add card", "afrigov-blocks")} />
    </>
  );
}
