---
name: mira-product
description: >-
  Product-as-hero visuals on Mira AI: studio packshots, lifestyle scenes with the product in use,
  hands holding it, marketplace cards. Use it for "product shot", "packshot", "product video",
  "товар на белом", "карточка товара", "предметная съёмка", "show my product", e-commerce, catalogue,
  Amazon or Wildberries style. Pass skill="product" to generate_video or generate_image. Do NOT use
  for creator-style phone clips (mira-ugc), loud paid creative with a headline (mira-ads) or film
  mood pieces (mira-cinematic).
license: MIT
metadata:
  mira:
    id: product
    title: Product
    kind: both
    video_style: product
    image_style: product-card
    models: [seedance-2-5, kling, veo, gpt-image-2, gpt-image-2.5-sunburst, seedream-5-pro, seedream-4]
    order: 20
    icon: package
---

# Mira Product

The product is the only thing that matters in frame. Its shape, proportions, colours and label
are facts, and the whole shot is built so those facts read clearly. Everything else, the set, the
light, the hands, is there to make the product look like itself, only better lit.

## When to use

A packshot, a product video, a marketplace card, a lifestyle scene where the product is in use but
still the hero. Anything where a buyer needs to see exactly what they get.

## Doctrine

This is a premium product showcase: the product is the hero and stays exact in every beat, its
shape, proportions, colours, materials and printed label reproduced as they are, never restyled.
The set is clean and controlled, a seamless studio surface or a real but tidy environment with
depth behind the product. Light is designed: one soft key with a visible source direction, a hard
edge light from behind to carve the outline, controlled speculars on glass, metal and gloss, and a
believable contact shadow under the object. Focus is shallow enough to separate the product from
the background and deep enough that the whole label is sharp. Movement, if any, is slow and
mechanical, a glide or a turntable turn, with the product held large and centred while it runs.
Hands, when present, hold the product naturally and do not cover the label. Leave the frame calm
around the product so a line of type could sit beside it. Write the final prompt in English. Do
not invent brand names, logos or text; the user's own label copy is reproduced word for word.

## Interview

- **setting** Where does the product live in this shot? (default: studio)
  - `studio` Studio: A seamless studio surface with a soft gradient behind, no props, the product alone and large.
  - `lifestyle` Lifestyle: A real environment where the product is used, one or two supporting objects, the product still the sharpest thing in frame.
  - `hands` In hands: A person's hands present the product to the camera, fingers placed so the label and shape stay uncovered.
- **finish** What finish should the render have? (default: clean)
  - `clean` Clean and true: True colours, neutral white balance, even shadows, marketplace-ready.
  - `premium` Premium gloss: Deeper blacks, richer speculars, a darker backdrop, luxury catalogue feel.
- **packaging** Show the box or packaging too? (default: no)
  - `no` Product only: The product alone; packaging stays out of frame.
  - `beside` Beside it: The packaging stands beside the product as a second element, smaller, never covering it, its printed copy exact.

## Hint

Name the product and what must stay exact about it, then the surface it sits on.

## Model picks

For video, `seedance-2-5` keeps a product identical across several reference photos and long
takes; `kling` renders materials and reflections convincingly; `veo` gives premium eight second
turns with sound. For stills, `gpt-image-2` holds a detailed packshot brief with many constraints;
`gpt-image-2.5-sunburst` (premium) for the polished hero packshot or a faithful edit of the user's
own product photo; `seedream-5-pro` for a premium photoreal packshot at true 2K where glass, metal
and fabric must read as photographed; `seedream-4` keeps one product consistent across a series.

## Checklist

- Every fact about the product is stated as a fact, not an adjective: colour, material, finish, label.
- One key light with a direction, one edge light, one shadow. Not three of each.
- The label is fully in frame and in focus in the final beat.

## Do not

Do not restyle the product to look "better". Do not add fake awards, badges or claims. Do not
let hands, steam or splashes hide the label.
