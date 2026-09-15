# Choosing a playbook

Pick by what the piece is for, not by the words the user used. The id goes into the `skill`
parameter; the playbook's own SKILL.md (`mira-<id>`) has the interview and the checks.

| The user wants | Skill | Tell-tale phrases |
|---|---|---|
| a creator showing or reviewing a product on a phone | `ugc` | review, unboxing, testimonial, "like a customer filmed it", TikTok ad |
| the product itself, exact and well lit | `product` | packshot, product card, catalogue, marketplace, "on white" |
| a piece that makes people act | `ads` | promo, sale, launch, banner, headline, offer |
| a mood piece with film light | `cinematic` | brand film, hero shot, teaser, "like a movie" |
| a demonstration of how it works | `explainer` | demo, tutorial, steps, "show how", before and after |
| Japanese animation | `anime` | anime, manga, cel |
| drawn or painted artwork in motion | `illustration` | illustration, storybook, watercolour, flat vector, motion graphics |
| stylised 3D animation | `toon3d` | 3D cartoon, CGI character, Pixar-like, 3D render of the product |
| pixel art | `pixel` | 8-bit, 16-bit, sprite, retro game |

Two rules of thumb. If the person on screen is a customer, it is `ugc` even when the clip sells.
If the product is the only subject and nobody speaks, it is `product` unless there is a headline,
which makes it `ads`.

When nothing fits, leave `skill` empty. The pipeline still fills the craft; it just does not
push toward a genre.

## Interviews

Each playbook lists two or three questions with fixed options. Ask them in chat only when the
request leaves them open, one at a time, with the options spelled out. The answers become facts
in your prompt ("the clip opens on the sealed box"), not parameters: the MCP tools take only the
skill id, the composer on the website takes the answers as chips.
