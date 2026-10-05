# afrigov blocks

afrigov's components as WordPress blocks. Each block is a fixed shape you fill in on the page: you type the title onto the hero, and the service cards have an Add card button. Nothing can be dropped inside a block that does not belong there, and the editor looks like the published page.

Status: version 0.1.0, twelve blocks, in development. It is not in the WordPress plugin directory yet.

## The blocks

Each block is listed under **afrigov** when you press **+** in the editor. Repeating parts have an Add button under them, and only the right kind of item can go inside.

| Block | What you fill in on the page | Choices in the sidebar |
| --- | --- | --- |
| Hero | Title, a sentence, one or two buttons, a line under them | Layout, chosen from pictures: text, picture beside, picture first, centred, over a photo. Coloured panel, tall, and for a photo the panel's colour and where it sits |
| Service cards | Cards, with **Add card** | The edge along the top: main colour, accent, the flag. Heading level |
| Steps | Numbered steps, with **Add step** | Heading level |
| Key figures | Figures and what they count, with **Add figure**, and the date they are true for | |
| People | Name and role, with **Add person** | Portraits, links, and the layout: as many as fit, 2 or 3 centred, 4 or 6 a row, or rows |
| Events | Title, when and where, a sentence, with **Add event** | The date and time, or "to be confirmed". An event is marked past by itself once its date has gone |
| Alert | Title and what to do | Information, success, warning or problem |
| Downloads | Documents, with **Add document** | The file, from the media library. Its type and size are worked out from the file |
| Statement | Title, the message, the name and role, a link | Portrait |
| Latest news | Nothing: it shows the newest posts and updates itself | How many, which category, a line from each |
| Band | Anything: a section across the page | Pale tint, main colour, dark, accent |
| Feature | Title, a sentence, points with **Add point**, a link | Picture, and whether it goes after the text |

Links sit just under what they belong to while a block is selected. Something with words but no link says so in the editor.

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

## Licence

GPL-2.0-or-later, as WordPress requires of plugins in its directory.
