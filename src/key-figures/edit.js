import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
import { ListEdit } from "../shared/list-block";

export default function Edit({ attributes, setAttributes, clientId }) {
  return (
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
  );
}
