import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Edit from "./edit";

// Each layout is also its own item in the + menu, so people find it without opening the sidebar.
const variation = (name, title, description, attributes, isDefault = false) => ({
  name,
  title,
  description,
  attributes,
  isDefault,
  scope: ["inserter", "transform"],
  isActive: (block, v) => block.layout === v.layout,
});

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
  variations: [
    variation("text", __("Hero", "afrigov-blocks"), __("A title, a sentence and buttons, on the main colour.", "afrigov-blocks"), { layout: "text" }, true),
    variation("image", __("Hero with a picture", "afrigov-blocks"), __("The text with a picture beside it.", "afrigov-blocks"), { layout: "image" }),
    variation("image-first", __("Hero, picture first", "afrigov-blocks"), __("The picture on the reading side, the text after it.", "afrigov-blocks"), { layout: "image-first" }),
    variation("centred", __("Hero, centred", "afrigov-blocks"), __("For a campaign: title, sentence and one button, centred.", "afrigov-blocks"), { layout: "centred" }),
    variation("cover", __("Hero over a photo", "afrigov-blocks"), __("A photo across the page with the text in a panel over it.", "afrigov-blocks"), { layout: "cover" }),
  ],
});
