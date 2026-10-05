import { __ } from "@wordpress/i18n";
import { ListEdit } from "../shared/list-block";

export default function Edit({ clientId }) {
  return <ListEdit clientId={clientId} child="afrigov/video-card" className="ag-cards" role="list" orientation="horizontal" addLabel={__("Add video", "afrigov-blocks")} />;
}
