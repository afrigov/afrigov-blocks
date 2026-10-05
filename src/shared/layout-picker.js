import { Button } from "@wordpress/components";

/**
 * Choices shown as small pictures, so nobody has to know a layout by name.
 * Each option: { value, label, picture } where picture is a tiny SVG.
 */
export function LayoutPicker({ label, value, options, onChange }) {
  return (
    <fieldset className="afrigov-blocks-picker">
      <legend className="afrigov-blocks-picker__legend">{label}</legend>
      <div className="afrigov-blocks-picker__grid">
        {options.map((option) => (
          <Button
            key={option.value}
            className="afrigov-blocks-picker__option"
            isPressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            <span className="afrigov-blocks-picker__picture" aria-hidden="true">
              {option.picture}
            </span>
            <span>{option.label}</span>
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

/** Building blocks for the pictures: a 60x40 frame. */
const Frame = ({ children, fill = "#f2f2f2" }) => (
  <svg viewBox="0 0 60 40" width="60" height="40">
    <rect width="60" height="40" fill={fill} />
    {children}
  </svg>
);
const Lines = ({ x = 6, y = 10, w = 26, ink = "#1b1b1b" }) => (
  <>
    <rect x={x} y={y} width={w} height="4" fill={ink} />
    <rect x={x} y={y + 7} width={w * 0.8} height="2" fill={ink} opacity="0.6" />
    <rect x={x} y={y + 12} width={w * 0.6} height="2" fill={ink} opacity="0.6" />
    <rect x={x} y={y + 18} width="12" height="5" fill={ink} />
  </>
);
const Picture = ({ x, y = 8, w = 20, h = 24 }) => <rect x={x} y={y} width={w} height={h} fill="#9fb3c8" />;

export const PICTURES = {
  text: (
    <Frame>
      <Lines w={34} />
    </Frame>
  ),
  image: (
    <Frame>
      <Lines />
      <Picture x={34} />
    </Frame>
  ),
  "image-first": (
    <Frame>
      <Picture x={6} />
      <Lines x={30} />
    </Frame>
  ),
  centred: (
    <Frame>
      <Lines x={13} w={34} />
    </Frame>
  ),
  cover: (
    <Frame fill="#9fb3c8">
      <rect x="4" y="12" width="30" height="24" fill="#1b1b1b" />
      <Lines x={7} y={15} w={22} ink="#ffffff" />
    </Frame>
  ),
};
