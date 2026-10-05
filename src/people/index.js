import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import metadata from "./block.json";
import Edit from "./edit";

// The children are saved inside the list; render.php wraps them.
registerBlockType(metadata.name, { edit: Edit, save: () => <InnerBlocks.Content /> });
