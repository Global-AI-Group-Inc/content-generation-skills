<!-- generated from the registry by comfy_study/comfy_video/build_skills.py; edit the registry, not this file -->
# Direction: camera style, camera body, optics, palette, genre, era, tempo

USER DIRECTION is binding: the user chose these in the composer. Every pick is a decision already made - write it into the prompt in plain words (its description, never its name), keep it in every shot it applies to, and choose everything the user left open around it so it fits. Camera moves come in the user's order, one after another within the shot; a camera style shapes every move that is not picked; a palette's colours are the grade's main colours in the order given; custom lights are placed relative to the camera exactly as listed.

### Camera styles (a personality for every move)

- **`classic_static`** — Classic Static: a classical, composed camera: mostly locked-off frames on a tripod, motion only when a character motivates it, clean eyelines and balanced compositions; cuts do the work, the camera never shows off. Prefers locked_off, pan_left, pan_right, tilt_up, tilt_down, push_in, rack_focus; avoids handheld_raw, whip_pan, fpv_drone, crash_zoom, snorricam.
- **`silent_machine`** — Silent Machine: a precise, mechanical camera: perfectly smooth slider, dolly and robotic-arm moves at a constant speed, exact symmetry and no shake - the camera glides like a machine that never breathes. Prefers slider_short, slider_reveal, dolly_in, dolly_out, truck_left, truck_right, robo_arm, pedestal_up, pedestal_down, lazy_susan, locked_off; avoids handheld_raw, handheld_follow, whip_pan, crash_zoom, wiggle.
- **`one_take`** — One Take: one unbroken take: a single continuous camera that follows, turns and travels through the space instead of cutting - every beat is reached by moving there, never by a cut. Prefers follow_ots, tracking_reverse, tracking_side, low_mode_glide, arc_left, arc_right, push_past, pass_through, fake_oner; avoids whip_pan_jump, crash_zoom, snap_zoom, locked_off.
- **`epic_scale`** — Epic Scale: a camera built for scale: high crane and aerial moves, wide lenses that put small figures in huge spaces, slow reveals and rising shots that end on the full scope of the world. Prefers crane_up, jib, aerial_wide, drone_pull_back, helicopter_telephoto, arc_reveal, earth_zoom_out, tilt_up; avoids handheld_raw, probe_macro, snorricam, object_pov.
- **`intimate_observer`** — Intimate Observer: a quiet observer close to the people: longer lenses, gentle handheld breathing at eye level, slow push-ins on faces and racks of focus between them - the camera listens rather than performs. Prefers handheld_follow, push_in, creep_zoom, rack_focus, follow_ots, locked_off; avoids fpv_drone, crash_zoom, whip_pan, aerial_wide, bullet_time.
- **`impossible_camera`** — Impossible Camera: a camera that ignores physics: it flies through keyholes and windows, passes through objects, shrinks to macro and zooms out to orbit, linking spaces in one impossible move. Prefers pass_through, infinite_zoom, probe_macro, fpv_drone, screw_rise, vertigo_orbit, earth_zoom_out, bullet_time; avoids locked_off, slider_short.
- **`documentary_snap`** — Documentary Snap: a reactive documentary operator: handheld at the shoulder, quick reframes and snap zooms toward what just happened, slightly late on the action as if it was not rehearsed. Prefers handheld_follow, snap_zoom, whip_pan, follow_ots, zoom_in, tracking_side; avoids robo_arm, lazy_susan, slider_short, super_dolly.
- **`raw_chaos`** — Raw Chaos: raw, aggressive camera energy: hard shake, whip pans, crash zooms, a camera rig strapped to the body, frames that lose and find the subject - controlled chaos, never a blur with nothing in it. Prefers handheld_raw, whip_pan, whip_pan_jump, crash_zoom, snorricam, impact_ram, camera_roll, speed_ramp; avoids locked_off, lazy_susan, slider_short, aerial_wide.
- **`dreamy_flow`** — Dreamy Flow: a floating, dreamlike camera: slow gliding arcs and drifts, soft speed changes, the camera seems to hover and breathe with the music, transitions melt rather than cut. Prefers arc_left, arc_right, orbit_360, low_mode_glide, crane_down, creep_zoom, speed_ramp; avoids handheld_raw, crash_zoom, whip_pan, snap_zoom.

