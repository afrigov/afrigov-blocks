import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { AddButton } from "../shared/add-button";
import { MediaField } from "../shared/media-field";
import { PictureSlot } from "../shared/picture-slot";

export const DEFAULT_CAPTION = __("Open the flyer full size. Everything on it is written on this page.", "afrigov-blocks");

export default function Edit({ clientId, attributes, setAttributes, isSelected }) {
  const { flyer, caption } = attributes;

  // On an event, the flyer is its featured image, labelled Flyer beside the editor: one place
  // for it, whether it is chosen there or here. Elsewhere the block keeps its own picture.
  const { isEvent, featured } = useSelect((select) => {
    const editor = select("core/editor");
    if (!editor || editor.getCurrentPostType() !== "afrigov_event") return { isEvent: false, featured: null };
    const id = editor.getEditedPostAttribute("featured_media");
    const media = id ? select(coreStore).getMedia(id) : null;
    return { isEvent: true, featured: media ? { id: media.id, url: media.media_details?.sizes?.medium_large?.source_url || media.source_url, alt: media.alt_text || "" } : null };
  }, []);
  const { editPost } = useDispatch("core/editor") || {};
  const shown = flyer?.url ? flyer : featured;
  const setFlyer = (value) => {
    if (isEvent && editPost) {
      editPost({ featured_media: value?.id || 0 });
      if (flyer) setAttributes({ flyer: undefined });
    } else {
      setAttributes({ flyer: value });
    }
  };

  const blockProps = useBlockProps({ className: "ag-event-detail" });
  const rowsProps = useInnerBlocksProps(
    { className: "ag-summary" },
    {
      allowedBlocks: ["afrigov/summary-row"],
      template: [
        ["afrigov/summary-row", { key: __("When", "afrigov-blocks") }],
        ["afrigov/summary-row", { key: __("Where", "afrigov-blocks") }],
      ],
      renderAppender: false,
    },
  );

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Flyer", "afrigov-blocks")}>
          <MediaField
            label={__("Flyer", "afrigov-blocks")}
            help={__("Write everything on the flyer in the rows as well, and give it a short description in the media library, such as: Flyer for the summit.", "afrigov-blocks")}
            image={shown}
            onChange={setFlyer}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div>
          <dl {...rowsProps} />
          <AddButton clientId={clientId} block="afrigov/summary-row" label={__("Add row", "afrigov-blocks")} />
        </div>
        <figure className="ag-flyer">
          <PictureSlot
            image={shown}
            isSelected={isSelected}
            label={__("Choose a flyer (optional)", "afrigov-blocks")}
            onChange={setFlyer}
            render={(img) => <img src={img.url} alt="" />}
          />
          {shown?.url && (
            <RichText tagName="figcaption" className="ag-flyer__caption" value={caption} allowedFormats={[]} onChange={(value) => setAttributes({ caption: value })} placeholder={DEFAULT_CAPTION} />
          )}
        </figure>
      </div>
    </>
  );
}
