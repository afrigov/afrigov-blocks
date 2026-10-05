import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import ServerSideRender from "@wordpress/server-side-render";

/** The list is drawn by the server, exactly as the page will show it. */
export default function Edit({ attributes, setAttributes }) {
  const categories = useSelect((select) => select(coreStore).getEntityRecords("taxonomy", "category", { per_page: 100 }) || [], []);
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Which posts", "afrigov-blocks")}>
          <RangeControl label={__("How many", "afrigov-blocks")} min={1} max={10} value={attributes.count} onChange={(count) => setAttributes({ count })} />
          <SelectControl
            label={__("From", "afrigov-blocks")}
            value={String(attributes.category)}
            options={[{ label: __("All posts", "afrigov-blocks"), value: "0" }, ...categories.map((c) => ({ label: c.name, value: String(c.id) }))]}
            onChange={(category) => setAttributes({ category: Number(category) })}
          />
          <ToggleControl label={__("Show a line from each post", "afrigov-blocks")} checked={attributes.excerpts} onChange={(excerpts) => setAttributes({ excerpts })} />
          <TextControl label={__("Link to all news", "afrigov-blocks")} help={__("Leave empty for no link.", "afrigov-blocks")} value={attributes.allLabel} onChange={(allLabel) => setAttributes({ allLabel })} __nextHasNoMarginBottom />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        <ServerSideRender block="afrigov/news" attributes={attributes} />
      </div>
    </>
  );
}
