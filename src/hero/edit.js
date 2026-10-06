import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { LayoutPicker, PICTURES } from "../shared/layout-picker";
import { LinkField, NoLink } from "../shared/link-field";
import { MediaField } from "../shared/media-field";
import { VariantMenu } from "../shared/variant-menu";
import { PictureSlot } from "../shared/picture-slot";

const LAYOUTS = [
  { value: "text", label: __("Text", "afrigov-blocks"), picture: PICTURES.text },
  { value: "image", label: __("Picture beside", "afrigov-blocks"), picture: PICTURES.image },
  { value: "image-first", label: __("Picture first", "afrigov-blocks"), picture: PICTURES["image-first"] },
  { value: "centred", label: __("Centred", "afrigov-blocks"), picture: PICTURES.centred },
  { value: "cover", label: __("Over a photo", "afrigov-blocks"), picture: PICTURES.cover },
];

/** The classes afrigov's hero uses for each choice. render.php builds the same list. */
export function heroClasses({ layout, colour, panel, position, tall }) {
  const c = ["ag-hero"];
  if (layout === "cover") {
    c.push("ag-hero--cover");
    if (panel === "light") c.push("ag-hero--cover-light");
    if (position === "end") c.push("ag-hero--cover-end");
    if (position === "top") c.push("ag-hero--cover-top");
  } else {
    if (colour === "primary") c.push("ag-hero--primary");
    if (layout === "image" || layout === "image-first") c.push("ag-hero--image");
    if (layout === "image-first") c.push("ag-hero--image-first");
    if (layout === "centred") c.push("ag-hero--centred");
  }
  if (tall) c.push("ag-hero--tall");
  return c.join(" ");
}

/**
 * The hero as it will look, with the words typed straight onto it. Each button's link sits
 * just under the buttons while the hero is selected, so a button is never left going nowhere.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
  const { layout, colour, panel, position, tall, isPageTitle, title, lead, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, note, image } = attributes;
  const blockProps = useBlockProps({ className: heroClasses(attributes) });
  const set = (key) => (value) => setAttributes({ [key]: value });
  const hasPicture = layout === "image" || layout === "image-first" || layout === "cover";

  const text = (
    <>
      <RichText
        tagName={isPageTitle ? "h1" : "h2"}
        className="ag-heading-xl ag-hero__title"
        value={title}
        allowedFormats={[]}
        onChange={set("title")}
        placeholder={__("Title, such as: Renew a passport online", "afrigov-blocks")}
      />
      <RichText
        tagName="p"
        className="ag-lead ag-hero__lead"
        value={lead}
        allowedFormats={["core/bold", "core/italic"]}
        onChange={set("lead")}
        placeholder={__("One or two sentences: what people can do here.", "afrigov-blocks")}
      />
      <div className="ag-button-group ag-hero__actions">
        <RichText tagName="span" className="ag-button ag-button--start" value={primaryLabel} allowedFormats={[]} withoutInteractiveFormatting onChange={set("primaryLabel")} placeholder={__("Main button", "afrigov-blocks")} />
        <RichText tagName="span" className="ag-button ag-button--secondary afrigov-blocks-optional" value={secondaryLabel} allowedFormats={[]} withoutInteractiveFormatting onChange={set("secondaryLabel")} placeholder={__("Second button (optional)", "afrigov-blocks")} />
      </div>
      {isSelected && (primaryLabel || secondaryLabel) && (
        <div className="afrigov-blocks-fields">
          {primaryLabel && <LinkField label={__("Main button goes to", "afrigov-blocks")} value={primaryUrl} onChange={set("primaryUrl")} />}
          {secondaryLabel && <LinkField label={__("Second button goes to", "afrigov-blocks")} value={secondaryUrl} onChange={set("secondaryUrl")} />}
        </div>
      )}
      {!isSelected && primaryLabel && !primaryUrl && <NoLink hidden what={__("The main button", "afrigov-blocks")} />}
      {!isSelected && secondaryLabel && !secondaryUrl && <NoLink hidden what={__("The second button", "afrigov-blocks")} />}
      <RichText
        tagName="p"
        className="ag-mb-0 afrigov-blocks-optional"
        value={note}
        allowedFormats={["core/link", "core/bold"]}
        onChange={set("note")}
        placeholder={__("A line under the buttons (optional), such as: Moving house? Transfer your connection. Shift and Enter starts a second line.", "afrigov-blocks")}
      />
    </>
  );


  return (
    <>
      <VariantMenu label={__("Layout", "afrigov-blocks")} icon="layout" value={layout} options={LAYOUTS} onChange={set("layout")} />
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <LayoutPicker label={__("Layout", "afrigov-blocks")} value={layout} options={LAYOUTS} onChange={set("layout")} />
          {layout !== "cover" && (
            <ToggleControl label={__("Coloured panel", "afrigov-blocks")} help={__("The country's main colour behind the text.", "afrigov-blocks")} checked={colour === "primary"} onChange={(on) => setAttributes({ colour: on ? "primary" : "plain" })} />
          )}
          {layout === "cover" && (
            <>
              <SelectControl label={__("The panel with the text", "afrigov-blocks")} value={panel} options={[{ label: __("Main colour", "afrigov-blocks"), value: "dark" }, { label: __("White", "afrigov-blocks"), value: "light" }]} onChange={set("panel")} />
              <SelectControl label={__("Where the panel sits", "afrigov-blocks")} help={__("Put it where the photo has nothing important.", "afrigov-blocks")} value={position} options={[{ label: __("Bottom left", "afrigov-blocks"), value: "start" }, { label: __("Bottom right", "afrigov-blocks"), value: "end" }, { label: __("Top left", "afrigov-blocks"), value: "top" }]} onChange={set("position")} />
            </>
          )}
          <ToggleControl label={__("Tall", "afrigov-blocks")} help={__("More room, for a longer sentence or a line under the buttons.", "afrigov-blocks")} checked={tall} onChange={set("tall")} />
          <ToggleControl label={__("The title is the page's main heading", "afrigov-blocks")} help={__("Leave on when the hero is at the top of the page. A page has one main heading.", "afrigov-blocks")} checked={isPageTitle} onChange={set("isPageTitle")} />
        </PanelBody>
        {hasPicture && (
          <PanelBody title={__("Picture", "afrigov-blocks")}>
            <MediaField
              label={layout === "cover" ? __("Photo behind the panel", "afrigov-blocks") : __("Picture beside the text", "afrigov-blocks")}
              help={__("Keep it under 150 KB. The afrigov-images tool makes a photo that light.", "afrigov-blocks")}
              image={image}
              onChange={set("image")}
            />
          </PanelBody>
        )}
      </InspectorControls>

      <div {...blockProps}>
        {layout === "cover" && (
          <PictureSlot image={image} isSelected={isSelected} onChange={set("image")} label={__("Choose the photo behind the text", "afrigov-blocks")} className="ag-hero__cover" render={(img) => <img className="ag-hero__cover" src={img.url} alt="" />} />
        )}
        <div className="ag-container ag-hero__inner">
          <div className={layout === "cover" ? "ag-hero__panel" : undefined}>{text}</div>
          {(layout === "image" || layout === "image-first") && (
            <figure className="ag-figure ag-hero__media">
              <PictureSlot image={image} isSelected={isSelected} onChange={set("image")} render={(img) => <img className="ag-figure__image" src={img.url} alt="" />} />
            </figure>
          )}
        </div>
      </div>
    </>
  );
}
