# Posting to Instagram and Threads, with auto-replies

The user's own Instagram and Threads accounts, connected on
[mira.mybots.pro/integrations](https://mira.mybots.pro/integrations), can receive posts straight from
Mira: now or at a time in the user's content plan. A post can carry auto-replies to comments
(comment hooks): a keyword or any comment under the post gets a public reply and a DM with buttons.
They are saved with the post and start working the moment it goes live.

Campaign posts of AI Marketing Studio are not posted from here: there you only draft them
(`mkt_draft_post`, see [marketing-studio.md](marketing-studio.md)) and the team publishes.

## The flow

1. `list_social_accounts`. A platform that is not connected can't be posted to: give the user the
   link and stop. You can't connect it yourself.
2. Pick the media: the user's own finished generations by id (`list_generations`). For a grid
   generation pass `id:index`. A generation that is not in the media library yet is added to it.
3. `check_social_post` with the same arguments you are going to publish with. It publishes nothing
   and returns `errors` (must fix), `warnings` (Instagram will crop or re-encode) and a summary.
4. Show the user the summary: accounts, post type, media, the caption as it will read, the time,
   the Instagram options and every auto-reply word for word. These go out under their name to real
   people.
5. Only after an explicit yes: `publish_social_post` with the same arguments and `confirm=true`.
   Without `confirm` it returns the summary again and posts nothing.
6. `get_social_post` for the outcome. Instagram processes video for a minute or two (`processing`).

A scheduled post can be removed with `cancel_social_post` until it goes out; ask first.

## Post types

| postType | Media | Where |
|---|---|---|
| `feed` | one photo or video (a video goes out as a Reel) | Instagram, Threads |
| `reel` | one video | Instagram |
| `story` | one photo or video, no caption, no comments | Instagram |
| `carousel` | 2-10 photos and videos | Instagram, Threads |
| `text` | no media | Threads |

## Instagram's limits

- Caption up to 2,200 characters, 30 hashtags, 20 @mentions. Only the first ~125 characters show
  before "more": put the hook there.
- Feed photos are cropped to 4:5 - 1.91:1; Reels and stories are 9:16. Make the media in that ratio
  rather than letting Instagram crop it (`reframe_video` for a clip in the wrong ratio).
- Video: 3 s to 15 min for Reels, up to 60 s for stories, 23-60 fps, up to 300 MB (stories 100 MB).
  A clip over 60 fps from FPS Boost has to be made at 60.
- Photos up to 8 MB; non-JPEG files are converted by Instagram.
- About 100 API posts per account per 24 h; over the limit the post moves one hour later.

## Instagram options (`ig`)

- `aiLabel` - Instagram's "AI info" label. Recommend it for generated media.
- `collaborators` - up to 3 usernames; they get an invite (not for stories).
- `altTexts` - alt text per photo, keyed by the generation id you passed (photos only).
- `coverGenerationId` / `thumbOffsetMs` - the Reel's cover: a photo generation or a frame in ms.
- `shareToFeed` - false keeps a Reel in the Reels tab only.
- `trialReel` - `manual` or `performance`: shown to non-followers first.
- `firstComment` - posted by the account under the post right after it goes live; the usual place
  for a block of hashtags.

## Auto-replies (`commentHooks`, `save_comment_hook`)

Each hook: `keywords` (empty means any comment), `publicReply`, `dm` with up to 3 `dmButtons`
(`web_url` with `url`, or `postback` with `nextResponse`), `hide`. DMs, buttons and delete are
Instagram only; on Threads a hook replies publicly or hides the comment. Up to 10 hooks per post.

Recipes that work:

- **Keyword to DM.** Caption: "Comment LINK and I'll send it to you". Hook: keyword `link`, public
  reply "Sent it to your DMs!", DM with one `web_url` button to the page. The caption and the
  keyword must match exactly what you tell people to type.
- **Thank everyone.** Any comment: a short public thank-you. Add a DM only if it gives something.
- **Two-step DM.** The DM asks a question with two `postback` buttons; each answers differently.

Hooks on a post already published elsewhere: `save_comment_hook` with `mediaId`. Hooks for every
post of the account: neither `postId` nor `mediaId`. `list_comment_hooks` with `recent=true` returns
the user's earlier hooks to reuse; `get_comment_hook_log` shows what they did.
