import { __ } from "@wordpress/i18n";
import { ListEdit } from "../shared/list-block";

export default function Edit({ clientId }) {
  return <ListEdit clientId={clientId} child="afrigov/summary-row" tagName="dl" className="ag-summary" count={3} addLabel={__("Add row", "afrigov-blocks")} />;
}
