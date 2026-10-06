import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

/** What the media library hands back, kept small: the id, a URL to show, the description and title. */
export const fromMedia = (media) => ({
  id: media.id,
  url: media.sizes?.large?.url || media.sizes?.medium_large?.url || media.url,
  alt: media.alt || "",
  title: media.title || "",
});

/**
 * A picture on the page itself: click the empty space to choose one, or "Change picture" on it
 * while the block is selected. No need to find the sidebar.
 *
 * render(img): how the chosen picture is drawn, so each block keeps afrigov's markup.
 */
export function PictureSlot({ image, onChange, isSelected, label = __("Choose a picture", "afrigov-blocks"), render, className = "" }) {
  return (
    <MediaUploadCheck fallback={image?.url ? render(image) : null}>
      <MediaUpload
        allowedTypes={["image"]}
        value={image?.id}
        onSelect={(media) => onChange(fromMedia(media))}
        render={({ open }) =>
          image?.url ? (
            <span className={`afrigov-blocks-picture ${className}`}>
              {render(image)}
              {isSelected && (
                <Button variant="primary" size="small" className="afrigov-blocks-picture__change" onClick={open}>
                  {__("Change picture", "afrigov-blocks")}
                </Button>
              )}
            </span>
          ) : (
            <button type="button" className={`afrigov-blocks-empty-picture ${className}`} onClick={open}>
              <span aria-hidden="true">+</span> {label}
            </button>
          )
        }
      />
    </MediaUploadCheck>
  );
}
