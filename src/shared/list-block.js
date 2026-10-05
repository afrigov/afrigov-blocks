import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { AddButton } from "./add-button";

/**
 * A list block that holds one kind of child and nothing else, with an Add button under it.
 * Children can be moved and removed; nothing else can be put inside.
 */
export function ListEdit({ clientId, child, count = 3, tagName: Tag = "ul", className, addLabel, orientation, role, after = null }) {
  const blockProps = useBlockProps({ className: "afrigov-blocks-list" });
  const innerBlocksProps = useInnerBlocksProps(
    { className, ...(role ? { role } : {}) },
    {
      allowedBlocks: [child],
      template: Array.from({ length: count }, () => [child]),
      ...(orientation ? { orientation } : {}),
      renderAppender: false,
    },
  );
  return (
    <div {...blockProps}>
      <Tag {...innerBlocksProps} />
      <AddButton clientId={clientId} block={child} label={addLabel} />
      {after}
    </div>
  );
}
