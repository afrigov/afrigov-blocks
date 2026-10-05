import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { HeadingLevel } from "../shared/heading-level";

export default function Edit({ attributes, setAttributes }) {
  const { kind, title, text, headingLevel } = attributes;
  const blockProps = useBlockProps({ className: ["ag-alert", kind !== "info" && `ag-alert--${kind}`].filter(Boolean).join(" ") });
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <SelectControl
            label={__("Kind", "afrigov-blocks")}
            value={kind}
            options={[
              { label: __("Information", "afrigov-blocks"), value: "info" },
              { label: __("Success", "afrigov-blocks"), value: "success" },
              { label: __("Warning", "afrigov-blocks"), value: "warning" },
              { label: __("Problem", "afrigov-blocks"), value: "error" },
            ]}
            onChange={(value) => setAttributes({ kind: value })}
          />
          <HeadingLevel what={__("The title", "afrigov-blocks")} value={headingLevel} onChange={(value) => setAttributes({ headingLevel: value })} />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <RichText tagName={headingLevel === 3 ? "h3" : "h2"} className="ag-alert__title" value={title} allowedFormats={[]} onChange={(value) => setAttributes({ title: value })} placeholder={__("What people need to know, such as: Applications close on 31 October", "afrigov-blocks")} />
        <RichText tagName="p" value={text} allowedFormats={["core/bold", "core/link"]} onChange={(value) => setAttributes({ text: value })} placeholder={__("What to do about it.", "afrigov-blocks")} />
      </div>
    </>
  );
}
