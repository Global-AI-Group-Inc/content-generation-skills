# Image models on Mira

Nine models, one pipeline. Every model costs three credits per image except Muse Image at one,
Seedream 5 Pro at four and the premium tier at eight: Nano Banana Pro and GPT Image 2.5 Sunburst.
Pick the pricier ones only when their strengths are needed.

## gpt-image-2

The strongest at holding a detailed commercial brief with many requirements at once: exact copy,
brand colours, camera angle, lighting, what must not change. Photorealistic products, materials
and skin. Preserves product geometry, packaging and logos. The right default for e-commerce
packshots and structured ad layouts. In this setup it returns 2:3 for every tall ratio, so a 9:16
or 4:5 that must be exact goes elsewhere.

## gpt-image-2.5-flare

The newest GPT image family at the fast three-credit tier, served straight from OpenAI. The same
brief-holding, product fidelity and multi-photo edits as gpt-image-2, plus legible in-image text in
any script including Cyrillic, and it renders the exact requested ratio on a free-form canvas: a
9:16 story really is 9:16. The first pick for a text-bearing post, story or banner, and for a
faithful edit of the user's own photo when the premium tier is not needed. Carries lettering from
a reference verbatim.

## gpt-image-2.5-sunburst

Premium. The same family at its highest quality setting: sharper detail, richer light and shadow,
and the tightest control over edits, changing only what you name and keeping the rest of the
reference. Production-ready campaign creative, polished product imagery, an edit that must stay
faithful. Honours the ratio exactly. Slower than Flare, so not for drafts.

## nano-banana-pro

Legible in-image text in any language and the only model to trust with Cyrillic. Headlines,
prices, offers, packaging copy, posters, infographics, diagrams. One design that must exist in
several languages. Many reference photos blended while several people stay recognisable. Honours
tall ratios. Premium price.

## seedream-4

Keeps one product or one character consistent across several reference photos. The model for a
series: the same SKU in six scenes, the same person in a campaign. Honours tall ratios. Renders
at 1728x3072 on 9:16, three times the pixels of gpt-image-2, so skin, fabric and food close-ups
belong here.

## seedream-4k

The same model at 4K, up to 4096 px. Only for print, large format or a hero visual where fine
detail is inspected. For a social post it is waste.

## seedream-5-pro

ByteDance's flagship, four credits. Photoreal at true 2K on the exact requested ratio: skin,
fabric, glass and metal read as photographed rather than rendered, and light stays motivated
across the frame. Keeps one product or one person identical across several references and
follows a long, structured brief. Premium product and lifestyle stills, close-ups where texture
is inspected. Keep on-image text to a short line in quotes. Served straight from ModelArk; if
ByteDance is saturated the same model is delivered through Pika.

## muse-image

Meta's model, one credit, the cheapest in the lineup. It reasons over the brief in several
passes and checks itself against live web and image search, so real places, landmarks,
products and current designs come out recognisable: name them plainly instead of describing
them from memory. Holds the requested ratio and sizes the canvas itself. Good for a scene that
must show something real and specific, and for cheap drafts and variations. Keep on-image text
short.

## flux

The fastest. Quick drafts, mood exploration, variations the user will iterate on. Its in-image
text is the weakest of the lineup; never pick it for copy. Returns 2:3 for tall ratios.

## The rule that outranks the rest

Aspect ratio overrides everything above. When the ratio must be exact, pick gpt-image-2.5-flare,
gpt-image-2.5-sunburst, nano-banana-pro, muse-image or a seedream model. Leave the model empty only if nothing
fits; it then falls back to gpt-image-2.
