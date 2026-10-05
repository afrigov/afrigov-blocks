import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";

/**
 * The hero as it will look, with the words typed straight onto it. The switches and the
 * button links are in the sidebar, so the page itself stays clean.
 */
export default function Edit({ attributes, setAttributes }) {
  const { title, lead, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl, colour, tall, isPageTitle } = attributes;
  const classes = ["ag-hero", colour === "primary" && "ag-hero--primary", tall && "ag-hero--tall"].filter(Boolean).join(" ");
  const blockProps = useBlockProps({ className: classes });
  const plain = []; // no bold, italic or links inside a title or a button

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Look", "afrigov-blocks")}>
          <ToggleControl
            label={__("Coloured panel", "afrigov-blocks")}
            help={__("The country's main colour behind the text.", "afrigov-blocks")}
            checked={colour === "primary"}
            onChange={(on) => setAttributes({ colour: on ? "primary" : "plain" })}
          />
          <ToggleControl
            label={__("Tall", "afrigov-blocks")}
            help={__("More room, for a longer sentence or a line under the buttons.", "afrigov-blocks")}
            checked={tall}
            onChange={(value) => setAttributes({ tall: value })}
          />
          <ToggleControl
            label={__("The title is the page's main heading", "afrigov-blocks")}
            help={__("Leave on when the hero is at the top of the page. A page has one main heading.", "afrigov-blocks")}
            checked={isPageTitle}
            onChange={(value) => setAttributes({ isPageTitle: value })}
          />
        </PanelBody>
        <PanelBody title={__("Button links", "afrigov-blocks")}>
          <TextControl
            label={__("Main button goes to", "afrigov-blocks")}
            help={__("A page on this site, such as /passports/renew, or a full address.", "afrigov-blocks")}
            value={primaryUrl}
            onChange={(value) => setAttributes({ primaryUrl: value })}
          />
          <TextControl
            label={__("Second button goes to", "afrigov-blocks")}
            help={__("Leave the second button's words empty to have one button.", "afrigov-blocks")}
            value={secondaryUrl}
            onChange={(value) => setAttributes({ secondaryUrl: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="ag-container ag-hero__inner">
          <div>
            <RichText
              tagName={isPageTitle ? "h1" : "h2"}
              className="ag-heading-xl ag-hero__title"
              value={title}
              allowedFormats={plain}
              onChange={(value) => setAttributes({ title: value })}
              placeholder={__("Title, such as: Renew a passport online", "afrigov-blocks")}
            />
            <RichText
              tagName="p"
              className="ag-lead ag-hero__lead"
              value={lead}
              allowedFormats={["core/bold", "core/italic"]}
              onChange={(value) => setAttributes({ lead: value })}
              placeholder={__("One or two sentences: what people can do here.", "afrigov-blocks")}
            />
            <div className="ag-button-group ag-hero__actions">
              <RichText
                tagName="span"
                className="ag-button ag-button--start"
                value={primaryLabel}
                allowedFormats={plain}
                withoutInteractiveFormatting
                onChange={(value) => setAttributes({ primaryLabel: value })}
                placeholder={__("Main button", "afrigov-blocks")}
              />
              <RichText
                tagName="span"
                className="ag-button ag-button--secondary afrigov-blocks-optional"
                value={secondaryLabel}
                allowedFormats={plain}
                withoutInteractiveFormatting
                onChange={(value) => setAttributes({ secondaryLabel: value })}
                placeholder={__("Second button (optional)", "afrigov-blocks")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
