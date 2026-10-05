import { __ } from "@wordpress/i18n";
import { ListEdit } from "../shared/list-block";

export default function Edit({ clientId }) {
  return <ListEdit clientId={clientId} child="afrigov/download" className="ag-list" count={1} addLabel={__("Add document", "afrigov-blocks")} />;
}
