import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

const NETWORKS = ["Facebook", "X", "Instagram", "LinkedIn", "YouTube", "WhatsApp"];

/** The addresses go in the sidebar; the page shows only the networks that have one. */
export default function Edit({ attributes, setAttributes }) {
  const links = attributes.links || {};
  const filled = NETWORKS.filter((n) => links[n]);
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Accounts", "afrigov-blocks")}>
          {NETWORKS.map((n) => (
            <TextControl key={n} label={n} value={links[n] || ""} placeholder="https://" onChange={(value) => setAttributes({ links: { ...links, [n]: value } })} __nextHasNoMarginBottom />
          ))}
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        {filled.length ? (
          <ul className="ag-social">
            {filled.map((n) => (
              <li key={n}><span className="ag-social__link">{n}</span></li>
            ))}
          </ul>
        ) : (
          <p className="afrigov-blocks-warning">{__("Add the accounts' addresses in the sidebar.", "afrigov-blocks")}</p>
        )}
      </div>
    </>
  );
}
