import { createBlock } from "@wordpress/blocks";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";

/** The Add button under a list block: adds one more of its only child, at the end. */
export function AddButton({ clientId, block, label }) {
  const count = useSelect((select) => select(blockEditorStore).getBlockCount(clientId), [clientId]);
  const { insertBlock } = useDispatch(blockEditorStore);
  return (
    <Button variant="secondary" icon="plus" className="afrigov-blocks-add" onClick={() => insertBlock(createBlock(block), count, clientId)}>
      {label}
    </Button>
  );
}
