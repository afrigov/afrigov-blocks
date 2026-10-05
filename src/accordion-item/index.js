import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import metadata from "./block.json";
import Edit from "./edit";

// The blocks inside are saved; render.php wraps them.
registerBlockType(metadata.name, { edit: Edit, save: () => <InnerBlocks.Content /> });
