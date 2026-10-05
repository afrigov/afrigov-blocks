import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import metadata from "./block.json";
import Edit from "./edit";
import "./editor.css";

// The cards are saved as the list's children; render.php wraps them in the list.
registerBlockType(metadata.name, { edit: Edit, save: () => <InnerBlocks.Content /> });
