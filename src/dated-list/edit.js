import { __ } from "@wordpress/i18n";
import { ListEdit } from "../shared/list-block";

export default function Edit({ clientId }) {
  return <ListEdit clientId={clientId} child="afrigov/dated-item" className="ag-list" addLabel={__("Add item", "afrigov-blocks")} />;
}
