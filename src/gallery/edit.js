import { __ } from "@wordpress/i18n";
import { InspectorControls, MediaUpload, MediaUploadCheck, RichText, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, ToggleControl } from "@wordpress/components";
import { VariantMenu } from "../shared/variant-menu";

const COLUMNS = { auto: "", 2: "ag-gallery--2", 4: "ag-gallery--4" };

/** Choose photos from the media library; write each caption under its photo. */
export default function Edit({ attributes, setAttributes }) {
  const { images, columns, linkFull } = attributes;
  const setCaption = (i, caption) => setAttributes({ images: images.map((img, j) => (j === i ? { ...img, caption } : img)) });
  const choose = (media) =>
    setAttributes({
      images: media.map((m) => ({ id: m.id, url: m.sizes?.medium_large?.url || m.sizes?.large?.url || m.url, caption: images.find((i) => i.id === m.id)?.caption ?? (m.caption || "") })),
    });
  const picker = (
    <MediaUploadCheck>
      <MediaUpload
        multiple
        gallery
        allowedTypes={["image"]}
        value={images.map((i) => i.id)}
        onSelect={choose}
        render={({ open }) => (
          <Button variant="secondary" icon="format-gallery" className="afrigov-blocks-add" onClick={open}>
            {images.length ? __("Add or change photos", "afrigov-blocks") : __("Choose photos", "afrigov-blocks")}
          </Button>
        )}
      />
    </MediaUploadCheck>
  );
  return (
    <>
      <VariantMenu
        label={__("Layout", "afrigov-blocks")}
        icon="grid-view"
        value={columns}
        options={[{ value: "auto", label: __("Three a row", "afrigov-blocks") }, { value: "2", label: __("Two, larger", "afrigov-blocks") }, { value: "4", label: __("Four, smaller", "afrigov-blocks") }]}
        onChange={(value) => setAttributes({ columns: value })}
      />
      <InspectorControls>
        <PanelBody title={__("Photos", "afrigov-blocks")}>
          <ToggleControl label={__("Each photo opens full size", "afrigov-blocks")} checked={linkFull} onChange={(value) => setAttributes({ linkFull: value })} />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        {images.length > 0 && (
          <ul className={["ag-gallery", COLUMNS[columns]].filter(Boolean).join(" ")}>
            {images.map((img, i) => (
              <li key={img.id}>
                <figure className="ag-figure ag-figure--3-2">
                  <img className="ag-figure__image" src={img.url} alt="" />
                  <RichText tagName="figcaption" className="ag-figure__caption" value={img.caption} allowedFormats={[]} onChange={(caption) => setCaption(i, caption)} placeholder={__("What is happening in this photo", "afrigov-blocks")} />
                </figure>
              </li>
            ))}
          </ul>
        )}
        {picker}
      </div>
    </>
  );
}