### Camera bodies

- **`s35_digital`** — Studio Digital S35: a modern Super 35 digital cinema camera: clean high-dynamic-range image, natural skin, fine noise instead of grain
- **`large_format_digital`** — Large Format Digital: a large-format digital cinema camera: wide field of view with shallow depth, smooth roll-off, very clean and dimensional
- **`modular_8k`** — Modular 8K Digital: a modular 8K digital camera: razor resolution, crisp micro-detail, punchy commercial look
- **`film_35mm`** — 35mm Film: a classic motion-picture film camera: organic grain, soft highlight roll-off, rich colour separation
- **`film_65mm`** — 65/70mm Film: a large-format motion-picture camera: enormous resolution and depth, epic scale, very fine grain
- **`film_16mm`** — 16mm Film: a small documentary film camera: visible grain, softer resolution, documentary or indie texture
- **`film_8mm`** — 8mm Film: a home-movie camera: heavy grain, a gently breathing image, soft faded colour and warm light leaks
- **`dv_camcorder`** — DV Camcorder: a 2000s DV camcorder: interlaced video look, clipped highlights, sharpened edges, small sensor depth

### Focal lengths

- **`14`** — 14 mm: an ultra-wide 14 mm lens: exaggerated perspective, big foreground, space stretched
- **`24`** — 24 mm: a wide 24 mm lens: environment and subject together, slight perspective stretch
- **`35`** — 35 mm: a 35 mm lens: natural documentary field of view
- **`50`** — 50 mm: a 50 mm lens: neutral human-eye perspective
- **`85`** — 85 mm: an 85 mm portrait lens: flattering compression, soft background
- **`135`** — 135 mm: a long 135 mm lens: strong compression, the background stacked close behind the subject

### Apertures

- **`f1_4`** — f/1.4 wide open: very shallow depth of field: only the eyes sharp, background melting into soft bokeh
- **`f2_8`** — f/2.8: shallow depth: the subject sharp, the background clearly soft but readable
- **`f4`** — f/4 moderate: moderate depth: subject and near surroundings sharp, the distance gently soft
- **`f11`** — f/11 deep focus: deep focus: foreground and background both sharp

### Palettes (hex, dominant first)

- **`harbor_dawn`** — Harbor Dawn: cold harbour blues warmed by a peach sunrise Colours #1F3A4D, #4F7C8A, #C9D6D3, #E8B07A, #F2E6D0
- **`desert_motel`** — Desert Motel: sunbaked orange and sand against a teal pool Colours #C2552B, #E6A35C, #F3D9A4, #3E6E73, #1E2A2E
- **`velvet_lounge`** — Velvet Lounge: deep wine reds with brass light Colours #4A0F1F, #8C1C3A, #D4546A, #E9B44C, #120A0C
- **`arctic_lab`** — Arctic Lab: clinical whites and ice blues, one mint accent Colours #E8F1F4, #A9C6D0, #5E8A9A, #22414D, #9CF0E0
- **`forest_fable`** — Forest Fable: mossy greens and old gold Colours #1E3326, #3F6B47, #8FB073, #D8C98A, #6B4A2E
- **`neon_alley`** — Neon Alley: black-violet night with magenta and cyan neon Colours #0B0B1E, #2B1B5A, #FF2E88, #00E5FF, #F7F052
- **`faded_postcard`** — Faded Postcard: sun-faded pastels with milky highlights Colours #E9D8C4, #D9A79A, #9DB4B0, #6C8C9C, #F5EFE6
- **`steel_mill`** — Steel Mill: graphite greys broken by a molten orange Colours #1C1F22, #3D4248, #7A8288, #C1C6C8, #FF8A2B
- **`sodium_night`** — Sodium Night: sodium-vapour amber over dark green-black Colours #120D05, #4A2C0B, #C9781F, #F2B544, #2D3B3A
- **`candy_pop`** — Candy Pop: bright pink, yellow and mint on clean white Colours #FF6FA8, #FFD23F, #3BCEAC, #540D6E, #FFFFFF
- **`tobacco_study`** — Tobacco Study: tobacco browns and leather under lamplight Colours #2B1A10, #5C3A21, #9C6B3F, #D9B38C, #1A2421
- **`storm_coast`** — Storm Coast: slate storm blues with a thin band of gold light Colours #1B2430, #3A4A5C, #6E7F8D, #B7C2C9, #C8A15A
- **`rose_quartz`** — Rose Quartz: soft rose and mauve, gentle and warm Colours #F4D6D2, #E3A9A5, #B9798A, #6A4C63, #FBF3EF
- **`jungle_heat`** — Jungle Heat: dense greens with hot yellow and red Colours #0E2A1B, #1F5E3A, #7DBE5C, #F2C14E, #D9481C
- **`monochrome_ink`** — Monochrome Ink: pure black-and-white tonal scale Colours #0A0A0A, #3B3B3B, #7D7D7D, #C4C4C4, #F4F4F4
- **`teal_ember`** — Teal Ember: teal shadows against ember-orange skin and fire Colours #0F2C33, #1E6B73, #5FB3B3, #F08A4B, #FFD8A8

