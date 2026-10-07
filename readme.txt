=== afrigov blocks ===
Contributors: abimbolaomoyola
Tags: accessibility, government, blocks, design system, africa
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 8.0
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Accessible, light government pages in the block editor: afrigov's components as blocks you fill in on the page.

== Description ==

afrigov blocks brings the components of [afrigov](https://afrigov.dev), an open-source design system for African public services, to the block editor. Each block is a fixed shape you fill in where it appears: you type the title onto the hero, and service cards have an Add card button. The editor looks like the published page, and nothing can be dropped inside a block that does not belong there.

Pages built with these blocks pass WCAG 2.1 AA checks and stay light enough for a prepaid phone bundle. The [use cases](https://usecases.afrigov.dev/) show real government websites rebuilt with afrigov, with their accessibility scores before and after.

= The blocks =

* **Hero**, with layouts: text only, a picture beside or first, centred, or over a photograph. A tall version for more words.
* **Service cards**, with a coloured edge, a picture or a logo.
* **Steps**, **key figures**, **people** and a leader's **statement**.
* **Events list**, from the events you add, upcoming, past or all, in pages.
* **Event details**: when, where and who it is for, with the event's flyer beside them.
* **Latest news**, from your posts.
* **Alert**, **inset text**, **accordion**, **summary list** and **panel**.
* **Downloads**, with the file type and size worked out.
* **Band**, a coloured section across the page, and **feature**.
* **Video** and **video cards**: YouTube, Vimeo or a video file, loaded only when pressed.
* **Photo gallery**, **figure**, **dated list**, **empty state**, **back link**, **search box**, **social links**, **page title** and **pagination**.

= How editing works =

* **Type on the page.** Titles, sentences and lists are edited where they appear.
* **Add buttons.** Repeating parts have their own Add button, and only the right kind of item fits inside.
* **Variants from the toolbar.** Click a block and choose its layout or style.
* **Pictures where they go.** A block with a picture shows a Choose a picture button in its place.
* **Starter pages.** A new page offers a service page, an about page and a home page, laid out and ready to fill in.

= Events =

Events have their own place in the admin menu. Each has a When and where panel: a date and time, or to be confirmed, the place in words, and an optional link. An event moves to the past list by itself the day after its date.

A new event starts with an Event details block, with When and Where rows to fill in. Its flyer, set beside the editor or by clicking its place on the page, shows beside the details and opens full size. Write everything on the flyer in the rows as well, so it can be read without the picture. Put an Events list block on a page called Events, set to show all events in pages, and a short one on the home page.

= Pages stay tidy =

On pages, the block inserter offers the afrigov blocks and the basic writing blocks, and leaves out the ones that break the look, such as columns and covers. Posts keep every block. Blocks already on a page keep working. To turn this off:

`add_filter( 'afrigov_blocks_limit_pages', '__return_false' );`

= With any theme =

The plugin works with any block theme or classic theme: it loads afrigov's stylesheet when the theme does not carry it. The afrigovPress theme carries it, along with the official banner, header and footer.

== Installation ==

1. Install and activate the plugin.
2. Edit a page and press the + button. The blocks are under **afrigov**.
3. To start from a ready page, create a new page and choose one of the starter pages.

== Frequently Asked Questions ==

= Is this an official government plugin? =

No. afrigov is an independent open-source project and is not affiliated with any government.

= Which countries does it support? =

The blocks are country-neutral. Country colours, flags and the official banner's words come from afrigov's country packs, which the afrigovPress theme sets up.

= Does it slow pages down? =

No. afrigov's stylesheet is about 10 KB, there are no web fonts, and every block works without JavaScript. Videos load only when someone presses play.

= Where is the source code? =

On GitHub: [afrigov/afrigov-blocks](https://github.com/afrigov/afrigov-blocks). The JavaScript in the build folder is compiled from the src folder there with `npm run build`.

== External services ==

The Video and Video cards blocks can show a video hosted on YouTube or Vimeo. Nothing is loaded from either service when the page opens. The video player loads from the service only when a visitor presses play, and from then on the service receives the visitor's IP address and browser details, as with any embedded video.

* YouTube videos play from youtube-nocookie.com, which does not set cookies until the video is played. [YouTube terms](https://www.youtube.com/t/terms), [Google privacy policy](https://policies.google.com/privacy).
* Vimeo videos play with Do Not Track set. [Vimeo terms](https://vimeo.com/terms), [Vimeo privacy policy](https://vimeo.com/privacy).

A video file from the media library plays from your own site and uses no outside service.

== Screenshots ==

1. The afrigov blocks in the block inserter.
2. Editing a hero on the page, with its layout in the toolbar.
3. Service cards with an Add card button.
4. An event's When and where panel.

== Changelog ==

= 0.1.0 =
* First release: afrigov's components as blocks, events, starter pages and the page block list.

== Third-party code ==

The plugin includes afrigov's stylesheet and script (MIT licence, https://github.com/afrigov/afrigov), which is compatible with the GPL.
