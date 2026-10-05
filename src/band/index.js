import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";
import metadata from "./block.json";
import Edit from "./edit";

const variation = (name, title, isDefault = false) => ({
  name,
  title,
  attributes: { colour: name },
  isDefault,
  scope: ["inserter", "transform"],
  isActive: (block) => block.colour === name,
});

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => <InnerBlocks.Content />,
  variations: [
    variation("tint", __("Band", "afrigov-blocks"), true),
    variation("primary", __("Band: main colour", "afrigov-blocks")),
    variation("dark", __("Band: dark", "afrigov-blocks")),
    variation("accent", __("Band: accent colour", "afrigov-blocks")),
  ],
});
