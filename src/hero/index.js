import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Edit from "./edit";
import "./editor.css";

// Dynamic: nothing is saved but the fields; render.php builds the HTML.
registerBlockType(metadata.name, { edit: Edit, save: () => null });
