# AI Film Studio projects

AI Film Studio ([mira.mybots.pro/studio](https://mira.mybots.pro/studio)) is where a team makes a film
together. A workspace holds the team and its wallet; each project inside it has a fixed cast
(Elements), a shared bin of takes, a Liked collection, folders, a brief, a canvas and Editor, where
the team cuts the film itself: takes on a timeline, voiceover, sound effects, music and subtitles,
exported back into the bin. Every member works on the same material, and every render inside a
project is paid by the workspace owner.

## When to use it

The user talks about "the project", "our film", their team, a cast they share with others, a
storyboard the team is working on, or pastes a `/studio/p/...` link. Call `film_list_projects`
first; it returns the projects the user owns, the team projects they belong to and the ones shared
with them as a guest, with their role in each.

## Read before you render

`film_get_project` returns a briefing written for an agent: the user's role, the logline, every
brief section, the cast with `elementId` and passport, folders with `folderId`, the latest takes with
`assetId` with their review status (`review`, `changes`, `approved`, `final`) and labels, the named
"other" references, and the team's cuts in Editor. The team has usually decided the story, the tone
and the look already.
Build on that; do not propose a new direction unless the user asks for one.

## Render into the project

Pass `filmProjectId` to `generate_image` or `generate_video`. The take then:

- lands in the project's bin, where the whole team sees it, likes it and comments on it;
- is paid from the **workspace owner's** balance, within the member's monthly limit;
- needs the editor role (viewers cannot render).

Keep the cast identical with `elementIds` from `film_list_elements`: up to 3 characters, 1 location
and 1 prop per take. The platform injects each element's canonical references and passport, the
same way `bloggerId` works for a personal render, so describe them in the prompt consistently with
their passports and never redraw a face. Inside a project, elements replace `bloggerId`, `studioId`
and `productId`.

To continue the look of an approved frame, pass its `assetId` in `refAssetIds`; the platform fetches
the take itself, so do not copy its URL into `referenceImageUrls`. `refAssetIds` and `elementIds` are
references too, so they cannot be combined with keyframe anchors (`startImageUrl` / `endImageUrl`).

Elements of kind `other` are takes or uploads the team named (a look, a clip, a sound). They go into
a take through `refAssetIds` with their `assetId`, never through `elementIds`. Takes marked
`approved` or `final` are the team's picks: prefer them as references; `changes` means someone wants
that take redone. Statuses and labels belong to the team, agents do not set them.

A take in the bin carries its `generationId`: `extend_video`, `upscale_video` and `finalize_draft`
work on it as on any of the user's own clips.

## Keep the project tidy

| Tool | What it does |
|---|---|
| `film_list_assets` | The bin, newest first; `section` `liked` returns the team's picks, `folderId` one folder. |
| `film_move_assets` | Takes into a folder, or back to the root with an empty `folderId`. Editor role. |
| `film_update_brief` | Markdown into one brief section: `context`, `narrative`, `visuals`, `production`, `status`, `resources`, `notes`. Appends by default; `append=false` replaces the section, only when the user asked to rewrite it. Editor role. |
| `film_add_comment` | A note for the team on a take (`asset`), an `element` or the `brief`. Only when the user asks. |

Write a story or a script into `narrative`, the look and its references into `visuals`, and shot
lists or the schedule into `production`. Use plain Markdown: headings, lists, tables, no emoji.
Lines like `![caption](film-asset:…)` are takes the team embedded in the brief: keep them where they
are when you edit a section.

## The cut is the team's

Agents render takes and write the brief; the team assembles the film in Editor. A storyboard is a
shot list in the brief plus takes rendered one by one with the project's `elementIds`. Do not build a
movie inside a project. When the user wants the cut, point them to Editor and offer to write the
voiceover script and subtitle lines into the brief.

## Money and refusals

Tell the user the price as usual, and say once that it comes from the workspace balance. The
refusals that matter:

- `film_member_limit_reached`: the member's monthly limit is spent. The owner raises it in the
  studio's Settings, Members tab.
- `film_workspace_credits_empty`: the owner's balance is empty. The owner tops it up; never send a
  member to buy credits for a team render.
- `film_forbidden`: the role does not allow it, usually a viewer trying to render. They ask a project
  admin for the editor role.
- `film_element_not_in_project` / `film_ref_not_in_project`: an id from somewhere else. Take ids only
  from `film_list_elements` and `film_list_assets`.
- `film_cast_too_large`: more than 3 characters, 1 location or 1 prop in one take.

## Not in the studio yet

3D, AI Blogger motion and speech, Miracle and Direct presets are not part of a project in this
version. Make them as personal renders without `filmProjectId` when the user wants them anyway. Sound
for the film (voiceover, effects, music) is generated by the team in Editor.

Never show project, element, asset, folder or cut ids to the user.