### Film genres

- **`drama`** — Drama: grounded human drama: naturalistic motivated light, eye-level medium shots and close-ups, performance first, patient takes, restrained camera, honest colour
- **`noir`** — Noir: film noir: hard low-key light, deep shadows and venetian slats, wet streets, smoke, high contrast, low angles and tilted frames, moral tension, often night
- **`comedy`** — Comedy: comedy: bright even light, wider frames that show the body and the gag, clean timing with holds for the reaction, little camera movement during the joke
- **`horror`** — Horror: horror: darkness and negative space in the frame, slow creeping moves, what is hidden matters more than what is shown, sudden stillness before a scare, cold or sickly colour
- **`action`** — Action: action: kinetic camera that tracks the force of every hit, fast cutting on motion, low angles, clear geography of who is where, impacts with weight and debris
- **`epic`** — Epic: epic: grand scale, sweeping crane and aerial shots, golden or storm light, heroic low angles, crowds and landscapes, a sense of history
- **`thriller`** — Thriller: thriller: tension through framing - long lenses, people watched from cover, tight close-ups on hands and eyes, cool desaturated palette, slow push-ins
- **`romance`** — Romance: romance: soft warm backlight, shallow focus, close two-shots, gentle slow moves, glowing skin and flares, intimate distance
- **`sci_fi`** — Sci-Fi: science fiction: clean or brutalist designed spaces, practical light from screens and panels, symmetrical wides that sell scale, cool palettes with one accent colour
- **`western`** — Western: western: wide horizons, hard sun and long shadows, dust in the air, ochre and teal, standoffs framed in wides and extreme close-ups of the eyes

### Eras

- **`1960s`** — 1960s: set in the 1960s: period cars with chrome bumpers, rotary phones, mid-century furniture, tailored suits and shift dresses; image with soft film grain, warm saturated reportage colour with rich reds
- **`1970s`** — 1970s: set in the 1970s: muscle cars, wood panelling, flared trousers and wide collars, smoky rooms; image with heavy grain, warm brown and orange tones, zoom-lens look
- **`1980s`** — 1980s: set in the 1980s: boxy cars, neon signage, CRT televisions, big hair and shoulder pads; image with saturated colour, haze and bloom, slightly soft
- **`1990s`** — 1990s: set in the 1990s: early mobile phones and pagers, grunge and baggy streetwear, beige computers; image with film grain or camcorder look, muted greens
- **`2000s`** — 2000s: set in the 2000s: flip phones, low-rise jeans, early digital cameras, glossy pop culture; image with crisp early-digital look, cool blue highlights, compact-flash sharpness
- **`2020s`** — Today: set today: current phones, cars, clothes and signage; image clean, high dynamic range

### Tempos

- **`calm`** — Calm: calm tempo: long held shots of several seconds, slow camera moves, cuts on breath, room for silence
- **`dynamic`** — Dynamic: dynamic tempo: shots of one to two seconds, cuts on action, energetic but readable camera
- **`chaotic`** — Chaotic: chaotic tempo: rapid cuts under a second, overlapping motion, aggressive camera - every frame still shows what matters
- **`single_shot`** — Single shot: one continuous shot with no cuts: the whole clip is a single camera move
