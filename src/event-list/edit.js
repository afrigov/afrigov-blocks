import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, RangeControl, TextControl, ToggleControl } from "@wordpress/components";
import ServerSideRender from "@wordpress/server-side-render";
import { HeadingLevel } from "../shared/heading-level";
import { LinkField } from "../shared/link-field";
import { VariantMenu } from "../shared/variant-menu";

/** Drawn by the server from the Events section, exactly as the page will show it. */
export default function Edit({ attributes, setAttributes }) {
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <>
      <VariantMenu
        label={__("Show", "afrigov-blocks")}
        icon="calendar-alt"
        value={attributes.which}
        options={[{ value: "upcoming", label: __("Upcoming", "afrigov-blocks") }, { value: "past", label: __("Past", "afrigov-blocks") }, { value: "all", label: __("All", "afrigov-blocks") }]}
        onChange={set("which")}
      />
      <InspectorControls>
        <PanelBody title={__("Which events", "afrigov-blocks")}>
          <RangeControl label={attributes.paginate ? __("How many on each page", "afrigov-blocks") : __("How many", "afrigov-blocks")} min={1} max={30} value={attributes.count} onChange={set("count")} />
          <ToggleControl label={__("Show them all, in pages", "afrigov-blocks")} help={__("For the events page: links to the next and earlier pages under the list.", "afrigov-blocks")} checked={attributes.paginate} onChange={set("paginate")} />
          <HeadingLevel what={__("Event titles", "afrigov-blocks")} value={attributes.headingLevel} onChange={set("headingLevel")} />
        </PanelBody>
        <PanelBody title={__("Link under the list", "afrigov-blocks")}>
          <TextControl label={__("Its words (optional)", "afrigov-blocks")} help={__("Such as: All events", "afrigov-blocks")} value={attributes.allLabel} onChange={set("allLabel")} __nextHasNoMarginBottom />
          {attributes.allLabel && <LinkField label={__("It goes to", "afrigov-blocks")} value={attributes.allUrl} onChange={set("allUrl")} />}
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        <ServerSideRender block="afrigov/event-list" attributes={attributes} />
      </div>
    </>
  );
}
