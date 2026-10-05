import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { ListEdit } from "../shared/list-block";
import { HeadingLevel } from "../shared/heading-level";
import { VariantMenu } from "../shared/variant-menu";

export const STYLES = [
  { value: "primary", label: __("Main colour edge", "afrigov-blocks") },
  { value: "accent", label: __("Accent colour", "afrigov-blocks") },
  { value: "flag", label: __("The flag's colours", "afrigov-blocks") },
  { value: "tinted", label: __("Tinted", "afrigov-blocks") },
  { value: "plain", label: __("Plain", "afrigov-blocks") },
];

export default function Edit({ attributes, setAttributes, clientId }) {
  return (
    <>
      <VariantMenu label={__("Style", "afrigov-blocks")} value={attributes.edge} options={STYLES} onChange={(edge) => setAttributes({ edge })} />
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <ToggleControl
            label={__("Picture beside the text", "afrigov-blocks")}
            help={__("For logos or small pictures: the picture on the left, the words beside it.", "afrigov-blocks")}
            checked={attributes.horizontal}
            onChange={(horizontal) => setAttributes({ horizontal })}
          />
          <HeadingLevel what={__("Card titles", "afrigov-blocks")} value={attributes.headingLevel} onChange={(headingLevel) => setAttributes({ headingLevel })} />
        </PanelBody>
      </InspectorControls>
      <ListEdit clientId={clientId} child="afrigov/service-card" className="ag-cards" role="list" orientation="horizontal" addLabel={__("Add card", "afrigov-blocks")} />
    </>
  );
}
