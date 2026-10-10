# afrigov blocks

afrigov's components as WordPress blocks. Each block is a fixed shape you fill in on the page: you type the title onto the hero, and the service cards have an Add card button. Nothing can be dropped inside a block that does not belong there, and the editor looks like the published page.

Version 0.1.0, being prepared for the WordPress plugin directory. `readme.txt` is the directory listing, and `.wordpress-org/` holds its icon, banner and screenshots.

## The blocks

Each block is listed under **afrigov** when you press **+** in the editor. Repeating parts have an Add button under them, and only the right kind of item can go inside.

| Block | What you fill in on the page | Variants and choices |
| --- | --- | --- |
| Hero | Title, a sentence, one or two buttons, a line under them | Layout: text, picture beside, picture first, centred, over a photo. Coloured panel, tall. For a photo, the panel's colour and where it sits |
| Service cards | Cards, with **Add card**. Each can have a photo or a logo, and a small line | Style: main colour, accent, flag, tinted, plain. Picture beside the text |
| Steps | Numbered steps, with **Add step** | Heading level |
| Key figures | Figures, with **Add figure**, and the date they are true for | |
| People | Name and role, with **Add person** | Layout: as many as fit, 2 or 3 centred, 4 or 6 a row, rows |
| Events | Title, when and where, with **Add event**. For a few events typed on one page | Date and time, or to be confirmed. Marked past by itself |
| Event details | Rows such as When, Where and Cost, with **Add row**, and the flyer beside them | On an event, the flyer is its featured image, labelled Flyer |
| Events list | Nothing: it shows events from **Events** in the admin menu | Upcoming, past or all. How many. Pages of them, for the events page |
| Alert | Title and what to do | Kind: information, success, warning, problem |
| Downloads | Documents, with **Add document** | The file; its type and size are worked out |
| Statement | A leader's message, name, role, link | Portrait |
| Latest news | Nothing: it shows the newest posts | How many, which category, a line from each, an All news link |
| Band | Anything: a section across the page | Colour: pale tint, main colour, dark, accent |
| Feature | Title, a sentence, points with **Add point**, a link | Picture first or after the text |
| Accordion | Questions and answers, with **Add section** | |
| Inset text | A sentence set apart | |
| Summary list | Names and values, with **Add row** | |
| Video | Title, length, a line under it, the transcript | YouTube or Vimeo address, still. Loads only when pressed, with no tracking |
| Video cards | Videos, with **Add video** | Still, length, link |
| Photo gallery | A caption under each photo | Layout: three a row, two larger, four smaller. Open full size |
| Dated list | Notices or press releases, with **Add item** | Date, link, kind |
| Empty state | What is missing, where to look, a button | |
| Panel | A done message and a reference number | |
| Back link | Its words | Where it goes |
| Search box | Its label | Large |
| Social links | Nothing on the page | The accounts' addresses |

Links sit just under what they belong to while a block is selected. Something with words but no link says so in the editor.

A block with a picture shows a **Choose a picture** button where the picture goes. With a picture in, **Change picture** sits on it while the block is selected.

## Using variants

Click a block. The toolbar above it shows its main choice and what is chosen now, such as **Layout: Over a photo** or **Style: Tinted**. Click it to pick another. The page changes at once.

The main variants are also in the **+** menu as their own items: **Hero over a photo**, **Hero with a picture**, **Alert: warning**, **Band: main colour** and so on.

Every other choice is in the settings sidebar, opened with the gear at the top right, on the **Block** tab.

## Pages and posts

On pages, the + menu holds these blocks and the basic writing blocks: paragraph, heading, list, quote, image, table, details, separator, buttons, shortcode, and YouTube and Vimeo embeds. Groups, columns and covers are left out, since they break the look. Posts keep every block.

A new page offers three starter pages: Service, About and Home.

## News and events

News is ordinary WordPress posts. Set a page as the posts page under Settings, Reading, and the theme lists the posts there, in pages. The page's excerpt is the sentence under its title. Latest news shows the newest few anywhere else.

Events are their own kind of post: **Events** in the admin menu. A new event starts with the Event details block, and its featured image is labelled **Flyer**. Each has a **When and where** panel beside the editor: the date and time, or to be confirmed, the place in words, and a link for an event with nothing written about it on the site. An event is past the day after its date, and moves to the past list by itself. Its page is at /events/its-name/.

Put an Events list block on a page called Events, set to all and in pages, and use one set to upcoming, with a small number, on the home page.

## How it is built

- **Dynamic blocks.** The post saves only each block's fields. `render.php` builds the HTML from afrigov's components when the page is shown. When afrigov changes a component's markup, existing pages follow, with no "This block contains unexpected content" warning.
- **Locked where it matters.** Service cards accepts only service cards, and a service card cannot sit outside service cards.
- **The page's look in the editor.** With the afrigovPress theme, the theme's own afrigov stylesheet styles the editor and the page. With another theme, the plugin loads afrigov's stylesheet itself. A theme that carries afrigov says so with `add_theme_support( 'afrigov' )`.
- **One main heading.** A hero at the top of a page is its main heading. afrigovPress then leaves out its own page title.

## Try it

The local WordPress lives in the afrigovPress folder, and this plugin is mounted into it:

```sh
npm install && npm run build      # here, in afrigov-blocks
cd ../afrigovPress && npm start   # WordPress at http://localhost:8888, admin / password
```

Open Pages, Add New, press the + at the top left, and look under afrigov. The page "All blocks" uses every one.

## How it is made

Built with AI assistance (Claude). Every change is reviewed and decided by the maintainer before it ships.

## Licence

GPL-2.0-or-later, as WordPress requires of plugins in its directory.
