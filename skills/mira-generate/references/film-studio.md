# AI Film Studio projects

AI Film Studio ([mira.mybots.pro/studio](https://mira.mybots.pro/studio)) is where a team makes a film
together. A workspace holds the team and its wallet; each project inside it has a fixed cast
(Elements), a shared bin of takes, a Liked collection, folders, a brief, a canvas and Editor, where
the team cuts the film itself: takes on a timeline, voiceover, sound effects, music and subtitles,
exported back into the bin. Every member works on the same material, and every render inside a
project is paid by the workspace owner.

## When to use it

The user talks about "the project", "our film", their team, a cast they share with others, or pastes a `/studio/p/...` link. Call `film_list_projects`
first; it returns the projects the user owns, the team projects they belong to and the ones shared
with them as a guest, with their role in each.

## Start a project and its cast

Only when the user asks for a new project, and after `film_list_projects` shows it does not exist yet:

- `film_create_project` makes a film project in the user's personal workspace, or in a team workspace
  they can create projects in (`workspaceId` from `film_list_projects`, or the workspace name). Name
  up to 80 characters, an optional logline up to 140. Free. Fill the brief with `film_update_brief`.
- `film_create_element` adds a character, a location or a prop to the cast from the user's own
  photos, 1 to 8 of ONE subject, the main angle first (a face portrait, a wide view of the place, a
  hero shot of the product). The photos become the element's angles right away: it is `ready` at
  once and free, and the passport is written in the background. Photos must be the user's images:
  upload them with `upload_reference_image` or use their Mira images; other links and videos are
  refused. A real person's face only when it is the user's own or the person agreed. Editor role.

An element drawn from scratch (no photos) is made in the studio itself; it is not available here.

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
| `film_create_element` | A cast element from the user's own photos, ready at once and free (see above). Editor role. |
| `film_extract_frame` | One frame of a video take (`last` by default, `first` or seconds) saved into the bin as an image, free. Returns its `assetId` and URL. Editor role. |

Write a story, a script or the shot list into `narrative`, the look and its references into `visuals`, and
the schedule into `production`. Use plain Markdown: headings, lists, tables, no emoji.
Lines like `![caption](film-asset:…)` are takes the team embedded in the brief: keep them where they
are when you edit a section.

## Shooting a shot: frame first, then the take from it

When a face has to hold, shoot in two steps, the way the team does in the studio:

1. **The frame.** `generate_image` with `filmProjectId` and the cast's `elementIds`. The frame carries
   the faces and the place, so this is where the cast goes.
2. **The take from the frame.** `generate_video` with `startFrameAssetId` (via the internal Mira MCP)
   or the frame's URL in `startImageUrl`, and no `elementIds`, `refAssetIds` or reference URLs:
   models refuse a first or last frame mixed with references. Models flagged `supports_last_frame`
   can also land on an end frame.

## Longer takes: extend, continue, finish

- **Extend in place.** A take on `seedance-2-5` or `omni` continues with `extend_video` and its
  `generationId` (from `film_list_assets`): the cast carries over, the result is one stitched take in
  the same bin, paid by the workspace. Any member who can generate may extend a teammate's take.
- **Continue from the last frame.** On any other model, `film_extract_frame` the take's last frame and
  start the next take from it: the seam disappears, but the cast rides only on that frame.
- **Finish.** `upscale_video` takes an approved take to 1080p, 4K or a higher frame rate. Extend first,
  upscale last: an upscaled take cannot be extended again.

## The cut is the team's

Agents render takes; the team assembles the film in Editor. Do not build a movie inside a project. When the user wants the cut, point them to Editor and offer to write the
voiceover script and subtitle lines into the brief.

When the user asks for a rough cut, you can start one: `film_edit_create` with the takes in order (videos
and stills butt-joined on the main track, audio on the music track), then `film_edit_update` with
`appendAssetIds` to add more. `film_edit_list` and `film_edit_get` read the team's cuts, `film_edit_render`
exports one to MP4 on Mira's servers for free, and `film_edit_export` gives a 30-minute download link for
editors outside Mira: `package` (every file plus XML, EDL and SRT), `xmeml` (Premiere Pro and DaVinci
Resolve import it), `edl` or `srt`.

## Desktop apps: After Effects, Premiere Pro, Blender

A project lives in the browser, but the team can finish it in their own apps. Check
`film_desktop_status` first: it says whether After Effects and Premiere Pro (the Mira panel) and Blender
(the Mira add-on) are connected right now. If an app is off, tell the user to open it, sign in to Mira
and switch the bridge on (mira.mybots.pro/adobe, mira.mybots.pro/blender); do not retry in a loop.

- **Takes into an app.** `film_open_in_app` with up to 12 assetIds and a host (`aeft`, `ppro`, `blender`)
  downloads them on the user's machine. In After Effects and Premiere they go into the Mira bin, or onto
  the open composition or sequence with destination `active`. In Blender an image becomes a reference
  plane and the camera background, a video a Video Sequencer strip and the camera background - the way to
  match a blockout against a take. Any team member's take works, not only the user's own.
- **A cut into Premiere.** `film_edit_open_in_app` rebuilds an Editor cut as a new Premiere Pro sequence
  (host `ppro`, the default): same clips and in/out points, dissolves and dips at the cuts, the sound
  tracks with their levels and fades, the subtitles as a caption track. Host `aeft` makes a composition
  with the clips as layers instead. A long cut takes a few minutes: the panel downloads every file.
- **Back into the bin.** A Blender blockout recording goes into the project with `blender_playblast` and
  `filmProjectId` (a `Blocking` folder from `film_create_folder` keeps it tidy); an After Effects render
  with `adobe_render` and `filmProjectId`; a Premiere sequence export with `adobe_command export_sequence`
  and `film_project_id`. A file from a link goes in with `film_import_url`, a file on disk with
  `create_upload` and `filmProjectId`, the user's own earlier generation with `film_add_generation`.
- **Blockout to take.** Record the blockout into the project, then `generate_video` with `filmProjectId`
  and the recording's url in `referenceVideoUrls` (the `mira-blender-scene` rules for playblast prompts
  apply). The take lands in the bin next to its blockout.

Generations started from the panel or the add-on go into the project only when the user switched it on
there; renders and blockout recordings are free.

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
