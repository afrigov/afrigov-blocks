import { __ } from "@wordpress/i18n";
import { createBlock } from "@wordpress/blocks";
import { InspectorControls, store as blockEditorStore, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { Button, PanelBody, SelectControl } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";

const CARD = "afrigov/service-card";
const TEMPLATE = [[CARD], [CARD], [CARD]];

/**
 * A list that holds service cards and nothing else, with an Add card button under it.
 * Cards can be moved and removed; nothing else can be put inside.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
  const { edge, headingLevel } = attributes;
  const count = useSelect((select) => select(blockEditorStore).getBlockCount(clientId), [clientId]);
  const { insertBlock } = useDispatch(blockEditorStore);

  const blockProps = useBlockProps({ className: "afrigov-blocks-cards" });
  const innerBlocksProps = useInnerBlocksProps(
    { className: "ag-cards", role: "list" },
    {
      allowedBlocks: [CARD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: false,
    },
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <SelectControl
            label={__("Edge along the top of each card", "afrigov-blocks")}
            value={edge}
            options={[
              { label: __("Main colour", "afrigov-blocks"), value: "primary" },
              { label: __("Accent colour", "afrigov-blocks"), value: "accent" },
              { label: __("The flag's colours", "afrigov-blocks"), value: "flag" },
            ]}
            onChange={(value) => setAttributes({ edge: value })}
          />
          <SelectControl
            label={__("Card titles are", "afrigov-blocks")}
            help={__("Level 3 under a section heading, level 2 when the cards are the page's main list.", "afrigov-blocks")}
            value={String(headingLevel)}
            options={[
              { label: __("Heading level 3", "afrigov-blocks"), value: "3" },
              { label: __("Heading level 2", "afrigov-blocks"), value: "2" },
            ]}
            onChange={(value) => setAttributes({ headingLevel: Number(value) })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div {...innerBlocksProps} />
        <Button
          variant="secondary"
          icon="plus"
          className="afrigov-blocks-add"
          onClick={() => insertBlock(createBlock(CARD), count, clientId)}
        >
          {__("Add card", "afrigov-blocks")}
        </Button>
      </div>
    </>
  );
}
