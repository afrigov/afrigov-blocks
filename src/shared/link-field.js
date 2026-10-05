import { __ } from "@wordpress/i18n";
import { URLInput } from "@wordpress/block-editor";

/** Where something links to: a page on the site, found by typing, or a full address. */
export function LinkField({ label, value, onChange }) {
  return (
    <div className="afrigov-blocks-link">
      <URLInput
        label={label}
        value={value || ""}
        onChange={(url) => onChange(url)}
        placeholder={__("Search pages, or paste an address", "afrigov-blocks")}
        __nextHasNoMarginBottom
      />
    </div>
  );
}

/**
 * Said in the editor when something has words but nowhere to go. `hidden` when the page leaves it
 * out until it has a link, as a button does; otherwise it shows without a link.
 */
export function NoLink({ what, hidden = false }) {
  return (
    <p className="afrigov-blocks-warning">
      {what}{" "}
      {hidden
        ? __("has no link yet, so it will not show on the page. Select the block to add one.", "afrigov-blocks")
        : __("has no link yet. Select it to add one.", "afrigov-blocks")}
    </p>
  );
}
