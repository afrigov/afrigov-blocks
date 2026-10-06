import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { MediaField } from "../shared/media-field";
import { VariantMenu } from "../shared/variant-menu";
import { PictureSlot } from "../shared/picture-slot";

const SHAPES = [
  { value: "", label: __("As it is", "afrigov-blocks") },
  { value: "16-9", label: __("Wide, 16 by 9", "afrigov-blocks") },
  { value: "3-2", label: __("Photo, 3 by 2", "afrigov-blocks") },
  { value: "4-3", label: __("4 by 3", "afrigov-blocks") },
  { value: "1-1", label: __("Square", "afrigov-blocks") },
];

export default function Edit({ attributes, setAttributes, isSelected }) {
  const { image, caption, ratio, narrow } = attributes;
  const blockProps = useBlockProps({ className: ["ag-figure", ratio && `ag-figure--${ratio}`].filter(Boolean).join(" "), style: narrow ? { maxWidth: "48rem" } : undefined });
  return (
    <>
      <VariantMenu label={__("Shape", "afrigov-blocks")} icon="image-crop" value={ratio} options={SHAPES} onChange={(value) => setAttributes({ ratio: value })} />
      <InspectorControls>
        <PanelBody title={__("Picture", "afrigov-blocks")}>
          <MediaField label={__("Picture", "afrigov-blocks")} help={__("Under 80 KB. Describe it in the media library if the caption does not say what it shows.", "afrigov-blocks")} image={image} onChange={(value) => setAttributes({ image: value })} />
          <ToggleControl label={__("The width of the text", "afrigov-blocks")} help={__("No wider than a column of text.", "afrigov-blocks")} checked={narrow} onChange={(value) => setAttributes({ narrow: value })} />
        </PanelBody>
      </InspectorControls>
      <figure {...blockProps}>
        <PictureSlot image={image} isSelected={isSelected} onChange={(value) => setAttributes({ image: value })} render={(img) => <img className="ag-figure__image" src={img.url} alt="" />} />
        <RichText tagName="figcaption" className="ag-figure__caption" value={caption} allowedFormats={[]} onChange={(value) => setAttributes({ caption: value })} placeholder={__("What it shows, and who took it.", "afrigov-blocks")} />
      </figure>
    </>
  );
}
