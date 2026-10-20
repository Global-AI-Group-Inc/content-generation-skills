# AI Marketing Studio campaigns

AI Marketing Studio ([mira.mybots.pro/marketing](https://mira.mybots.pro/marketing)) is where a
marketing team runs campaigns together. It shares workspaces with AI Film Studio: the same team, the
same owner's wallet, the same roles. A campaign is a project with `projectType: "marketing"`. It has
a brand kit, a library of products, talent and locations, a bin of works, A/B variant sets, a review
board, a post calendar and results. Every render inside a campaign is paid by the workspace owner.

## When to use it

The user talks about "the campaign", an ad, a launch, their brand, a client's brand, a post
calendar, A/B hooks, or pastes a `/marketing/p/...` link. Call `film_list_projects`; campaigns are
the rows with `projectType: "marketing"`. Everything in [film-studio.md](film-studio.md) about
roles, the bin, `elementIds`, `refAssetIds` and refusals applies here too.

## Read before you render

`film_get_project` on a campaign returns a briefing written for an agent:

- the docket: objective, offer, channels, placements, languages, flight dates, whether approval is
  required and who approves;
- the brand on one line (colours with roles, fonts, tone, do and don't, photography); `mkt_get_brand`
  returns it in full when you write copy;
- the brief sections `objective`, `audience`, `message`, `offer`, `mandatories`, `creative`, `notes`;
- talent, products and locations with `elementId`, from the campaign and from the workspace's brand
  library (`[library]`);
- recent works with their review status, the variant sets and their winners, pending approvals and
  the posts of the next 7 days.

The team has usually set the offer and the tone already. Build on them.

## The brand is applied for you

Pass `filmProjectId` of the campaign to `generate_image` or `generate_video`. The platform adds the
campaign brand to the render itself. You choose only how strongly it shows with `brandMode`:

| `brandMode` | Use for |
|---|---|
| `off` | UGC and creator clips that must look native to the feed. |
| `accents` | The default: brand colours as quiet accents in props, wardrobe and light. |
| `lock` | Video only: the grade follows the brand palette. Brand films and motion pieces. |

Never write the logo, the brand name as a visual or hex codes into a prompt. Models distort logos;
the team places the logo on the end card in Editor.

## Styles, hooks, settings, placements

`mkt_list_styles` returns the studio's composer catalog. Prefer it to inventing a look:

- `styleId` brings a tested recipe, the playbook and default model, ratio and length. Some styles
  need talent, some show no person; the catalog says which.
- `hookId` (video) is the opening beat of the first 2-3 seconds; `hookText` is your own beat or an
  edited one, up to 300 characters.
- `settingId` / `settingText` (video) is where it happens.
- `placementId` (reels, stories, ig_feed_portrait, ig_feed_square, threads, youtube, ...) sets the
  ratio for that placement.

Keep the prompt about the product and the action; the style carries the look.

## Variants, Adapt, Localize: price first

These three spend from the owner's balance, often a lot at once. Each takes `dryRun`, which is true by
default and returns the plan and the total. Show the total, wait for a clear yes, then call again with
`dryRun=false`.

| Tool | What it does |
|---|---|
| `mkt_create_variants` | One base shot and one or two axes that change: `hook`, `setting`, `style`, `talent`, `product`, `offer`, `model`. 2-6 values per axis, up to 12 cells. Own hook text: `text:...`. |
| `mkt_adapt` | Finished works into other placements: video reframed, images cropped for free or recomposed for a price. |
| `mkt_localize` | A finished video dubbed into up to 6 languages (`dub`, `dub_lipsync`) or captioned. |

Format and language are not variant axes: test hooks first, then adapt and localize the winner.

## Product Link scripts

`mkt_script` writes a short ad script for a product from the library in the brand voice: shots,
voiceover, caption and hashtags. It costs about 3 credits. `mkt_script_generate` renders it into the
campaign bin, priced like a video of that model and length. Quote both before calling.
`marketing_brief` with the campaign's `filmProjectId` writes a free-form brief paid by the owner.

## Posts are drafts

`mkt_list_channels` lists the Instagram and Threads accounts shared with the workspace.
`mkt_draft_post` puts a draft into the campaign calendar: works, format (`feed`, `reel`, `story`,
`carousel`, `text`), caption, channels and time. The team sends it for approval and publishes it.
Approving, publishing, sharing channels and deleting belong to people in the studio, never to an
agent. If the user asks you to publish, draft the post and tell them where to press Publish.

## Trends

`get_trends` with `content: "brand"` returns ads by brands instead of creator posts. A trend the user
likes becomes a remake through Ad Reference in the studio, or a hook you write in `hookText`.

## Brief and refusals

Write strategy into the brief with `film_update_brief`: the audience into `audience`, the one promise
into `message`, the offer into `offer`, legal lines and must-haves into `mandatories`, scripts and
hooks into `creative`.

Campaign refusals worth knowing:

- `mkt_batch_over_limit`: the total is above the member's remaining monthly limit. Offer fewer cells
  or placements, or the owner raises the limit.
- `mkt_style_needs_avatar` / `mkt_style_no_avatar`: add talent, or remove it.
- `mkt_not_marketing_project`: a film project was passed to a campaign tool.
- `mkt_disabled`: the studio is not open for this account yet.

Never show campaign, element, asset, style or channel ids to the user.
