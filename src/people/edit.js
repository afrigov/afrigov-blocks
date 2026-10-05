import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { ListEdit } from "../shared/list-block";
import { HeadingLevel } from "../shared/heading-level";
import { VariantMenu } from "../shared/variant-menu";

export const COLUMNS = { auto: "", 2: "ag-people--2", 3: "ag-people--3", 4: "ag-people--4", 6: "ag-people--6", rows: "ag-people--rows" };

export default function Edit({ attributes, setAttributes, clientId }) {
  const layouts = [
    { value: "auto", label: __("As many as fit", "afrigov-blocks") },
    { value: "2", label: __("2, centred", "afrigov-blocks") },
    { value: "3", label: __("3, centred", "afrigov-blocks") },
    { value: "4", label: __("4 a row", "afrigov-blocks") },
    { value: "6", label: __("6 a row", "afrigov-blocks") },
    { value: "rows", label: __("Rows", "afrigov-blocks") },
  ];
  return (
    <>
      <VariantMenu label={__("Layout", "afrigov-blocks")} icon="grid-view" value={attributes.columns} options={layouts} onChange={(columns) => setAttributes({ columns })} />
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <SelectControl
            label={__("Layout", "afrigov-blocks")}
            help={__("Two or three for leaders, four for a board, rows for a long list with small portraits.", "afrigov-blocks")}
            value={attributes.columns}
            options={[
              { label: __("As many as fit", "afrigov-blocks"), value: "auto" },
              { label: __("2, centred", "afrigov-blocks"), value: "2" },
              { label: __("3, centred", "afrigov-blocks"), value: "3" },
              { label: __("4 a row", "afrigov-blocks"), value: "4" },
              { label: __("6 a row on wide screens", "afrigov-blocks"), value: "6" },
              { label: __("Rows, with small portraits", "afrigov-blocks"), value: "rows" },
            ]}
            onChange={(columns) => setAttributes({ columns })}
          />
          <HeadingLevel what={__("Names", "afrigov-blocks")} value={attributes.headingLevel} onChange={(headingLevel) => setAttributes({ headingLevel })} />
        </PanelBody>
      </InspectorControls>
      <ListEdit clientId={clientId} child="afrigov/person" className={["ag-people", COLUMNS[attributes.columns]].filter(Boolean).join(" ")} role="list" orientation="horizontal" count={2} addLabel={__("Add person", "afrigov-blocks")} />
    </>
  );
}
