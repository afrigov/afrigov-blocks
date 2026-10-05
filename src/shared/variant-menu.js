import { BlockControls } from "@wordpress/block-editor";
import { ToolbarDropdownMenu, ToolbarGroup } from "@wordpress/components";

/**
 * A variant choice in the toolbar above the block, where it is seen without opening the sidebar.
 * options: [{ value, label }]. The toolbar button shows the current choice.
 */
export function VariantMenu({ label, value, options, onChange, icon = "admin-appearance" }) {
  const current = options.find((o) => o.value === value);
  return (
    <BlockControls group="block">
      <ToolbarGroup>
        <ToolbarDropdownMenu
          icon={icon}
          text={`${label}: ${current ? current.label : ""}`}
          label={label}
          controls={options.map((o) => ({
            title: o.label,
            isActive: o.value === value,
            onClick: () => onChange(o.value),
          }))}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}
