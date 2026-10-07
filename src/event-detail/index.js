import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import metadata from "./block.json";
import Edit from "./edit";

// The rows are saved inside; render.php wraps them and adds the flyer.
registerBlockType(metadata.name, { edit: Edit, save: () => <InnerBlocks.Content /> });
