<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->
# Optics and shot size

OPTICS - describe the lens in words, not numbers: these models read 'compressed background and shallow depth of field' reliably and 'f/1.8' barely at all. A focal length may appear only as a feel ('an 85mm feel'). Pick ONE entry and state what is sharp and what is not. RESOLUTION GOVERNS TEXTURE, AND IT IS DECIDED BEFORE THE PROMPT: pores, peach fuzz and thread-level weave are worth asking for only on a large native canvas AND a tight shot. At 1728x3072 a face in close-up is about 1200 pixels across and there is something to draw them with; in a mid shot on the same frame it is about 400 pixels, and at 1024x1536 in a mid shot there is nothing. Asking for pores where the pixels cannot hold them is exactly what produces the plastic, over-smoothed face this platform is trying to avoid - so at small canvas or wide framing ask instead for accurate skin tone, visible fine lines and a natural specular highlight.

### Optics and shot size

- **`clean_modern`** — Modern prime, neutral rendering, no distortion, background falling off gently. The default when nothing else is called for.
- **`macro_100`** — Macro on a small subject, extremely shallow focus, one detail sharp and everything else dissolving. Texture, ingredients, fabric weave, jewellery.
- **`wide_24`** — Wide lens close to the subject, expanded space, slight edge stretch. Interiors, full-body in a location, scale.
- **`anamorphic_35`** — Anamorphic character: oval highlights, gentle horizontal flare, compressed depth. Cinematic and premium; wrong for a clean e-commerce card.
- **`vintage_spherical`** — Older glass, softer contrast, mild edge falloff, slightly lifted blacks. Warm and human rather than clinical.
- **`shallow_dof`** — Subject sharp, background dissolved to soft tone and shape. Isolates a hero object from a busy place.
- **`deep_focus`** — Everything sharp front to back. Flatlays, layouts, anything where several objects must all be read.
- **`tilt_shift`** — A single narrow plane in focus across the frame. Deliberate and graphic; not a substitute for shallow depth of field.
- **`phone_camera`** — Small sensor look: wide, deep focus, straightforward exposure, no cinematic separation. This is what makes UGC read as real - a shallow cinematic background instantly breaks it.
