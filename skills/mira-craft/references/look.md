<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->
# Look

LOOK - build the image from four named choices below (one film stock, one grade, one lens, one texture) and write them into the prompt as plain description, never as labels. Describe the tone curve in film language: lifted shadows with softly rolled-off highlights for a filmic low-contrast look, or crushed inky blacks for high-contrast drama. Name the light by its setup and direction - a single soft key from a large window with deep falloff, a low-key scene motivated by one warm practical lamp, golden-hour backlight through haze - and get colour from warm light set against cool shadow rather than from saturation. Never stack two film stocks in one prompt, and across clips that belong to one set repeat the same grade wording verbatim. These words must NOT appear in the prompt you write, because each of them pushes current models toward the plastic over-saturated look we are escaping: vibrant, vivid, highly saturated, HDR, ultra-realistic, 4k, 8k. That is a list of words you must not USE - never write the ban itself into the prompt and never phrase it as a negation. These names are labels for CHOOSING, never text for the prompt: write the described look in plain English words and never emit a bare label like teal_orange.

HOW TO ASK FOR A LOOK: name the look PLUS two or three physical traits - the model does not know LUT names, it knows what they do. 'bleach bypass' alone is weak; 'bleach bypass look, desaturated, crushed blacks, silver metallic highlights' lands. Grain or halation almost always helps photoreal work.

### Film stocks

- **`portra_400`** — Kodak Portra 400 emulation - warm, gentle, flattering skin tones and soft contrast
- **`vision3_500t`** — Kodak Vision3 500T - clean but organic, holds its highlights, shadows sit slightly cool
- **`eterna`** — Fujifilm Eterna - muted, desaturated, low contrast, indie-cinema restraint
- **`cinestill_800t`** — CineStill 800T - tungsten-balanced night with visible halation blooming around every light
- **`technicolor_3strip`** — three-strip Technicolor - punchy saturated reds and cyans, vintage Hollywood
- **`bleach_bypass`** — bleach-bypass process - desaturated, silver retained, crushed contrast, gritty
- **`ektachrome`** — Ektachrome slide-film look - punchy saturated color, clean blues, crisp contrast; retro documentary and travel
- **`kodachrome`** — Kodachrome look - rich reds, deep contrast, vintage reportage color of the 60s-70s
- **`fuji_400h`** — Fuji 400H look - cool airy greens, lifted pastel highlights; wedding-lifestyle freshness
- **`ilford_hp5`** — Ilford HP5 black and white - pronounced grain, documentary honesty
- **`super8`** — Super 8 home-movie stock - heavy grain, light leaks, unstable frame edges, saturated fade; a memory, not a recording
- **`sixteen_mm`** — 16mm small-gauge film - pronounced organic grain, gentle gate weave, slightly lifted blacks and softly halated highlights; indie warmth and authenticity
- **`polaroid_instant`** — instant-film look - soft low-contrast image in a square frame feel, milky shadows, slightly shifted pastel color and a warm chemical vignette; tactile nostalgia

### Grades

- **`teal_orange`** — teal-and-orange blockbuster grade - warm orange skin tones against deep teal-blue shadows
- **`nostalgic_amber`** — warm faded amber grade with lifted milky blacks and low saturation
- **`noir_neon`** — cool blue base with magenta and cyan neon practicals and red halation
- **`silver_retain`** — desaturated silver-retained grade, high contrast, crushed inky blacks
- **`indie_pastel`** — muted low-contrast pastel grade with gentle desaturated greens
- **`honey_backlight`** — honey-amber highlights, long backlit flares and atmospheric haze
- **`steel_blue`** — desaturated steel-blue and cyan palette broken by a single warm practical
- **`day_for_night`** — underexposed by two stops with a deep blue moonlit cast
- **`ochre_western`** — warm dusty ochre separated against a teal sky under a high overhead sun
- **`mono`** — black and white with a rich tonal range, deep blacks that keep their detail and a dramatic side key
- **`cross_process`** — cross-processed look - shifted greens and magentas, blown highlights, crushed shadows; the 'wrong film stock' charm of Y2K and indie work
- **`cold_clinical`** — cold clinical grade - neutral whites with a faint cyan cast, clean and exact; medicine, labs, science-behind-the-product
- **`bleached_matte`** — desaturated low-contrast grade with lifted matte blacks and chalky highlights, colors reduced to dusty pastels - understated editorial cool
- **`crushed_noir`** — high-contrast grade with inky crushed blacks, controlled specular highlights and near-monochrome color discipline - predatory elegance

### Lenses

