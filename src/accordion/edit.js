import { __ } from "@wordpress/i18n";
import { ListEdit } from "../shared/list-block";

export default function Edit({ clientId }) {
  return <ListEdit clientId={clientId} child="afrigov/accordion-item" tagName="div" className="ag-accordion" count={3} addLabel={__("Add section", "afrigov-blocks")} />;
}
