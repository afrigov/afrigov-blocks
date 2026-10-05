import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

/**
 * Choose a picture from the media library. The description (alt text) comes from the media
 * library, so it is written once per picture; the field says when it is missing.
 */
export function MediaField({ label, help, image, onChange, allowedTypes = ["image"] }) {
  return (
    <MediaUploadCheck>
      <div className="afrigov-blocks-media">
        <p className="afrigov-blocks-media__label">{label}</p>
        {help && <p className="afrigov-blocks-media__help">{help}</p>}
        {image?.url && allowedTypes.includes("image") && <img src={image.url} alt="" />}
        {image?.id && image.title && !allowedTypes.includes("image") && <p>{image.title}</p>}
        <MediaUpload
          allowedTypes={allowedTypes}
          value={image?.id}
          onSelect={(media) =>
            onChange({
              id: media.id,
              url: media.sizes?.large?.url || media.url,
              alt: media.alt || "",
              title: media.title || "",
            })
          }
          render={({ open }) => (
            <Button variant="secondary" onClick={open}>
              {image?.id ? __("Replace", "afrigov-blocks") : __("Choose from the media library", "afrigov-blocks")}
            </Button>
          )}
        />
        {image?.id && (
          <Button variant="link" isDestructive onClick={() => onChange(undefined)}>
            {__("Remove", "afrigov-blocks")}
          </Button>
        )}
        {image?.id && allowedTypes.includes("image") && !image.alt && (
          <p className="afrigov-blocks-media__help">
            {__("No description. Add one in the media library if the picture says something the text does not; leave it empty if it is decoration.", "afrigov-blocks")}
          </p>
        )}
      </div>
    </MediaUploadCheck>
  );
}
