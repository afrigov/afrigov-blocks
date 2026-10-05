import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import Edit from "./edit";

const variation = (name, title, isDefault = false) => ({
  name,
  title,
  attributes: { kind: name },
  isDefault,
  scope: ["inserter", "transform"],
  isActive: (block) => block.kind === name,
});

registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null,
  variations: [
    variation("info", __("Alert", "afrigov-blocks"), true),
    variation("success", __("Alert: success", "afrigov-blocks")),
    variation("warning", __("Alert: warning", "afrigov-blocks")),
    variation("error", __("Alert: problem", "afrigov-blocks")),
  ],
});