- **`anamorphic_35`** — shot on 35mm anamorphic - shallow depth of field, oval bokeh, subtle horizontal flares
- **`vintage_spherical`** — vintage spherical prime - gentle edge softness and slight chromatic aberration
- **`clean_modern`** — clean modern lens - even sharpness edge to edge and natural depth of field
- **`macro_100`** — 100mm macro - extremely shallow focus with the subject filling the frame
- **`wide_24`** — 24mm wide angle - deep space and a strong foreground presence
- **`fisheye_ultrawide`** — extreme barrel-distorted ultra-wide - straight lines bend, the subject looms huge center-frame at close range; skate-video attitude
- **`split_diopter`** — two focal planes razor-sharp at once - extreme foreground and distant subject - divided by a soft vertical seam
- **`tilt_shift_miniature`** — a narrow horizontal band of sharp focus with heavy blur above and below, making the real scene read as a toy diorama
- **`telephoto_compression`** — long telephoto - background pulled tight against the subject, space flattened, creamy distant bokeh

### Texture

- **`fine_grain`** — fine 35mm film grain
- **`halation`** — organic halation blooming around the brightest highlights
- **`gate_weave`** — a barely perceptible gate weave, as if projected
- **`clean_digital`** — clean digital capture with no grain
- **`shutter_drag`** — slow-shutter motion smear - moving subjects trail painterly streaks while static elements stay sharp, often with a flash-frozen core

### Social aesthetics

- **`ugc_iphone`** — shot-on-iPhone realism: natural window light, slightly overexposed whites, handheld, zero grade - the most conversion-honest look there is
- **`front_selfie`** — front-camera selfie framing at arm's length, slight wide-angle distortion, vertical native
- **`clean_commercial`** — clean commercial polish: crisp highlights, controlled color, high production value without a stylized grade
- **`vhs_camcorder`** — VHS camcorder: chromatic fringing, scan lines, tape noise, soft rolled-off highlights, a timestamp in the corner
- **`handycam_y2k`** — 1999 Handycam: low-light video grain, green-tinted shadows, yellowish skin, digital halation blooms
- **`digicam_2000s`** — early-2000s compact digicam: harsh on-camera flash, blown highlights, slight noise - found-in-the-archive party energy
- **`film_burn`** — film burn and light leaks sweeping warm orange across the frame - an emotional seam between beats
- **`halation_glow`** — halation: a warm red-orange bloom hugging every bright light source - instant film soul for night frames
- **`grain_overlay`** — fine 16mm-style grain over the whole image - the cheapest cure for plastic-looking synthetic footage
- **`anamorphic_flare`** — anamorphic character: horizontal blue flares, oval bokeh, gentle edge distortion - use sparingly in vertical frames
- **`instagram_polished`** — bright airy aspirational grade: lifted shadows, warm highlights, high clarity
- **`tiktok_punchy`** — punchy phone-native grade: high saturation, crisp contrast, slightly cool - built to read on a small bright screen
- **`dreamcore_glow`** — soft diffusion dream: blooming highlights, hazy pro-mist glow - perfume, beauty, sleep
- **`hyperreal_product`** — hyperreal product render: razor speculars, seamless studio sweep, impossibly clean surfaces
- **`bodycam_pov`** — chest-mounted bodycam: fisheye edges, harsh auto-exposure swings, timestamp overlay, motion jolting with the wearer's body
- **`cctv_surveillance`** — high fixed corner-camera angle, low-detail image, timestamp and REC overlay, occasional frame skips - caught-in-the-act framing
- **`dashcam`** — wide fixed windshield perspective, blown headlight highlights, timestamp, slight lens dirt and road vibration - found-footage credibility
- **`doorbell_cam`** — fixed ultra-wide porch-camera view, motion-triggered timestamp overlay, night IR switch and a slight vignette
- **`night_vision`** — monochrome green infrared image with glowing bright eyes and reflective surfaces, heavy noise in the darks - covert tension
- **`thermal_view`** — false-color heat map: bodies glowing yellow-orange against cool purple-blue surroundings, edges soft - sci-tech spectacle
- **`infrared_falsecolor`** — infrared false-color: foliage turned vivid crimson-pink, skies deep cyan, skin porcelain - reality re-colored, surreal editorial
- **`webcam_screenrec`** — low-bitrate webcam framing with compression artifacts, mild banding and an awkward centered eyeline - relatable real-call authenticity
- **`found_footage`** — deliberately imperfect first-person camera: footstep bob, hurried reframes, flashlight beams reacting naturally - this-really-happened immersion
