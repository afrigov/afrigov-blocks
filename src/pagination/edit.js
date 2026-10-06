import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { LinkField } from "../shared/link-field";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const set = (key) => (value) => setAttributes({ [key]: value });
  return (
    <nav {...useBlockProps()} aria-label={__("Pagination", "afrigov-blocks")}>
      <ul className="ag-pagination ag-pagination--simple">
        <li><RichText tagName="span" className="ag-pagination__link afrigov-blocks-optional" value={attributes.prevLabel} allowedFormats={[]} onChange={set("prevLabel")} placeholder={__("Newer (optional)", "afrigov-blocks")} /></li>
        <li><RichText tagName="span" className="ag-pagination__link" value={attributes.nextLabel} allowedFormats={[]} onChange={set("nextLabel")} placeholder={__("Older, such as: Older news", "afrigov-blocks")} /></li>
      </ul>
      {isSelected && (
        <div className="afrigov-blocks-fields">
          {attributes.prevLabel && <LinkField label={__("Newer goes to", "afrigov-blocks")} value={attributes.prevUrl} onChange={set("prevUrl")} />}
          <LinkField label={__("Older goes to", "afrigov-blocks")} value={attributes.nextUrl} onChange={set("nextUrl")} />
        </div>
      )}
    </nav>
  );
}
