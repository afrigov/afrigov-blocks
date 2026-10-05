import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

/** A band holds headings, text and other blocks. */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: `ag-band ag-band--${attributes.colour}` });
  const inner = useInnerBlocksProps(
    { className: "ag-container" },
    { template: [["core/heading", { level: 2, placeholder: __("Section heading", "afrigov-blocks") }], ["core/paragraph"]], prioritizedInserterBlocks: ["afrigov/service-cards", "afrigov/key-figures", "afrigov/steps"] },
  );
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <SelectControl
            label={__("Colour", "afrigov-blocks")}
            value={attributes.colour}
            options={[
              { label: __("Pale tint", "afrigov-blocks"), value: "tint" },
              { label: __("Main colour", "afrigov-blocks"), value: "primary" },
              { label: __("Dark", "afrigov-blocks"), value: "dark" },
              { label: __("Accent colour", "afrigov-blocks"), value: "accent" },
            ]}
            onChange={(colour) => setAttributes({ colour })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div {...inner} />
      </div>
    </>
  );
}
